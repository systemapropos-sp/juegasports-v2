import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";

interface Ticket {
  id: string;
  date: string;
  sport: string;
  plays: number;
  amount: number;
  payout: number;
  status: "pending" | "won" | "lost" | "cashed";
}

const mockTickets: Ticket[] = [
  { id: "T-1001", date: "2025-06-10", sport: "MLB", plays: 3, amount: 50, payout: 142.5, status: "won" },
  { id: "T-1002", date: "2025-06-10", sport: "NBA", plays: 2, amount: 25, payout: 0, status: "lost" },
  { id: "T-1003", date: "2025-06-09", sport: "Soccer", plays: 1, amount: 100, payout: 250, status: "won" },
  { id: "T-1004", date: "2025-06-09", sport: "MLB", plays: 4, amount: 75, payout: 0, status: "pending" },
  { id: "T-1005", date: "2025-06-08", sport: "WNBA", plays: 2, amount: 30, payout: 54, status: "cashed" },
  { id: "T-1006", date: "2025-06-08", sport: "LMB", plays: 1, amount: 40, payout: 0, status: "lost" },
  { id: "T-1007", date: "2025-06-07", sport: "NBA-S", plays: 3, amount: 60, payout: 180, status: "won" },
  { id: "T-1008", date: "2025-06-07", sport: "MLB", plays: 2, amount: 20, payout: 0, status: "pending" },
];

const statusColors: Record<string, string> = {
  pending: "bg-[#f39c12] text-white",
  won: "bg-[#2ecc71] text-white",
  lost: "bg-[#e74c3c] text-white",
  cashed: "bg-[#3498db] text-white",
};

export default function Tickets() {
  const { language } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockTickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.sport.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-[100dvh] bg-[#3a3f47] pt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-3"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-bold text-white">{t(language, "tickets")}</h1>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7f8c8d]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-10 w-44 rounded-md border border-[#555a60] bg-[#4a4f57] pl-9 pr-3 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#3498db]"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex gap-2 overflow-x-auto hide-scrollbar">
          {["all", "pending", "won", "lost", "cashed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded px-3 py-1.5 text-xs font-semibold uppercase transition-colors min-h-[36px] ${
                filter === f
                  ? "bg-[#3498db] text-white"
                  : "bg-[#4a4f57] text-[#b0b5ba] hover:bg-[#4a4f57]/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Mobile: Card layout */}
        <div className="space-y-3 pb-16">
          {filtered.map((ticket, idx) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.2 }}
              className={`rounded-lg border border-[#555a60] p-4 ${
                idx % 2 === 0 ? "bg-[#3a3f47]" : "bg-[#4a4f57]"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-white">{ticket.id}</span>
                <span
                  className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase ${
                    statusColors[ticket.status]
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="block text-[#7f8c8d]">Date</span>
                  <span className="text-white">{ticket.date}</span>
                </div>
                <div>
                  <span className="block text-[#7f8c8d]">Sport</span>
                  <span className="font-semibold text-white">{ticket.sport}</span>
                </div>
                <div>
                  <span className="block text-[#7f8c8d]">Plays</span>
                  <span className="text-white">{ticket.plays}</span>
                </div>
                <div>
                  <span className="block text-[#7f8c8d]">Amount</span>
                  <span className="text-white">${ticket.amount.toFixed(2)}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[#7f8c8d]">Payout</span>
                  <span className="font-bold text-[#3498db]">${ticket.payout.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-[#7f8c8d]">
            No tickets found
          </div>
        )}
      </motion.div>
    </div>
  );
}
