import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  Ticket,
  Globe,
  User,
  Menu,
  LogOut,
  X,
  Diamond,
  BarChart3,
  DollarSign,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const resultLinks = [
  { label: "MLB", url: "https://www.mlb.com/scores" },
  { label: "LMB", url: "https://www.milb.com/scores" },
  { label: "LIDOM", url: "https://www.lidom.com/resultados" },
  { label: "NBA", url: "https://www.nba.com/scores" },
  { label: "WNBA", url: "https://www.wnba.com/schedule?pd=2025&se=2025" },
  { label: "CBB", url: "https://www.ncaa.com/scoreboard/basketball-men/d1" },
  { label: "NHL", url: "https://www.nhl.com/scores" },
  { label: "NFL", url: "https://www.nfl.com/scores/" },
  { label: "CFB", url: "https://www.ncaa.com/scoreboard/football/fbs" },
  { label: "CFL", url: "https://www.cfl.ca/scores/" },
  { label: "SOCCER", url: "https://www.espn.com/soccer/scores" },
  { label: "UFC", url: "https://www.ufc.com/scores" },
  { label: "GALLOS", url: "https://www.sabong.net/" },
];

export default function Navbar() {
  const {
    balance,
    isLoggedIn,
    user,
    toggleBetSlipSheet,
    toggleWithdrawalNotice,
    toggleGenerateCode,
    toggleHelpModal,
    toggleLastMovements,
    toggleParlayCalculator,
    logout,
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [resultsExpanded, setResultsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => {
    setMenuOpen(false);
    setResultsExpanded(false);
  };

  const handleNavClick = (path: string) => {
    closeMenu();
    navigate(path);
  };

  const handleBuildingClick = () => {
    toggleGenerateCode();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
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
          <div className="relative">
            <button
              onClick={handleBuildingClick}
              className="flex h-9 w-9 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Building2 size={20} />
            </button>
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-[#4a4f57] px-2 py-1 text-xs text-white shadow-lg"
                >
                  Generar codigo
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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

          <button
            onClick={openMenu}
            className="flex h-9 w-9 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      {/* FULL-SCREEN MENU DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60"
              onClick={closeMenu}
            />

            {/* Sliding panel from left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-[70] w-[80%] max-w-[320px] bg-white shadow-2xl flex flex-col"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
              {/* Close button */}
              <div className="flex items-center justify-between border-b border-[#e0e0e0] px-4 py-3">
                <span className="text-lg font-bold text-[#333333]">Menu</span>
                <button
                  onClick={closeMenu}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-[#7f8c8d] transition-colors hover:bg-[#f5f5f5] hover:text-[#333333]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User info */}
              {user && (
                <div className="border-b border-[#e0e0e0] px-4 py-3">
                  <p className="text-sm font-semibold text-[#333333]">{user.username}</p>
                  <p className="text-xs text-[#7f8c8d]">{user.email}</p>
                </div>
              )}

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                {/* 1. Deportes */}
                <button
                  onClick={() => handleNavClick("/")}
                  className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-4 py-3.5 text-left transition-colors hover:bg-[#f5f5f5]"
                >
                  <Diamond size={20} className="text-[#3498db] shrink-0" />
                  <span className="text-sm font-medium text-[#333333]">Deportes</span>
                </button>

                {/* 2. Tickets */}
                <button
                  onClick={() => handleNavClick("/tickets")}
                  className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-4 py-3.5 text-left transition-colors hover:bg-[#f5f5f5]"
                >
                  <Ticket size={20} className="text-[#3498db] shrink-0" />
                  <span className="text-sm font-medium text-[#333333]">Tickets</span>
                </button>

                {/* 3. Ultimos movimientos */}
                <button
                  onClick={() => {
                    closeMenu();
                    toggleLastMovements();
                  }}
                  className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-4 py-3.5 text-left transition-colors hover:bg-[#f5f5f5]"
                >
                  <BarChart3 size={20} className="text-[#555555] shrink-0" />
                  <span className="text-sm font-medium text-[#333333]">Ultimos movimientos</span>
                </button>

                {/* 4. Retiro */}
                <button
                  onClick={() => {
                    closeMenu();
                    toggleGenerateCode();
                  }}
                  className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-4 py-3.5 text-left transition-colors hover:bg-[#f5f5f5]"
                >
                  <DollarSign size={20} className="text-[#555555] shrink-0" />
                  <span className="text-sm font-medium text-[#333333]">Retiro</span>
                </button>

                {/* 5. Aviso de retiro */}
                <button
                  onClick={() => {
                    closeMenu();
                    toggleWithdrawalNotice();
                  }}
                  className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-4 py-3.5 text-left transition-colors hover:bg-[#f5f5f5]"
                >
                  <Building2 size={20} className="text-[#555555] shrink-0" />
                  <span className="text-sm font-medium text-[#333333]">Aviso de retiro</span>
                </button>

                {/* 6. Resultados (with accordion) */}
                <div className="border-b border-[#e0e0e0]">
                  <button
                    onClick={() => setResultsExpanded(!resultsExpanded)}
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-[#f5f5f5]"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-[#555555] shrink-0" />
                      <span className="text-sm font-medium text-[#333333]">Resultados</span>
                    </div>
                    {resultsExpanded ? (
                      <ChevronUp size={16} className="text-[#7f8c8d]" />
                    ) : (
                      <ChevronDown size={16} className="text-[#7f8c8d]" />
                    )}
                  </button>

                  {/* Sub-items */}
                  <AnimatePresence>
                    {resultsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-[#f8f8f8]"
                      >
                        {resultLinks.map((item) => (
                          <a
                            key={item.label}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className="flex items-center px-12 py-2.5 text-sm text-[#555555] transition-colors hover:bg-[#f0f0f0] hover:text-[#3498db]"
                          >
                            {item.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 7. Ayuda */}
                <button
                  onClick={() => {
                    closeMenu();
                    toggleHelpModal();
                  }}
                  className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-4 py-3.5 text-left transition-colors hover:bg-[#f5f5f5]"
                >
                  <HelpCircle size={20} className="text-[#3498db] shrink-0" />
                  <span className="text-sm font-medium text-[#333333]">Ayuda</span>
                </button>

                {/* 8. Calculadora */}
                <button
                  onClick={() => {
                    closeMenu();
                    toggleParlayCalculator();
                  }}
                  className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-4 py-3.5 text-left transition-colors hover:bg-[#f5f5f5]"
                >
                  <HelpCircle size={20} className="text-[#3498db] shrink-0" />
                  <span className="text-sm font-medium text-[#333333]">Calculadora</span>
                </button>

                {/* 9. Como Jugar */}
                <button
                  onClick={() => {
                    closeMenu();
                    toggleHelpModal();
                  }}
                  className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-4 py-3.5 text-left transition-colors hover:bg-[#f5f5f5]"
                >
                  <HelpCircle size={20} className="text-[#3498db] shrink-0" />
                  <span className="text-sm font-medium text-[#333333]">Como Jugar</span>
                </button>
              </div>

              {/* Bottom: Logout */}
              <div className="border-t border-[#e0e0e0] p-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-[#e74c3c] transition-colors hover:bg-[#e74c3c]/10"
                  >
                    <LogOut size={18} />
                    Cerrar sesion
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-[#3498db] transition-colors hover:bg-[#3498db]/10"
                  >
                    <LogOut size={18} />
                    Log In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
