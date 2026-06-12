import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { Trophy, Ticket, User, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function MobileBottomNav() {
  const location = useLocation();
  const { toggleBetSlipSheet, toggleUserMenu, isLoggedIn } = useApp();

  const navItems = [
    {
      icon: Trophy,
      label: "Home",
      link: "/",
      active: location.pathname === "/",
    },
    {
      icon: Ticket,
      label: "Jugadas",
      action: () => toggleBetSlipSheet(),
      active: false,
    },
    {
      icon: User,
      label: "Menu",
      action: () => toggleUserMenu(),
      active: false,
    },
    {
      icon: Plus,
      label: "Mas",
      action: () => {},
      active: false,
    },
  ];

  // Don't show bottom nav when not logged in or on login page
  if (!isLoggedIn || location.pathname === "/login") return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#555a60] bg-[#2b2f36]/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active;

          const content = (
            <button
              onClick={item.action || undefined}
              className={`relative flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors ${
                isActive ? "text-[#e74c3c]" : "text-[#7f8c8d]"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-px h-0.5 w-8 rounded-full bg-[#e74c3c]"
                />
              )}
            </button>
          );

          if (item.link) {
            return (
              <Link key={item.label} to={item.link}>
                {content}
              </Link>
            );
          }
          return <div key={item.label}>{content}</div>;
        })}
      </div>
    </nav>
  );
}
