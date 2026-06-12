import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import type { SportCode } from "@/data/mockData";

const sportCardData: {
  code: SportCode;
  name: string;
  logoUrl?: string;
  isSvg?: boolean;
}[] = [
  {
    code: "MLB",
    name: "MLB",
    logoUrl: "/logo-mlb.png",
  },
  {
    code: "LMB",
    name: "LMB",
    logoUrl: "/logo-lmb.png",
  },
  {
    code: "NBA",
    name: "NBA",
    logoUrl: "/logo-nba.png",
  },
  {
    code: "WNBA",
    name: "WNBA",
    logoUrl: "/logo-wnba.png",
  },
  {
    code: "BPS",
    name: "BPS",
    isSvg: true,
  },
  {
    code: "Soccer",
    name: "NACIONES",
    logoUrl: "/logo-naciones.png",
  },
  {
    code: "NBA-S",
    name: "NBA-S",
    isSvg: true,
  },
];

function SportCard({
  sport,
  onClick,
}: {
  sport: (typeof sportCardData)[number];
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="flex flex-col items-center rounded-xl bg-white p-4 shadow-md transition-shadow active:shadow-lg"
    >
      <div className="mb-2 flex h-16 w-full items-center justify-center overflow-hidden">
        {sport.logoUrl ? (
          <img
            src={sport.logoUrl}
            alt={sport.name}
            className="max-h-14 max-w-full object-contain"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : sport.code === "BPS" ? (
          <svg
            viewBox="0 0 64 64"
            className="h-14 w-14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="30" stroke="#1a3a1c" strokeWidth="2" fill="#f0f0f0" />
            <path
              d="M32 10 C22 10, 14 18, 14 28 C14 36, 18 42, 24 44 L24 54 L28 50 L32 54 L36 50 L40 54 L40 44 C46 42, 50 36, 50 28 C50 18, 42 10, 32 10 Z"
              fill="#1a3a1c"
            />
            <circle cx="26" cy="26" r="3" fill="#fff" />
            <circle cx="38" cy="26" r="3" fill="#fff" />
            <path d="M28 34 Q32 38, 36 34" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
        ) : sport.code === "NBA-S" ? (
          <svg
            viewBox="0 0 64 64"
            className="h-14 w-14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="30" stroke="#1a1a3e" strokeWidth="2" fill="#f0f0f0" />
            <path
              d="M20 48 L20 30 C20 22, 26 16, 32 16 C38 16, 44 22, 44 30 L44 48"
              stroke="#1a1a3e"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="32" cy="12" r="6" fill="#1a1a3e" />
            <path
              d="M26 38 L26 48 M38 38 L38 48"
              stroke="#1a1a3e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ) : null}
      </div>
      <span className="text-sm font-bold text-[#2c2f33]">{sport.name}</span>
    </motion.button>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const {
    toggleBetSlipSheet,
    betAmount,
    setBetAmount,
    selectedBets,
    language,
  } = useApp();

  const totalPayout = selectedBets.reduce((acc, bet) => {
    const amt = parseFloat(betAmount) || 0;
    if (amt <= 0) return 0;
    const odds = bet.odds;
    if (odds > 0) {
      return acc + amt * (odds / 100 + 1);
    } else {
      return acc + amt * (100 / Math.abs(odds) + 1);
    }
  }, 0);

  const handleSportClick = (code: SportCode) => {
    navigate(`/sport/${code}`);
  };

  return (
    <div className="min-h-[100dvh] bg-[#3a3f47] pt-12">
      {/* Top section: Cantidad, PREMIO, PREMIO SI, Activar si */}
      <div className="border-b border-[#555a60] bg-[#3a3f47] px-3 py-2">
        {/* Cantidad */}
        <div className="mb-2">
          <label className="mb-0.5 block text-[12px] font-medium text-[#b0b5ba]">
            {t(language, "cantidad")}
          </label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded border border-[#555a60] bg-white px-3 py-2 text-sm text-[#2c2f33] outline-none transition-colors placeholder:text-[#999] focus:border-[#e74c3c]"
          />
        </div>

        {/* PREMIO | PREMIO SI | Activar si */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="text-[11px] font-semibold text-[#b0b5ba]">
              {t(language, "premio")}
            </span>
            <p className="text-[14px] font-bold text-white">
              ${totalPayout.toFixed(2)}
            </p>
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-semibold text-[#b0b5ba]">
              {t(language, "premioSi")}
            </span>
            <p className="text-[14px] font-bold text-white">
              ${totalPayout.toFixed(2)}
            </p>
          </div>
          <button className="shrink-0 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#2c2f33] shadow transition-colors active:bg-gray-100">
            {t(language, "activarSi")}
          </button>
        </div>
      </div>

      {/* Sport Cards Grid */}
      <div className="px-3 py-4">
        <div className="grid grid-cols-3 gap-3">
          {sportCardData.map((sport) => (
            <SportCard
              key={sport.code}
              sport={sport}
              onClick={() => handleSportClick(sport.code)}
            />
          ))}
        </div>
      </div>

      {/* Bottom: Tus jugadas button - positioned above bottom nav */}
      <div className="fixed bottom-16 left-0 right-0 z-30 p-3">
        <button
          onClick={() => toggleBetSlipSheet()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2ecc71] py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all active:scale-[0.98] active:bg-[#27ae60]"
        >
          <span>{t(language, "tusJugadas")}</span>
          <ChevronUp size={18} />
          {selectedBets.length > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#2ecc71]">
              {selectedBets.length}
            </span>
          )}
        </button>
      </div>

      {/* Spacer for bottom button + nav */}
      <div className="h-32" />
    </div>
  );
}
