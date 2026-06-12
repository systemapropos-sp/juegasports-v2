import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

// Help Modal
export function HelpModal() {
  const { isHelpModalOpen, toggleHelpModal, language } = useApp();
  const [activeHelpTab, setActiveHelpTab] = useState("Baseball");

  const helpTabs = [
    t(language, "ayudaBaseball"),
    t(language, "ayudaBaloncesto"),
    t(language, "ayudaFootball"),
    t(language, "ayudaHockey"),
    t(language, "ayudaSoccer"),
    t(language, "ayudaTiza"),
  ];

  const rulesMap: Record<string, string> = {
    Baseball: t(language, "rulesBaseball"),
    Baloncesto: t(language, "rulesBasketball"),
    Basketball: t(language, "rulesBasketball"),
    Football: t(language, "rulesFootball"),
    Hockey: t(language, "rulesHockey"),
    Soccer: t(language, "rulesSoccer"),
    Tiza: t(language, "rulesTiza"),
    Chalk: t(language, "rulesTiza"),
  };

  return (
    <AnimatePresence>
      {isHelpModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleHelpModal}
          />
          <motion.div
            className="relative z-10 w-full max-w-[600px] rounded-lg bg-white p-6 shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#333333]">
                {t(language, "ayuda")}
              </h2>
              <button
                onClick={toggleHelpModal}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#7f8c8d] transition-colors hover:bg-[#f5f5f5] hover:text-[#333333]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Help Tabs */}
            <div className="mb-4 flex border-b border-[#e0e0e0]">
              {helpTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveHelpTab(tab)}
                  className={`px-4 py-2 text-[13px] font-semibold transition-colors ${
                    activeHelpTab === tab
                      ? "border-b-2 border-[#3498db] text-[#3498db]"
                      : "text-[#555555] hover:text-[#333333]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Rules Content */}
            <div className="min-h-[120px] text-[15px] leading-relaxed text-[#555555]">
              {rulesMap[activeHelpTab] || rulesMap["Baseball"]}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={toggleHelpModal}
                className="rounded bg-[#7f8c8d] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#6c7778]"
              >
                {t(language, "cancelar")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Withdrawal Notice Modal
export function WithdrawalNoticeModal() {
  const { isWithdrawalNoticeOpen, toggleWithdrawalNotice, language } = useApp();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <AnimatePresence>
      {isWithdrawalNoticeOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleWithdrawalNotice}
          />
          <motion.div
            className="relative z-10 w-full max-w-[450px] rounded-lg bg-white p-6 shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#333333]">
                {t(language, "notificacionRetiro")}
              </h2>
              <button
                onClick={toggleWithdrawalNotice}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#7f8c8d] transition-colors hover:bg-[#f5f5f5] hover:text-[#333333]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
                  {t(language, "fecha")}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded border border-[#ddd] bg-[#f5f5f5] px-3 py-2 text-[#333333] outline-none focus:border-[#3498db] focus:ring-2 focus:ring-[#3498db]/15"
                />
              </div>
              <div>
                <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
                  {t(language, "horaLabel")}
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded border border-[#ddd] bg-[#f5f5f5] px-3 py-2 text-[#333333] outline-none focus:border-[#3498db] focus:ring-2 focus:ring-[#3498db]/15"
                />
              </div>
              <div>
                <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
                  {t(language, "cantidadLabel")}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7f8c8d]">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded border border-[#ddd] bg-[#f5f5f5] py-2 pl-7 pr-3 text-[#333333] outline-none focus:border-[#3498db] focus:ring-2 focus:ring-[#3498db]/15"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={toggleWithdrawalNotice}
                className="rounded bg-[#7f8c8d] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#6c7778]"
              >
                {t(language, "cancelar")}
              </button>
              <button className="rounded bg-[#3498db] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#2980b9]">
                {t(language, "notificar")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Generate Code Modal
export function GenerateCodeModal() {
  const { isGenerateCodeOpen, toggleGenerateCode, language } = useApp();
  const [code, setCode] = useState("");

  return (
    <AnimatePresence>
      {isGenerateCodeOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleGenerateCode}
          />
          <motion.div
            className="relative z-10 w-full max-w-[450px] rounded-lg bg-white p-6 shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#333333]">
                {t(language, "generarCodigoTitle")}
              </h2>
              <button
                onClick={toggleGenerateCode}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#7f8c8d] transition-colors hover:bg-[#f5f5f5] hover:text-[#333333]"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder=""
                className="w-full rounded border border-[#ddd] bg-[#f5f5f5] px-3 py-2 text-[#333333] outline-none focus:border-[#3498db] focus:ring-2 focus:ring-[#3498db]/15"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={toggleGenerateCode}
                className="rounded bg-[#7f8c8d] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#6c7778]"
              >
                {t(language, "cancelar")}
              </button>
              <button className="rounded bg-[#3498db] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#2980b9]">
                {t(language, "generar")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Clear Confirmation Modal
export function ClearConfirmModal() {
  const { isClearConfirmOpen, toggleClearConfirm, clearBets, language } = useApp();

  const handleConfirm = () => {
    clearBets();
    toggleClearConfirm();
  };

  return (
    <AnimatePresence>
      {isClearConfirmOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleClearConfirm}
          />
          <motion.div
            className="relative z-10 w-full max-w-[400px] rounded-lg bg-white p-6 shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#333333]">
                {t(language, "confirmacion")}
              </h2>
              <button
                onClick={toggleClearConfirm}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#7f8c8d] transition-colors hover:bg-[#f5f5f5] hover:text-[#333333]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mb-6 text-[15px] text-[#555555]">
              {t(language, "confirmacionLimpiar")}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={toggleClearConfirm}
                className="rounded bg-[#7f8c8d] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#6c7778]"
              >
                {t(language, "cancelar")}
              </button>
              <button
                onClick={handleConfirm}
                className="rounded bg-[#e74c3c] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#c0392b]"
              >
                {t(language, "confirmar")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Last Movements Modal
export function LastMovementsModal() {
  const { isLastMovementsOpen, toggleLastMovements, language } = useApp();

  const movements = [
    {
      date: "11/06/26 11:00 AM",
      description: "Recarga de cliente",
      type: "Credito",
      amount: 100.00,
      balance: 100.00,
    },
    {
      date: "11/06/26 11:01 AM",
      description: "Ticket creado",
      type: "Debito",
      amount: -20.00,
      balance: 80.00,
    },
  ];

  return (
    <AnimatePresence>
      {isLastMovementsOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleLastMovements}
          />
          <motion.div
            className="relative z-10 w-full max-w-[600px] rounded-lg bg-white p-6 shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#333333]">
                {t(language, "ultimosMovimientos")}
              </h2>
              <button
                onClick={toggleLastMovements}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#7f8c8d] transition-colors hover:bg-[#f5f5f5] hover:text-[#333333]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e0e0e0]">
                    <th className="py-2 text-left text-[13px] font-semibold text-[#555555]">
                      {t(language, "fecha")}
                    </th>
                    <th className="py-2 text-left text-[13px] font-semibold text-[#555555]">
                      {t(language, "descripcion")}
                    </th>
                    <th className="py-2 text-left text-[13px] font-semibold text-[#555555]">
                      {t(language, "tipo")}
                    </th>
                    <th className="py-2 text-right text-[13px] font-semibold text-[#555555]">
                      {t(language, "monto")}
                    </th>
                    <th className="py-2 text-right text-[13px] font-semibold text-[#555555]">
                      {t(language, "balanceLabel")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map((m, i) => (
                    <tr key={i} className="border-b border-[#f0f0f0]">
                      <td className="py-2.5 text-[#333333]">{m.date}</td>
                      <td className="py-2.5 text-[#333333]">{m.description}</td>
                      <td className="py-2.5">
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-semibold ${
                            m.type === "Credito"
                              ? "bg-[#2ecc71]/15 text-[#2ecc71]"
                              : "bg-[#e74c3c]/15 text-[#e74c3c]"
                          }`}
                        >
                          {m.type}
                        </span>
                      </td>
                      <td
                        className={`py-2.5 text-right font-semibold ${
                          m.amount >= 0 ? "text-[#2ecc71]" : "text-[#e74c3c]"
                        }`}
                      >
                        {m.amount >= 0 ? "+" : ""}
                        {m.amount.toFixed(2)}
                      </td>
                      <td className="py-2.5 text-right font-semibold text-[#333333]">
                        {m.balance.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={toggleLastMovements}
                className="rounded bg-[#7f8c8d] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#6c7778]"
              >
                {t(language, "cancelar")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Parlay Calculator Modal
export function ParlayCalculatorModal() {
  const { isParlayCalculatorOpen, toggleParlayCalculator, language } = useApp();
  const [odds, setOdds] = useState<string[]>(Array(10).fill(""));
  const [betAmount, setBetAmount] = useState("");
  const [premio, setPremio] = useState(0);
  const [pago, setPago] = useState(0);

  const handleOddsChange = (index: number, value: string) => {
    const newOdds = [...odds];
    newOdds[index] = value;
    setOdds(newOdds);
  };

  const handleCalculate = () => {
    const amount = parseFloat(betAmount) || 0;
    if (amount <= 0) {
      setPremio(0);
      setPago(0);
      return;
    }

    let totalDecimal = 1;
    let hasValidOdds = false;

    for (const oddStr of odds) {
      const odd = parseFloat(oddStr);
      if (!isNaN(odd) && odd !== 0) {
        hasValidOdds = true;
        if (odd > 0) {
          totalDecimal *= odd / 100 + 1;
        } else {
          totalDecimal *= 100 / Math.abs(odd) + 1;
        }
      }
    }

    if (!hasValidOdds) {
      setPremio(0);
      setPago(0);
      return;
    }

    const totalPayout = amount * totalDecimal;
    setPremio(totalPayout);
    setPago(totalPayout - amount);
  };

  const handleCancel = () => {
    setOdds(Array(10).fill(""));
    setBetAmount("");
    setPremio(0);
    setPago(0);
    toggleParlayCalculator();
  };

  return (
    <AnimatePresence>
      {isParlayCalculatorOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCancel}
          />
          <motion.div
            className="relative z-10 w-full max-w-[450px] rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#333333]">
                {t(language, "calculadora")} Parlay
              </h2>
              <button
                onClick={handleCancel}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#7f8c8d] transition-colors hover:bg-[#f5f5f5] hover:text-[#333333]"
              >
                <X size={18} />
              </button>
            </div>

            {/* 10 Odds Inputs */}
            <div className="space-y-2">
              {odds.map((odd, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-6 text-sm font-semibold text-[#555555]">
                    {i + 1}.
                  </span>
                  <input
                    type="number"
                    value={odd}
                    onChange={(e) => handleOddsChange(i, e.target.value)}
                    placeholder="0"
                    className="flex-1 rounded border border-[#ddd] bg-[#f5f5f5] px-3 py-1.5 text-sm text-[#333333] outline-none focus:border-[#3498db] focus:ring-2 focus:ring-[#3498db]/15"
                  />
                </div>
              ))}
            </div>

            {/* Bet Amount */}
            <div className="mt-4">
              <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
                {t(language, "apuesta")}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7f8c8d]">$</span>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded border border-[#ddd] bg-[#f5f5f5] py-2 pl-7 pr-3 text-[#333333] outline-none focus:border-[#3498db] focus:ring-2 focus:ring-[#3498db]/15"
                />
              </div>
            </div>

            {/* Premio */}
            <div className="mt-4">
              <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
                {t(language, "premio")}
              </label>
              <div className="rounded border border-[#ddd] bg-[#f5f5f5] px-3 py-2 text-sm font-semibold text-[#333333]">
                ${premio.toFixed(2)}
              </div>
            </div>

            {/* Pago */}
            <div className="mt-4">
              <label className="mb-1 block text-[13px] font-medium text-[#b0b5ba]">
                {t(language, "pago")}
              </label>
              <div className="rounded border border-[#ddd] bg-[#f5f5f5] px-3 py-2 text-lg font-bold text-[#2ecc71]">
                ${pago.toFixed(2)}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="rounded bg-[#7f8c8d] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#6c7778]"
              >
                {t(language, "cancelar")}
              </button>
              <button
                onClick={handleCalculate}
                className="rounded bg-[#3498db] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#2980b9]"
              >
                {t(language, "calcular")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Ticket Created Modal
export function TicketCreatedModal() {
  const { isTicketCreatedOpen, toggleTicketCreated, language } = useApp();

  const handleOk = () => {
    toggleTicketCreated();
  };

  return (
    <AnimatePresence>
      {isTicketCreatedOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleOk}
          />
          <motion.div
            className="relative z-10 w-full max-w-[360px] rounded-lg bg-white p-8 shadow-xl text-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            {/* Green Checkmark */}
            <div className="mb-4 flex justify-center">
              <CheckCircle size={64} className="text-[#2ecc71]" />
            </div>

            <h2 className="mb-2 text-xl font-bold text-[#333333]">
              {t(language, "ticketCreado")}
            </h2>
            <p className="mb-6 text-[15px] text-[#555555]">
              {t(language, "ticketCreadoExito")}
            </p>

            <button
              onClick={handleOk}
              className="w-full rounded bg-[#3498db] px-6 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-[#2980b9]"
            >
              {t(language, "ok")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Language Dropdown
export function LanguageDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { language, setLanguage } = useApp();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-1 w-[120px] overflow-hidden rounded-md border border-[#555a60] bg-[#4a4f57] shadow-lg"
          >
            <button
              onClick={() => handleSelect("en")}
              className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors ${
                language === "en"
                  ? "bg-[#3498db]/15 text-[#3498db]"
                  : "text-white hover:bg-[#3498db]/10 hover:text-[#3498db]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleSelect("es")}
              className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors ${
                language === "es"
                  ? "bg-[#3498db]/15 text-[#3498db]"
                  : "text-white hover:bg-[#3498db]/10 hover:text-[#3498db]"
              }`}
            >
              Espanol
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Results Dropdown
export function ResultsDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { language } = useApp();
  const items = [
    { label: t(language, "mlb"), url: "https://www.mlb.com/scores" },
    { label: t(language, "lmb"), url: "https://www.milb.com/scores" },
    { label: t(language, "lidom"), url: "https://www.lidom.com/resultados" },
    { label: t(language, "nba"), url: "https://www.nba.com/scores" },
    { label: t(language, "wnba"), url: "https://www.wnba.com/schedule?pd=2025&se=2025" },
    { label: t(language, "cbb"), url: "https://www.ncaa.com/scoreboard/basketball-men/d1" },
    { label: t(language, "nhl"), url: "https://www.nhl.com/scores" },
    { label: t(language, "nfl"), url: "https://www.nfl.com/scores/" },
    { label: t(language, "cfb"), url: "https://www.ncaa.com/scoreboard/football/fbs" },
    { label: t(language, "cfl"), url: "https://www.cfl.ca/scores/" },
    { label: "SOCCER", url: "https://www.espn.com/soccer/scores" },
    { label: t(language, "ufc"), url: "https://www.ufc.com/scores" },
    { label: t(language, "gallos"), url: "https://www.sabong.net/" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-1 w-[180px] overflow-hidden rounded-md border border-[#555a60] bg-[#4a4f57] shadow-lg"
          >
            {items.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:bg-[#3498db]/15 hover:text-[#3498db]"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// All modals container
export function AllModals() {
  return (
    <>
      <HelpModal />
      <WithdrawalNoticeModal />
      <GenerateCodeModal />
      <ClearConfirmModal />
      <LastMovementsModal />
      <ParlayCalculatorModal />
      <TicketCreatedModal />
    </>
  );
}
