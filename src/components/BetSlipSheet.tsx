import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Trash2, Home } from "lucide-react";
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
    saveTicket,
    betSlipViewTab,
    setBetSlipViewTab,
    savedTickets,
  } = useApp();

  const [showNumpad, setShowNumpad] = useState(false);

  // Calculate PREMIO (payout based on amount)
  const premio = useMemo(() => {
    const amount = parseFloat(betAmount) || 0;
    if (amount <= 0 || selectedBets.length === 0) return 0;
    let totalMultiplier = 1;
    for (const bet of selectedBets) {
      const odds = bet.odds;
      if (odds > 0) totalMultiplier *= odds / 100 + 1;
      else if (odds < 0) totalMultiplier *= 100 / Math.abs(odds) + 1;
    }
    return amount * (totalMultiplier - 1);
  }, [betAmount, selectedBets]);

  // Calculate PREMIO IF
  const premioIf = useMemo(() => {
    if (!activateIf || selectedBets.length === 0) return 0;
    const amount = parseFloat(betAmount) || 0;
    if (amount <= 0) return 0;
    // For "if" bet, calculate on first selection only
    const firstBet = selectedBets[0];
    if (!firstBet) return 0;
    let multiplier = 1;
    const odds = firstBet.odds;
    if (odds > 0) multiplier = odds / 100 + 1;
    else if (odds < 0) multiplier = 100 / Math.abs(odds) + 1;
    return amount * (multiplier - 1);
  }, [betAmount, selectedBets, activateIf]);

  const handleNumpadDigit = (digit: string) => {
    const current = betAmount;
    if (current === "0" && digit !== ".") {
      setBetAmount(digit);
    } else {
      setBetAmount(current + digit);
    }
  };

  const handleNumpadBackspace = () => {
    setBetAmount(betAmount.slice(0, -1));
  };

  const handleNumpadOK = () => {
    setShowNumpad(false);
  };

  const handleLimpiar = () => {
    if (selectedBets.length > 0) {
      toggleClearConfirm();
    }
  };

  const numpadButtons = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["←", "0", "OK"],
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
            className="fixed inset-0 z-[55] bg-black/60"
            onClick={toggleBetSlipSheet}
          />

          {/* Sheet - covers most of the screen */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[56] flex max-h-[92vh] flex-col rounded-t-xl bg-[#3a3f47] shadow-2xl"
            style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
          >
            {/* Section 1: Cantidad Display (Golden) */}
            <div
              className="shrink-0 cursor-pointer px-4 py-3"
              onClick={() => setShowNumpad(!showNumpad)}
            >
              <div className="text-center text-[11px] font-semibold uppercase tracking-wide text-[#b0b5ba]">
                {t(language, "cantidad")}
              </div>
              <div className="mt-1 rounded bg-[#d4a843] px-4 py-2 text-center">
                <span className="text-2xl font-bold text-black">
                  {betAmount ? `$${betAmount}` : "$0"}
                </span>
              </div>
            </div>

            {/* Section 2: PREMIO | PREMIO IF | Activate if */}
            <div className="shrink-0 flex items-center gap-2 border-b border-[#555a60] px-3 py-2">
              <div className="flex-1 rounded bg-[#2c2f33] px-2 py-1.5 text-center">
                <div className="text-[9px] font-bold uppercase text-[#b0b5ba]">
                  {t(language, "premio")}
                </div>
                <div className="text-sm font-bold text-white">
                  ${premio.toFixed(2)}
                </div>
              </div>
              <div className="flex-1 rounded bg-[#2c2f33] px-2 py-1.5 text-center">
                <div className="text-[9px] font-bold uppercase text-[#b0b5ba]">
                  {t(language, "premioIf")}
                </div>
                <div className="text-sm font-bold text-white">
                  ${premioIf.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => setActivateIf(!activateIf)}
                className={`shrink-0 rounded px-3 py-2 text-xs font-bold uppercase transition-colors ${
                  activateIf
                    ? "bg-white text-[#333333]"
                    : "bg-white text-[#333333]"
                }`}
              >
                {t(language, "activarSi")}
              </button>
            </div>

            {/* Section 3: Cerrar v (green button) */}
            <button
              onClick={toggleBetSlipSheet}
              className="shrink-0 flex w-full items-center justify-center gap-1 bg-[#2ecc71] py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-[#27ae60]"
            >
              Cerrar
              <ChevronDown size={16} />
            </button>

            {/* Section 4: Tabs: Jugar | Tickets abiertos */}
            <div className="shrink-0 flex border-b border-[#555a60]">
              <button
                onClick={() => setBetSlipViewTab("jugar")}
                className={`flex-1 py-2.5 text-center text-sm font-bold uppercase transition-colors ${
                  betSlipViewTab === "jugar"
                    ? "border-b-2 border-[#3498db] text-[#3498db]"
                    : "text-[#b0b5ba] hover:text-white"
                }`}
              >
                {t(language, "jugar")}
              </button>
              <button
                onClick={() => setBetSlipViewTab("ticketsAbiertos")}
                className={`flex-1 py-2.5 text-center text-sm font-bold uppercase transition-colors ${
                  betSlipViewTab === "ticketsAbiertos"
                    ? "border-b-2 border-[#3498db] text-[#3498db]"
                    : "text-[#b0b5ba] hover:text-white"
                }`}
              >
                {t(language, "ticketsAbiertos")}
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              {/* JUGAR TAB */}
              {betSlipViewTab === "jugar" && (
                <div>
                  {/* Section 5: Action row */}
                  <div className="flex items-center gap-1 border-b border-[#555a60] px-2 py-2">
                    <button className="flex-1 rounded bg-[#4a4f57] py-1.5 text-[10px] font-bold uppercase text-white">
                      {t(language, "teaser")}
                    </button>
                    <button className="flex-1 rounded bg-[#4a4f57] py-1.5 text-[10px] font-bold uppercase text-white">
                      {t(language, "teaserIF")}
                    </button>
                    <button
                      onClick={handleLimpiar}
                      className="flex items-center gap-1 rounded bg-[#e74c3c] px-3 py-1.5 text-[10px] font-bold uppercase text-white transition-colors hover:bg-[#c0392b]"
                    >
                      <Trash2 size={10} />
                      {t(language, "limpiar")}
                    </button>
                    <button
                      onClick={saveTicket}
                      className="rounded bg-[#3498db] px-4 py-1.5 text-[10px] font-bold uppercase text-white transition-colors hover:bg-[#2980b9]"
                    >
                      {t(language, "crear")}
                    </button>
                  </div>

                  {/* Section 6: Jugadas regulares label */}
                  <div className="px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-[#b0b5ba]">
                    {t(language, "jugadasRegulares")}
                  </div>

                  {/* Section 7: Selections table */}
                  {selectedBets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-5 py-8">
                      <p className="mb-1 text-sm text-[#7f8c8d]">
                        {t(language, "noSelectionsMsg")}
                      </p>
                      <p className="text-xs text-[#555a60]">
                        {t(language, "selectOdds")}
                      </p>
                    </div>
                  ) : (
                    <div className="px-2">
                      {/* Table headers */}
                      <div className="grid grid-cols-[1fr_60px_60px_50px_40px] gap-1 border-b border-[#555a60] px-2 py-1.5 text-[9px] font-bold uppercase text-[#b0b5ba]">
                        <div>{t(language, "jugada")}</div>
                        <div className="text-center">{t(language, "linea")}</div>
                        <div className="text-center">{t(language, "premio")}</div>
                        <div className="text-center">{t(language, "puntos")}</div>
                        <div />
                      </div>

                      {/* Bet rows */}
                      <AnimatePresence>
                        {selectedBets.map((bet) => (
                          <motion.div
                            key={bet.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-[1fr_60px_60px_50px_40px] gap-1 border-b border-[#555a60] px-2 py-2 items-center"
                          >
                            {/* Jugada: Type + Team */}
                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-bold text-white">
                                {bet.type}
                              </p>
                              <p className="truncate text-[10px] text-[#b0b5ba]">
                                {bet.team}
                              </p>
                            </div>
                            {/* Linea */}
                            <div className="text-center text-[11px] font-semibold text-white">
                              {bet.line}
                            </div>
                            {/* Premio (odds) */}
                            <div className="text-center text-[11px] font-bold text-[#3498db]">
                              {bet.odds > 0 ? `+${bet.odds}` : bet.odds}
                            </div>
                            {/* Puntos */}
                            <div className="text-center text-[11px] text-[#b0b5ba]">
                              {bet.points || ""}
                            </div>
                            {/* Delete button */}
                            <button
                              onClick={() => removeBet(bet.id)}
                              className="flex h-8 w-full items-center justify-center rounded bg-[#e74c3c] text-white transition-colors hover:bg-[#c0392b]"
                            >
                              <Trash2 size={14} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}

              {/* TICKETS ABIERTOS TAB */}
              {betSlipViewTab === "ticketsAbiertos" && (
                <div className="px-3 py-3">
                  {savedTickets.length === 0 ? (
                    <div className="py-8 text-center text-sm text-[#7f8c8d]">
                      {t(language, "noTicketsAbiertos")}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedTickets.map((ticket) => (
                        <motion.div
                          key={ticket.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg border border-[#555a60] bg-[#4a4f57] p-3"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              ${ticket.amount.toFixed(2)} - Jugadas(
                              {ticket.selections.length}) {ticket.time}
                            </span>
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                                ticket.status === "pendiente"
                                  ? "bg-[#f39c12] text-white"
                                  : ticket.status === "ganado"
                                    ? "bg-[#2ecc71] text-white"
                                    : "bg-[#e74c3c] text-white"
                              }`}
                            >
                              {ticket.status}
                            </span>
                          </div>
                          <div className="text-xs text-[#3498db] font-semibold">
                            Paga: ${ticket.payout.toFixed(2)}
                          </div>
                          {ticket.selections.map((sel, idx) => (
                            <div
                              key={idx}
                              className="mt-1 border-t border-[#555a60] pt-1 text-[11px] text-[#b0b5ba]"
                            >
                              {sel.sport} - {sel.team} ({sel.type}) {sel.line}{" "}
                              {sel.odds > 0 ? `+${sel.odds}` : sel.odds}
                            </div>
                          ))}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Section 8: NUMPAD */}
            <AnimatePresence>
              {showNumpad && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 border-t border-[#555a60] bg-[#3a3f47] px-3 py-2"
                >
                  {/* Numpad Grid */}
                  <div className="space-y-1.5">
                    {numpadButtons.map((row, rowIdx) => (
                      <div key={rowIdx} className="flex gap-1.5">
                        {row.map((btn) => (
                          <button
                            key={btn}
                            onClick={() => {
                              if (btn === "←") handleNumpadBackspace();
                              else if (btn === "OK") handleNumpadOK();
                              else handleNumpadDigit(btn);
                            }}
                            className={`flex-1 rounded py-2.5 text-lg font-bold transition-colors active:scale-95 ${
                              btn === "OK"
                                ? "bg-[#2ecc71] text-white hover:bg-[#27ae60]"
                                : "bg-[#b0b5ba] text-black hover:bg-[#9ba0a5]"
                            }`}
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Bottom row: Home + Crear */}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setShowNumpad(false);
                        toggleBetSlipSheet();
                      }}
                      className="flex flex-1 items-center justify-center gap-1 rounded bg-[#e74c3c] py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-[#c0392b]"
                    >
                      <Home size={16} />
                    </button>
                    <button
                      onClick={saveTicket}
                      className="flex flex-1 items-center justify-center rounded bg-[#3498db] py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-[#2980b9]"
                    >
                      {t(language, "crear")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
