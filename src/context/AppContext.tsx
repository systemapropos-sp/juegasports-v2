import type { ReactNode } from "react";
import { createContext, useContext, useState, useCallback } from "react";
import type { SportCode } from "@/data/mockData";
import type { Language } from "@/lib/i18n";

export interface BetSelection {
  id: string;
  sport: SportCode;
  gameId: string;
  team: string;
  type: string;
  line: string;
  odds: number;
  points?: string;
  timestamp: number;
}

interface AppState {
  user: { email: string; username: string; role: string } | null;
  balance: number;
  language: Language;
  selectedBets: BetSelection[];
  currentSport: SportCode;
  isHelpModalOpen: boolean;
  isWithdrawalNoticeOpen: boolean;
  isGenerateCodeOpen: boolean;
  isClearConfirmOpen: boolean;
  isSportsDrawerOpen: boolean;
  isBetSlipSheetOpen: boolean;
  betSlipTab: "teaser" | "teaserIF" | "regular";
  activateIf: boolean;
  betAmount: string;
}

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  setCurrentSport: (sport: SportCode) => void;
  addBet: (bet: Omit<BetSelection, "id" | "timestamp">) => void;
  removeBet: (betId: string) => void;
  clearBets: () => void;
  toggleHelpModal: () => void;
  toggleWithdrawalNotice: () => void;
  toggleGenerateCode: () => void;
  toggleClearConfirm: () => void;
  toggleSportsDrawer: () => void;
  toggleBetSlipSheet: () => void;
  setBetSlipTab: (tab: "teaser" | "teaserIF" | "regular") => void;
  setActivateIf: (v: boolean) => void;
  setBetAmount: (v: string) => void;
  setBalance: (v: number) => void;
  isBetSelected: (gameId: string, type: string, team: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState<AppState["user"]>({
    email: "duepostllc@gmail.com",
    username: "juan01",
    role: "player",
  });
  const [balance, setBalance] = useState(0.0);
  const [language, setLanguage] = useState<Language>("es");
  const [selectedBets, setSelectedBets] = useState<BetSelection[]>([]);
  const [currentSport, setCurrentSport] = useState<SportCode>("MLB");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isWithdrawalNoticeOpen, setIsWithdrawalNoticeOpen] = useState(false);
  const [isGenerateCodeOpen, setIsGenerateCodeOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [isSportsDrawerOpen, setIsSportsDrawerOpen] = useState(false);
  const [isBetSlipSheetOpen, setIsBetSlipSheetOpen] = useState(false);
  const [betSlipTab, setBetSlipTab] = useState<"teaser" | "teaserIF" | "regular">("regular");
  const [activateIf, setActivateIf] = useState(false);
  const [betAmount, setBetAmount] = useState("");

  const addBet = useCallback((bet: Omit<BetSelection, "id" | "timestamp">) => {
    setSelectedBets((prev) => {
      const exists = prev.find(
        (b) => b.gameId === bet.gameId && b.type === bet.type && b.team === bet.team
      );
      if (exists) {
        return prev.filter((b) => b.id !== exists.id);
      }
      const newBet: BetSelection = {
        ...bet,
        id: `${bet.gameId}-${bet.type}-${bet.team}-${Date.now()}`,
        timestamp: Date.now(),
      };
      return [...prev, newBet];
    });
  }, []);

  const removeBet = useCallback((betId: string) => {
    setSelectedBets((prev) => prev.filter((b) => b.id !== betId));
  }, []);

  const clearBets = useCallback(() => {
    setSelectedBets([]);
    setBetAmount("");
  }, []);

  const isBetSelected = useCallback(
    (gameId: string, type: string, team: string) => {
      return selectedBets.some(
        (b) => b.gameId === gameId && b.type === type && b.team === team
      );
    },
    [selectedBets]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        balance,
        language,
        selectedBets,
        currentSport,
        isHelpModalOpen,
        isWithdrawalNoticeOpen,
        isGenerateCodeOpen,
        isClearConfirmOpen,
        isSportsDrawerOpen,
        isBetSlipSheetOpen,
        betSlipTab,
        activateIf,
        betAmount,
        setLanguage,
        setCurrentSport,
        addBet,
        removeBet,
        clearBets,
        toggleHelpModal: () => setIsHelpModalOpen((v) => !v),
        toggleWithdrawalNotice: () => setIsWithdrawalNoticeOpen((v) => !v),
        toggleGenerateCode: () => setIsGenerateCodeOpen((v) => !v),
        toggleClearConfirm: () => setIsClearConfirmOpen((v) => !v),
        toggleSportsDrawer: () => setIsSportsDrawerOpen((v) => !v),
        toggleBetSlipSheet: () => setIsBetSlipSheetOpen((v) => !v),
        setBetSlipTab,
        setActivateIf,
        setBetAmount,
        setBalance,
        isBetSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
