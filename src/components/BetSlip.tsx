import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";

export default function BetSlip() {
  const {
    selectedBets,
    removeBet,
    language,
    betSlipTab,
    setBetSlipTab,
    activateIf,
    setActivateIf,
    betAmount,
    setBetAmount,
    toggleClearConfirm,
  } = useApp();

  const payout = useMemo(() => {
    const amount = parseFloat(betAmount) || 0;
    if (amount <= 0 || selectedBets.length === 0) return 0;

    // Calculate parlay payout by multiplying odds
    let totalMultiplier = 1;
    for (const bet of selectedBets) {
      const odds = bet.odds;
      if (odds > 0) {
        totalMultiplier *= odds / 100 + 1;
      } else if (odds < 0) {
        totalMultiplier *= 100 / Math.abs(odds) + 1;
      }
    }
    return amount * (totalMultiplier - 1);
  }, [betAmount, selectedBets]);

  const tabs: { key: "teaser" | "teaserIF" | "regular"; label: string }[] = [
    { key: "teaser", label: t(language, "teaser") },
    { key: "teaserIF", label: t(language, "teaserIF") },
    { key: "regular", label: t(language, "jugadasRegulares") },
  ];

  return (
    <motion.aside
      initial={{ x: 280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25, delay: 0.15, ease: "easeOut" }}
      className="custom-scrollbar fixed right-0 top-14 z-30 flex h-[calc(100vh-56px)] w-[280px] flex-col bg-[#3a3f47]"
    >
      {/* Header Tabs */}
      <div className="flex shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setBetSlipTab(tab.key)}
            className={`flex-1 py-3 text-center text-[13px] font-semibold transition-all duration-150 ${
              betSlipTab === tab.key
                ? "border-b-2 border-b-[#3498db] bg-white font-bold text-[#333333]"
                : "border-b-2 border-b-transparent bg-[#4a4f57] text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Selections */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedBets.length > 0 ? (
            <motion.div
              key="selections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_60px_50px_50px_28px] bg-[#2c3e50] px-1 py-2 text-[11px] font-semibold uppercase tracking-wider text-white">
                <span className="px-1">{t(language, "jugada")}</span>
                <span className="px-1 text-center">{t(language, "linea")}</span>
                <span className="px-1 text-center">{t(language, "premio")}</span>
                <span className="px-1 text-center">{t(language, "puntos")}</span>
                <span />
              </div>

              {/* Bet Rows */}
              <AnimatePresence>
                {selectedBets.map((bet) => (
                  <motion.div
                    key={bet.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-[1fr_60px_50px_50px_28px] items-center border-b border-[#555a60] bg-[#4a4f57] px-1 py-2.5"
                  >
                    <span className="truncate px-1 text-xs font-medium text-white">
                      {bet.sport} {bet.team}
                    </span>
                    <span className="px-1 text-center text-xs font-semibold text-white">
                      {bet.type} {bet.line}
                    </span>
                    <span className="px-1 text-center text-xs font-semibold text-[#3498db]">
                      ${(bet.odds > 0 ? bet.odds / 100 : 100 / Math.abs(bet.odds)).toFixed(2)}
                    </span>
                    <span className="px-1 text-center text-xs text-[#b0b5ba]">
                      {bet.points || "-"}
                    </span>
                    <button
                      onClick={() => removeBet(bet.id)}
                      className="flex h-5 w-5 items-center justify-center rounded text-[#e74c3c] transition-colors hover:bg-[#e74c3c]/10"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center px-5 py-10"
            >
              <p className="mb-1 text-sm text-[#7f8c8d]">
                {t(language, "noSelectionsMsg")}
              </p>
              <p className="text-xs text-[#555a60]">{t(language, "selectOdds")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="shrink-0 border-t border-[#555a60] p-4">
        {/* Activate If */}
        <label className="mb-3 flex cursor-pointer items-center gap-2">
          <div
            onClick={() => setActivateIf(!activateIf)}
            className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
              activateIf
                ? "border-[#3498db] bg-[#3498db]"
                : "border-[#555a60] bg-transparent"
            }`}
          >
            {activateIf && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span className="text-[13px] text-white">{t(language, "activateIf")}</span>
        </label>

        {/* Amount */}
        <div className="mb-3">
          <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
            {t(language, "cantidad")}
          </label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="$0.00"
            className="w-full rounded border border-[#555a60] bg-[#4a4f57] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#3498db]"
          />
        </div>

        {/* Payout */}
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
            {t(language, "pago")}
          </label>
          <span className="text-base font-bold text-[#3498db]">
            ${payout.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <button className="mb-2 w-full rounded bg-[#3498db] py-3 text-sm font-bold uppercase text-white transition-all hover:bg-[#2980b9] active:scale-[0.98]">
          {t(language, "guardar")}
        </button>
        <button
          onClick={selectedBets.length > 0 ? toggleClearConfirm : undefined}
          className="w-full rounded bg-[#e74c3c] py-3 text-sm font-bold uppercase text-white transition-all hover:bg-[#c0392b] active:scale-[0.98] disabled:opacity-50"
          disabled={selectedBets.length === 0}
        >
          {t(language, "limpiar")}
        </button>
      </div>
    </motion.aside>
  );
}
