import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function InstallPrompt() {
  const { installPrompt, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const alreadyDismissed = localStorage.getItem('install-prompt-dismissed');
    if (alreadyDismissed) {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if ((installPrompt || isIOS) && !isInstalled && !dismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [installPrompt, isIOS, isInstalled, dismissed]);

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  const handleInstall = async () => {
    if (isIOS) {
      // iOS doesn't support native install - show instructions
      alert('Para instalar: toca el boton Compartir y selecciona "Agregar a Inicio"');
    } else {
      await promptInstall();
    }
    handleDismiss();
  };

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-3 right-3 z-[60] rounded-xl bg-[#3a3f47] p-4 shadow-2xl border border-[#555a60]"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <button onClick={handleDismiss} className="absolute right-2 top-2 text-[#7f8c8d] hover:text-white">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3498db]/20">
              <Download size={24} className="text-[#3498db]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Instala JuegaSports</p>
              <p className="text-xs text-[#b0b5ba]">Acceso rapido. Experiencia de app nativa.</p>
            </div>
            <button
              onClick={handleInstall}
              className="shrink-0 rounded-lg bg-[#3498db] px-4 py-2 text-xs font-bold uppercase text-white active:scale-95"
            >
              Instalar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
