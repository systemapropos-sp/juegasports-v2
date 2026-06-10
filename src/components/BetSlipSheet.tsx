import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';

export default function BetSlipSheet() {
  const {
    isBetSlipSheetOpen,
    toggleBetSlipSheet,
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

  const tabs: { key: 'teaser' | 'teaserIF' | 'regular'; label: string }[] = [
    { key: 'teaser', label: t(language, 'teaser') },
    { key: 'teaserIF', label: t(language, 'teaserIF') },
    { key: 'regular', label: t(language, 'jugadasRegulares') },
  ];

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
            className="fixed inset-0 z-[55] bg-black/60 md:hidden"
            onClick={toggleBetSlipSheet}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[56] max-h-[85vh] rounded-t-2xl bg-[#3a3f47] shadow-2xl md:hidden flex flex-col"
            style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
          >
            {/* Drag Handle */}
            <div className="flex items-center justify-center border-b border-[#555a60] px-4 py-2">
              <div className="h-1 w-10 rounded-full bg-[#555a60]" />
            </div>

            {/* Header Tabs */}
            <div className="flex shrink-0 border-b border-[#555a60]">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setBetSlipTab(tab.key)}
                  className={`flex-1 py-3 text-center text-[13px] font-semibold transition-all duration-150 min-h-[44px] ${
                    betSlipTab === tab.key
                      ? 'border-b-2 border-b-[#3498db] bg-white font-bold text-[#333333]'
                      : 'border-b-2 border-b-transparent bg-[#4a4f57] text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={toggleBetSlipSheet}
              className="absolute right-3 top-11 flex h-8 w-8 items-center justify-center rounded-full bg-[#4a4f57] text-[#7f8c8d] hover:text-white"
            >
              <X size={16} />
            </button>

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
                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_60px_50px_50px_36px] bg-[#2c3e50] px-2 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                      <span className="px-1">{t(language, 'jugada')}</span>
                      <span className="px-1 text-center">{t(language, 'linea')}</span>
                      <span className="px-1 text-center">{t(language, 'premio')}</span>
                      <span className="px-1 text-center">{t(language, 'puntos')}</span>
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
                          className="grid grid-cols-[1fr_60px_50px_50px_36px] items-center border-b border-[#555a60] bg-[#4a4f57] px-2 py-3 min-h-[44px]"
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
                            {bet.points || '-'}
                          </span>
                          <button
                            onClick={() => removeBet(bet.id)}
                            className="flex h-7 w-7 items-center justify-center rounded text-[#e74c3c] transition-colors hover:bg-[#e74c3c]/10"
                          >
                            <Minus size={14} />
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
                      {t(language, 'noSelectionsMsg')}
                    </p>
                    <p className="text-xs text-[#555a60]">{t(language, 'selectOdds')}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="shrink-0 border-t border-[#555a60] p-4">
              {/* Activate If */}
              <label className="mb-3 flex cursor-pointer items-center gap-2 min-h-[44px]">
                <div
                  onClick={() => setActivateIf(!activateIf)}
                  className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                    activateIf
                      ? 'border-[#3498db] bg-[#3498db]'
                      : 'border-[#555a60] bg-transparent'
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
                <span className="text-[13px] text-white">{t(language, 'activateIf')}</span>
              </label>

              {/* Amount */}
              <div className="mb-3">
                <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
                  {t(language, 'cantidad')}
                </label>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="$0.00"
                  className="w-full rounded border border-[#555a60] bg-[#4a4f57] px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#3498db] min-h-[44px]"
                />
              </div>

              {/* Payout */}
              <div className="mb-4">
                <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
                  {t(language, 'pago')}
                </label>
                <span className="text-base font-bold text-[#3498db]">
                  ${payout.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <button className="mb-2 w-full rounded bg-[#3498db] py-3.5 text-sm font-bold uppercase text-white transition-all hover:bg-[#2980b9] active:scale-[0.98] min-h-[48px]">
                {t(language, 'guardar')}
              </button>
              <button
                onClick={selectedBets.length > 0 ? toggleClearConfirm : undefined}
                className="w-full rounded bg-[#e74c3c] py-3.5 text-sm font-bold uppercase text-white transition-all hover:bg-[#c0392b] active:scale-[0.98] disabled:opacity-50 min-h-[48px]"
                disabled={selectedBets.length === 0}
              >
                {t(language, 'limpiar')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
