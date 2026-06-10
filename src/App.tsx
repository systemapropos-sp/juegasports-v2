import { Routes, Route } from "react-router";
import { AppProvider } from "@/context/AppContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Tickets from "@/pages/Tickets";
import AdminUsers from "@/pages/AdminUsers";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </AppProvider>
  );
}
