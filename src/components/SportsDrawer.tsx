import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { sportsList } from '@/data/mockData';
import type { SportCode } from '@/data/mockData';

export default function SportsDrawer() {
  const { isSportsDrawerOpen, toggleSportsDrawer, currentSport, setCurrentSport } = useApp();

  const handleSelect = (code: SportCode) => {
    setCurrentSport(code);
    toggleSportsDrawer();
  };

  return (
    <AnimatePresence>
      {isSportsDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-black/60 md:hidden"
            onClick={toggleSportsDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-[56] h-full w-[280px] bg-[#4a4f57] shadow-2xl md:hidden"
            style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#555a60] px-4 py-3">
              <span className="text-lg font-extrabold text-white">
                Sports v2
                <span className="ml-1 inline-block h-0.5 w-6 bg-[#3498db] align-middle" />
              </span>
              <button
                onClick={toggleSportsDrawer}
                className="flex h-9 w-9 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sports List */}
            <nav className="py-2">
              {sportsList.map((sport, index) => (
                <motion.button
                  key={sport.code}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                  onClick={() => handleSelect(sport.code)}
                  className={`flex w-full items-center justify-between border-b border-[#555a60] px-4 py-3.5 text-left transition-all duration-100 min-h-[48px] ${
                    currentSport === sport.code
                      ? 'border-l-[3px] border-l-[#3498db] bg-[#3498db]/15 text-[#3498db]'
                      : 'border-l-[3px] border-l-transparent text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="text-sm font-semibold">{sport.name}</span>
                  <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#333333]">
                    {sport.matchCount}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
