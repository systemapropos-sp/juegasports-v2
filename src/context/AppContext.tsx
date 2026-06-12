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

export interface SavedTicket {
  id: string;
  date: string;
  time: string;
  amount: number;
  payout: number;
  status: "pendiente" | "ganado" | "perdido";
  selections: BetSelection[];
}

interface AppState {
  user: { email: string; username: string; role: string } | null;
  balance: number;
  language: Language;
  selectedBets: BetSelection[];
  currentSport: SportCode;
  expandedGameId: string | null;
  isLoggedIn: boolean;
  isHelpModalOpen: boolean;
  isWithdrawalNoticeOpen: boolean;
  isGenerateCodeOpen: boolean;
  isClearConfirmOpen: boolean;
  isBetSlipSheetOpen: boolean;
  isUserMenuOpen: boolean;
  isLastMovementsOpen: boolean;
  isParlayCalculatorOpen: boolean;
  isTicketCreatedOpen: boolean;
  betSlipTab: "teaser" | "teaserIF" | "regular";
  betSlipViewTab: "jugar" | "ticketsAbiertos";
  activateIf: boolean;
  betAmount: string;
  savedTickets: SavedTicket[];
}

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  setCurrentSport: (sport: SportCode) => void;
  setExpandedGameId: (id: string | null) => void;
  addBet: (bet: Omit<BetSelection, "id" | "timestamp">) => void;
  removeBet: (betId: string) => void;
  clearBets: () => void;
  toggleHelpModal: () => void;
  toggleWithdrawalNotice: () => void;
  toggleGenerateCode: () => void;
  toggleClearConfirm: () => void;
  toggleBetSlipSheet: () => void;
  toggleUserMenu: () => void;
  toggleLastMovements: () => void;
  toggleParlayCalculator: () => void;
  toggleTicketCreated: () => void;
  login: (user: { email: string; username: string; role: string }) => void;
  logout: () => void;
  setBetSlipTab: (tab: "teaser" | "teaserIF" | "regular") => void;
  setBetSlipViewTab: (tab: "jugar" | "ticketsAbiertos") => void;
  setActivateIf: (v: boolean) => void;
  setBetAmount: (v: string) => void;
  setBalance: (v: number | ((prev: number) => number)) => void;
  isBetSelected: (gameId: string, type: string, team: string) => boolean;
  saveTicket: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppState["user"]>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(100.0);
  const [language, setLanguage] = useState<Language>("es");
  const [selectedBets, setSelectedBets] = useState<BetSelection[]>([]);
  const [currentSport, setCurrentSport] = useState<SportCode>("MLB");
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isWithdrawalNoticeOpen, setIsWithdrawalNoticeOpen] = useState(false);
  const [isGenerateCodeOpen, setIsGenerateCodeOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [isBetSlipSheetOpen, setIsBetSlipSheetOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLastMovementsOpen, setIsLastMovementsOpen] = useState(false);
  const [isParlayCalculatorOpen, setIsParlayCalculatorOpen] = useState(false);
  const [isTicketCreatedOpen, setIsTicketCreatedOpen] = useState(false);
  const [betSlipTab, setBetSlipTab] = useState<"teaser" | "teaserIF" | "regular">("regular");
  const [betSlipViewTab, setBetSlipViewTab] = useState<"jugar" | "ticketsAbiertos">("jugar");
  const [activateIf, setActivateIf] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const [savedTickets, setSavedTickets] = useState<SavedTicket[]>([
    {
      id: "ticket-demo-001",
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
  ]);

  const login = useCallback((userData: { email: string; username: string; role: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setSelectedBets([]);
    setBetAmount("");
    setExpandedGameId(null);
  }, []);

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

  const saveTicket = useCallback(() => {
    const amount = parseFloat(betAmount) || 0;
    if (amount <= 0 || selectedBets.length === 0) return;

    // Calculate payout
    let totalMultiplier = 1;
    for (const bet of selectedBets) {
      const odds = bet.odds;
      if (odds > 0) totalMultiplier *= odds / 100 + 1;
      else if (odds < 0) totalMultiplier *= 100 / Math.abs(odds) + 1;
    }
    const payout = amount * (totalMultiplier - 1);

    const newTicket: SavedTicket = {
      id: `ticket-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount,
      payout,
      status: "pendiente",
      selections: [...selectedBets],
    };

    setSavedTickets((prev) => [newTicket, ...prev]);
    setBalance((prev) => prev - amount);
    setSelectedBets([]);
    setBetAmount("");
    setIsTicketCreatedOpen(true);
    setIsBetSlipSheetOpen(false);
  }, [betAmount, selectedBets]);

  return (
    <AppContext.Provider
      value={{
        user,
        balance,
        language,
        selectedBets,
        currentSport,
        expandedGameId,
        isLoggedIn,
        isHelpModalOpen,
        isWithdrawalNoticeOpen,
        isGenerateCodeOpen,
        isClearConfirmOpen,
        isBetSlipSheetOpen,
        isUserMenuOpen,
        isLastMovementsOpen,
        isParlayCalculatorOpen,
        isTicketCreatedOpen,
        betSlipTab,
        betSlipViewTab,
        activateIf,
        betAmount,
        savedTickets,
        setLanguage,
        setCurrentSport,
        setExpandedGameId,
        addBet,
        removeBet,
        clearBets,
        toggleHelpModal: () => setIsHelpModalOpen((v) => !v),
        toggleWithdrawalNotice: () => setIsWithdrawalNoticeOpen((v) => !v),
        toggleGenerateCode: () => setIsGenerateCodeOpen((v) => !v),
        toggleClearConfirm: () => setIsClearConfirmOpen((v) => !v),
        toggleBetSlipSheet: () => setIsBetSlipSheetOpen((v) => !v),
        toggleUserMenu: () => setIsUserMenuOpen((v) => !v),
        toggleLastMovements: () => setIsLastMovementsOpen((v) => !v),
        toggleParlayCalculator: () => setIsParlayCalculatorOpen((v) => !v),
        toggleTicketCreated: () => setIsTicketCreatedOpen((v) => !v),
        login,
        logout,
        setBetSlipTab,
        setBetSlipViewTab,
        setActivateIf,
        setBetAmount,
        setBalance,
        isBetSelected,
        saveTicket,
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
