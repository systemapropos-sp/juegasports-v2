import { Routes, Route, Navigate } from "react-router";
import { AppProvider, useApp } from "./context/AppContext";
import { AllModals } from "./components/Modals";
import InstallPrompt from "./components/InstallPrompt";
import MobileBottomNav from "./components/MobileBottomNav";
import BetSlipSheet from "./components/BetSlipSheet";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SportGames from "./pages/SportGames";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useApp();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppContent() {
  const { isLoggedIn } = useApp();
  return (
    <div className="min-h-[100dvh] bg-[#3a3f47]">
      {isLoggedIn && <Navbar />}
      <AllModals />
      <InstallPrompt />
      <BetSlipSheet />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path="/sport/:sportCode"
          element={
            <AuthGuard>
              <SportGames />
            </AuthGuard>
          }
        />
        <Route
          path="/tickets"
          element={
            <AuthGuard>
              <Tickets />
            </AuthGuard>
          }
        />
      </Routes>
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
