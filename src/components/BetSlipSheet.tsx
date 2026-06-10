import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";

export default function BetSlipSheet() {
  const {
    isBetSlipSheetOpen,
    toggleBetSlipSheet,
    selectedBets,
    removeBet,
    language,
    activateIf,
    setActivateIf,
    betAmount,
    setBetAmount,
    toggleClearConfirm,
  } = useApp();

  const payout = useMemo(() => {
    const amount = parseFloat(betAmount) || 0;
    if (amount <= 0 || selectedBets.length === 0) return 0;

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

  return (
    <AnimatePresence>
      {isBetSlipSheetOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-black/60"
            onClick={toggleBetSlipSheet}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[56] flex max-h-[85vh] flex-col rounded-t-2xl bg-[#3a3f47] shadow-2xl"
            style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
          >
            {/* Drag Handle */}
            <div className="flex items-center justify-center border-b border-[#555a60] px-4 py-2">
              <div className="h-1 w-10 rounded-full bg-[#555a60]" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-center border-b border-[#555a60] px-4 py-3">
              <h2 className="text-[15px] font-bold text-white">
                {t(language, "tusJugadas")}
                {selectedBets.length > 0 && (
                  <span className="ml-2 rounded-full bg-[#e74c3c] px-2 py-0.5 text-[11px]">
                    {selectedBets.length}
                  </span>
                )}
              </h2>
              <button
                onClick={toggleBetSlipSheet}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#4a4f57] text-[#7f8c8d] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Selections */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <AnimatePresence mode="wait">
                {selectedBets.length > 0 ? (
                  <motion.div
                    key="selections"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Bet Rows */}
                    <AnimatePresence>
                      {selectedBets.map((bet) => (
                        <motion.div
                          key={bet.id}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -30, opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 border-b border-[#555a60] bg-[#4a4f57] px-4 py-3"
                        >
                          <button
                            onClick={() => removeBet(bet.id)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#e74c3c] transition-colors hover:bg-[#e74c3c]/10"
                          >
                            <Minus size={14} />
                          </button>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-semibold text-white">
                              {bet.sport} {bet.team}
                            </p>
                            <p className="text-[12px] text-[#b0b5ba]">
                              {bet.type} {bet.line}{" "}
                              {bet.odds > 0 ? `+${bet.odds}` : bet.odds}
                            </p>
                          </div>
                          <span className="shrink-0 text-[13px] font-bold text-[#3498db]">
                            ${
                              bet.odds > 0
                                ? (bet.odds / 100 + 1).toFixed(2)
                                : (100 / Math.abs(bet.odds) + 1).toFixed(2)
                            }
                          </span>
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
                    <p className="text-xs text-[#555a60]">
                      {t(language, "selectOdds")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="shrink-0 border-t border-[#555a60] p-4">
              {/* Activate If */}
              <label className="mb-3 flex min-h-[44px] cursor-pointer items-center gap-2">
                <div
                  onClick={() => setActivateIf(!activateIf)}
                  className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                    activateIf
                      ? "border-[#3498db] bg-[#3498db]"
                      : "border-[#555a60] bg-transparent"
                  }`}
                >
                  {activateIf && (
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                    >
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
                <span className="text-[13px] text-white">
                  {t(language, "activarSi")}
                </span>
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
                  className="w-full min-h-[44px] rounded border border-[#555a60] bg-[#4a4f57] px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#3498db]"
                />
              </div>

              {/* Payout */}
              <div className="mb-4">
                <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
                  {t(language, "premio")}
                </label>
                <span className="text-base font-bold text-[#3498db]">
                  ${payout.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <button className="mb-2 w-full min-h-[48px] rounded bg-[#3498db] py-3.5 text-sm font-bold uppercase text-white transition-all hover:bg-[#2980b9] active:scale-[0.98]">
                {t(language, "guardar")}
              </button>
              <button
                onClick={
                  selectedBets.length > 0 ? toggleClearConfirm : undefined
                }
                className="w-full min-h-[48px] rounded bg-[#e74c3c] py-3.5 text-sm font-bold uppercase text-white transition-all hover:bg-[#c0392b] active:scale-[0.98] disabled:opacity-50"
                disabled={selectedBets.length === 0}
              >
                {t(language, "limpiar")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
