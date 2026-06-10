import type { ReactNode } from "react";
import Navbar from "./Navbar";
import SportsSidebar from "./SportsSidebar";
import BetSlip from "./BetSlip";
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
    <div className="min-h-[100dvh] bg-[#2b2f36]">
      <Navbar />
      <AllModals />

      <div className="pt-14">
        {showSidebar && <SportsSidebar />}
        {showBetSlip && <BetSlip />}

        <main
          className={`${showSidebar ? "ml-60" : ""} ${showBetSlip ? "mr-[280px]" : ""}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
