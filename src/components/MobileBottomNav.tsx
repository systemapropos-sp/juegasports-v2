import { Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { Trophy, Ticket, Users, Settings } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';

export default function MobileBottomNav() {
  const location = useLocation();
  const { language, user, toggleSportsDrawer, toggleBetSlipSheet } = useApp();
  const isAdmin = user?.role === 'admin';

  const navItems = [
    { icon: Trophy, label: t(language, 'deportes'), action: () => toggleSportsDrawer(), active: location.pathname === '/' },
    { icon: Ticket, label: t(language, 'tickets'), link: '/tickets', active: location.pathname === '/tickets' },
    ...(isAdmin ? [{ icon: Users, label: 'Admin', link: '/admin/users', active: location.pathname === '/admin/users' }] : []),
    { icon: Settings, label: 'Slip', action: () => toggleBetSlipSheet(), active: false },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#555a60] bg-[#2b2f36]/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <button
              key={item.label}
              onClick={item.action || undefined}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 transition-colors min-h-[44px] min-w-[44px] justify-center ${
                item.active ? 'text-[#3498db]' : 'text-[#7f8c8d]'
              }`}
            >
              <Icon size={22} strokeWidth={item.active ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.active && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-px h-0.5 w-8 rounded-full bg-[#3498db]"
                />
              )}
            </button>
          );
          
          if (item.link) {
            return <Link key={item.label} to={item.link}>{content}</Link>;
          }
          return <div key={item.label}>{content}</div>;
        })}
      </div>
    </nav>
  );
}
