import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { Home, Building2, Ticket, Globe, User, Menu, LogOut, FileText, QrCode, CreditCard } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const {
    balance,
    isUserMenuOpen,
    toggleUserMenu,
    toggleBetSlipSheet,
    toggleWithdrawalNotice,
    toggleGenerateCode,
    logout,
    isLoggedIn,
    user,
  } = useApp();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (isUserMenuOpen) toggleUserMenu();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isUserMenuOpen, toggleUserMenu]);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toggleUserMenu();
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed left-0 right-0 top-0 z-40 flex h-12 items-center bg-[#2c2f33] px-2 shadow-md"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* Left: Home icon (red when active) */}
        <Link
          to="/"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded transition-colors ${
            isActive("/")
              ? "bg-[#e74c3c] text-white"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Home size={20} />
        </Link>

        {/* Center: Building, Ticket, Globe */}
        <div className="flex flex-1 items-center justify-center gap-1">
          <button className="flex h-9 w-9 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            <Building2 size={20} />
          </button>
          <button
            onClick={() => toggleBetSlipSheet()}
            className="flex h-9 w-9 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Ticket size={20} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            <Globe size={20} />
          </button>
        </div>

        {/* Right: $0.00, User icon, Hamburger */}
        <div className="flex items-center gap-1">
          <span className="px-1 text-[14px] font-bold text-[#e74c3c]">
            ${balance.toFixed(2)}
          </span>

          <Link
            to="#"
            className="flex h-9 w-9 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <User size={20} />
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleUserMenu}
              className="flex h-9 w-9 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Menu size={20} />
            </button>

            {/* Hamburger Dropdown */}
            {isUserMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={toggleUserMenu} />
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-lg border border-[#555a60] bg-[#3a3f47] shadow-xl"
                >
                  {user && (
                    <div className="border-b border-[#555a60] px-4 py-3">
                      <p className="text-sm font-semibold text-white">{user.username}</p>
                      <p className="text-xs text-[#b0b5ba]">{user.email}</p>
                    </div>
                  )}
                  <Link
                    to="#"
                    onClick={toggleUserMenu}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#4a4f57]"
                  >
                    <User size={16} className="text-[#b0b5ba]" />
                    Perfil
                  </Link>
                  <Link
                    to="/tickets"
                    onClick={toggleUserMenu}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#4a4f57]"
                  >
                    <FileText size={16} className="text-[#b0b5ba]" />
                    Tickets
                  </Link>
                  <button
                    onClick={() => {
                      toggleUserMenu();
                      toggleWithdrawalNotice();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#4a4f57]"
                  >
                    <CreditCard size={16} className="text-[#b0b5ba]" />
                    Aviso de retiro
                  </button>
                  <button
                    onClick={() => {
                      toggleUserMenu();
                      toggleGenerateCode();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#4a4f57]"
                  >
                    <QrCode size={16} className="text-[#b0b5ba]" />
                    Generar codigo
                  </button>
                  <div className="border-t border-[#555a60]">
                    {isLoggedIn ? (
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#e74c3c] transition-colors hover:bg-[#4a4f57]"
                      >
                        <LogOut size={16} />
                        Cerrar sesion
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={toggleUserMenu}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#3498db] transition-colors hover:bg-[#4a4f57]"
                      >
                        <LogOut size={16} />
                        Log In
                      </Link>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.header>
    </>
  );
}
