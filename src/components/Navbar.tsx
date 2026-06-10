import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  HelpCircle,
  Settings,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import { LanguageDropdown, ResultsDropdown } from "./Modals";

export default function Navbar() {
  const { user, balance, language, toggleHelpModal, toggleWithdrawalNotice } = useApp();
  const location = useLocation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [balanceFlash, setBalanceFlash] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Balance flash animation
  useEffect(() => {
    if (balanceFlash) {
      const timer = setTimeout(() => setBalanceFlash(false), 200);
      return () => clearTimeout(timer);
    }
  }, [balanceFlash]);

  useEffect(() => {
    setBalanceFlash(true);
  }, [balance]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setIsResultsOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const iconBtnClass =
    "flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-all duration-100 hover:bg-white/[0.06] hover:text-white";

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center bg-[#3a3f47] px-4 shadow-md"
    >
      {/* Left - Logo & Nav */}
      <div className="flex items-center gap-6">
        <Link to="/" className="relative text-[22px] font-extrabold text-white">
          Sports v2
          <span className="absolute -bottom-1 left-0 h-0.5 w-10 bg-[#3498db]" />
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive("/")
                ? "text-[#3498db]"
                : "text-white hover:text-[#3498db]"
            }`}
          >
            {t(language, "deportes")}
          </Link>

          <Link
            to="/tickets"
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive("/tickets")
                ? "text-[#3498db]"
                : "text-white hover:text-[#3498db]"
            }`}
          >
            {t(language, "tickets")}
          </Link>

          {/* Results Dropdown */}
          <div className="relative" ref={resultsRef}>
            <button
              onClick={() => setIsResultsOpen(!isResultsOpen)}
              className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-white transition-colors hover:text-[#3498db]"
            >
              {t(language, "resultados")}
              <ChevronDown size={14} />
            </button>
            <ResultsDropdown
              isOpen={isResultsOpen}
              onClose={() => setIsResultsOpen(false)}
            />
          </div>
        </nav>
      </div>

      {/* Right - Icons & User */}
      <div className="ml-auto flex items-center gap-1">
        {/* Balance chart */}
        <button
          onClick={toggleWithdrawalNotice}
          className={iconBtnClass}
          title={t(language, "balance")}
        >
          <BarChart3 size={18} />
        </button>

        {/* Calendar */}
        <button
          onClick={() => {}}
          className={iconBtnClass}
          title={t(language, "calendar")}
        >
          <Calendar size={18} />
        </button>

        {/* Help */}
        <button
          onClick={toggleHelpModal}
          className={iconBtnClass}
          title={t(language, "help")}
        >
          <HelpCircle size={18} />
        </button>

        {/* Settings / Language */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={iconBtnClass}
            title={t(language, "settings")}
          >
            <Settings size={18} />
          </button>
          <LanguageDropdown
            isOpen={isLangOpen}
            onClose={() => setIsLangOpen(false)}
          />
        </div>

        {/* Notifications */}
        <button
          onClick={() => {}}
          className={iconBtnClass}
          title={t(language, "notifications")}
        >
          <Bell size={18} />
        </button>

        {/* Balance */}
        <motion.span
          animate={balanceFlash ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.2 }}
          className="ml-2 text-[15px] font-bold text-white"
        >
          ${balance.toFixed(2)}
        </motion.span>

        {/* User */}
        {user && (
          <span className="ml-3 text-[13px] text-[#b0b5ba]">
            {user.email} ({user.username})
          </span>
        )}
      </div>
    </motion.header>
  );
}
