import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { sportsList } from "@/data/mockData";
import type { SportCode } from "@/data/mockData";

export default function SportsSidebar() {
  const { currentSport, setCurrentSport } = useApp();

  return (
    <motion.aside
      initial={{ x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="custom-scrollbar fixed left-0 top-14 h-[calc(100vh-56px)] w-60 overflow-y-auto bg-[#4a4f57]"
    >
      <nav className="py-2">
        {sportsList.map((sport, index) => (
          <SportItem
            key={sport.code}
            sport={sport}
            isActive={currentSport === sport.code}
            onClick={() => setCurrentSport(sport.code)}
            index={index}
          />
        ))}
      </nav>
    </motion.aside>
  );
}

function SportItem({
  sport,
  isActive,
  onClick,
  index,
}: {
  sport: { code: SportCode; name: string; matchCount: number };
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
      onClick={onClick}
      className={`flex w-full items-center justify-between border-b border-[#555a60] px-4 py-3 text-left transition-all duration-100 ${
        isActive
          ? "border-l-[3px] border-l-[#3498db] bg-[#3498db]/15 text-[#3498db]"
          : "border-l-[3px] border-l-transparent text-white hover:bg-white/[0.04]"
      }`}
    >
      <span className="text-sm font-semibold">{sport.name}</span>
      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#333333]">
        {sport.matchCount}
      </span>
    </motion.button>
  );
}
