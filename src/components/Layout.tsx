import type { ReactNode } from "react";
import Navbar from "./Navbar";
import SportsSidebar from "./SportsSidebar";
import BetSlip from "./BetSlip";
import MobileBottomNav from "./MobileBottomNav";
import SportsDrawer from "./SportsDrawer";
import BetSlipSheet from "./BetSlipSheet";
import InstallPrompt from "./InstallPrompt";
import { AllModals } from "./Modals";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showBetSlip?: boolean;
}

export default function Layout({
  children,
  showSidebar = true,
  showBetSlip = true,
}: LayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-[#2b2f36] pb-16 md:pb-0">
      <Navbar />
      <AllModals />
      <InstallPrompt />
      <SportsDrawer />
      <BetSlipSheet />

      <div className="pt-14">
        {/* Desktop sidebar - hidden on mobile */}
        {showSidebar && (
          <div className="hidden md:block">
            <SportsSidebar />
          </div>
        )}

        {/* Desktop betslip - hidden on mobile */}
        {showBetSlip && (
          <div className="hidden md:block">
            <BetSlip />
          </div>
        )}

        <main
          className={`${
            showSidebar ? "md:ml-60" : ""
          } ${
            showBetSlip ? "md:mr-[280px]" : ""
          }`}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation - hidden on desktop */}
      <MobileBottomNav />
    </div>
  );
}
