import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import type { SavedTicket } from "@/context/AppContext";

// Mock saved tickets for demo
const mockTickets: SavedTicket[] = [
  {
    id: "ticket-001",
    date: "11/06/2026",
    time: "10:30 AM",
    amount: 20,
    payout: 63.0,
    status: "pendiente",
    selections: [
      {
        id: "sel-001",
        sport: "MLB",
        gameId: "game-001",
        team: "Cardinals",
        type: "R/L",
        line: "+1.5",
        odds: -165,
        timestamp: Date.now() - 3600000,
      },
      {
        id: "sel-002",
        sport: "MLB",
        gameId: "game-001",
        team: "Cardinals vs Mets",
        type: "A MAS",
        line: "9.0",
        odds: -105,
        timestamp: Date.now() - 3500000,
      },
    ],
  },
  {
    id: "ticket-002",
    date: "11/06/2026",
    time: "09:15 AM",
    amount: 35,
    payout: 87.5,
    status: "pendiente",
    selections: [
      {
        id: "sel-003",
        sport: "MLB",
        gameId: "game-002",
        team: "Yankees",
        type: "M.L.",
        line: "",
        odds: -140,
        timestamp: Date.now() - 7200000,
      },
      {
        id: "sel-004",
        sport: "NBA",
        gameId: "game-003",
        team: "Lakers",
        type: "R/L",
        line: "-4.5",
        odds: -110,
        timestamp: Date.now() - 7100000,
      },
    ],
  },
];

export default function Tickets() {
  const { language, savedTickets } = useApp();
  const [searchDate, setSearchDate] = useState("11/06/2026");
  const [showWinnersOnly, setShowWinnersOnly] = useState(false);
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  // Combine context saved tickets with mock tickets for demo
  const allTickets = [...savedTickets, ...mockTickets];

  const filteredTickets = showWinnersOnly
    ? allTickets.filter((t) => t.status === "ganado")
    : allTickets;

  const toggleExpand = (ticketId: string) => {
    setExpandedTicketId((prev) => (prev === ticketId ? null : ticketId));
  };

  return (
    <div className="min-h-[100dvh] bg-[#f0f0f0] pt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-3"
      >
        {/* Top Section - White Card */}
        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-center text-lg font-bold text-[#333333]">
            {t(language, "fecha")}
          </h2>

          {/* Date Input */}
          <div className="mb-3">
            <input
              type="text"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full rounded border border-[#ddd] bg-[#f5f5f5] px-3 py-2.5 text-center text-sm text-[#333333] outline-none focus:border-[#3498db]"
            />
          </div>

          {/* Toggle + Search buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowWinnersOnly(!showWinnersOnly)}
              className={`flex-1 rounded py-2.5 text-xs font-bold uppercase transition-colors ${
                showWinnersOnly
                  ? "bg-[#2ecc71] text-white"
                  : "bg-[#6c757d] text-white hover:bg-[#5a6268]"
              }`}
            >
              Tickets ganadores
            </button>
            <button className="flex-1 rounded bg-[#3498db] py-2.5 text-xs font-bold uppercase text-white transition-colors hover:bg-[#2980b9]">
              Buscar tickets
            </button>
          </div>
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-[#7f8c8d]">
              {t(language, "noTicketsAbiertos")}
            </p>
          </div>
        ) : (
          <div className="space-y-3 pb-16">
            {filteredTickets.map((ticket, idx) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.2 }}
                className="overflow-hidden rounded-lg bg-[#6c757d] shadow-sm"
              >
                {/* Ticket Header Row */}
                <button
                  onClick={() => toggleExpand(ticket.id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <div className="flex-1">
                    <span className="text-sm font-bold text-white">
                      ${ticket.amount.toFixed(2)} - Jugadas(
                      {ticket.selections.length}) {ticket.time} - {}{" "}
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                          ticket.status === "pendiente"
                            ? "bg-[#f39c12] text-white"
                            : ticket.status === "ganado"
                              ? "bg-[#2ecc71] text-white"
                              : "bg-[#e74c3c] text-white"
                        }`}
                      >
                        {ticket.status}
                      </span>{" "}
                      ${ticket.payout.toFixed(2)}
                    </span>
                  </div>
                  <div className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#555a60] text-white">
                    {expandedTicketId === ticket.id ? (
                      <Minus size={14} />
                    ) : (
                      <Plus size={14} />
                    )}
                  </div>
                </button>

                {/* Expanded Selections */}
                <AnimatePresence>
                  {expandedTicketId === ticket.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 px-3 pb-3">
                        {ticket.selections.map((sel, sIdx) => (
                          <div
                            key={sIdx}
                            className="rounded-lg bg-[#3498db] p-3"
                          >
                            <div className="flex items-start gap-2">
                              {/* MLB Logo placeholder */}
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#3498db]">
                                {sel.sport}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-bold text-white">
                                  {sel.sport} - {sel.team} ({sel.type}){" "}
                                  {sel.line} {sel.odds > 0 ? `+${sel.odds}` : sel.odds}
                                </p>
                                <p className="mt-0.5 text-[11px] text-white/80">
                                  Inicio del juego {ticket.date} {ticket.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
