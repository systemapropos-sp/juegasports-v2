import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Shield, User } from "lucide-react";
import Layout from "@/components/Layout";

interface UserRecord {
  id: string;
  email: string;
  username: string;
  role: "admin" | "agent" | "player";
  balance: number;
  status: "active" | "suspended" | "inactive";
  joined: string;
}

const mockUsers: UserRecord[] = [
  { id: "U-001", email: "admin@nmvdapp.com", username: "admin01", role: "admin", balance: 0, status: "active", joined: "2024-01-15" },
  { id: "U-002", email: "duepostllc@gmail.com", username: "juan01", role: "player", balance: 0, status: "active", joined: "2024-03-20" },
  { id: "U-003", email: "agent1@nmvdapp.com", username: "agent01", role: "agent", balance: 5000, status: "active", joined: "2024-02-10" },
  { id: "U-004", email: "player2@test.com", username: "player02", role: "player", balance: 250, status: "active", joined: "2024-05-01" },
  { id: "U-005", email: "player3@test.com", username: "player03", role: "player", balance: 0, status: "suspended", joined: "2024-06-15" },
  { id: "U-006", email: "agent2@nmvdapp.com", username: "agent02", role: "agent", balance: 3000, status: "active", joined: "2024-04-22" },
];

const roleColors: Record<string, string> = {
  admin: "bg-[#e74c3c] text-white",
  agent: "bg-[#f39c12] text-white",
  player: "bg-[#3498db] text-white",
};

const statusColors: Record<string, string> = {
  active: "bg-[#2ecc71]/20 text-[#2ecc71]",
  suspended: "bg-[#f39c12]/20 text-[#f39c12]",
  inactive: "bg-[#7f8c8d]/20 text-[#7f8c8d]",
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout showSidebar={true} showBetSlip={false}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-[calc(100vh-56px)] bg-[#3a3f47] p-6"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex h-9 w-9 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-[#3498db]" />
              <h1 className="text-xl font-bold text-white">User Management</h1>
            </div>
          </div>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7f8c8d]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="h-9 w-60 rounded-md border border-[#555a60] bg-[#4a4f57] pl-9 pr-3 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#3498db]"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: mockUsers.length, icon: User },
            { label: "Admins", value: mockUsers.filter((u) => u.role === "admin").length, icon: Shield },
            { label: "Agents", value: mockUsers.filter((u) => u.role === "agent").length, icon: User },
            { label: "Players", value: mockUsers.filter((u) => u.role === "player").length, icon: User },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-[#4a4f57] p-4"
            >
              <div className="mb-1 flex items-center gap-2 text-[#b0b5ba]">
                <stat.icon size={14} />
                <span className="text-xs font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded">
          <div className="grid grid-cols-[80px_1fr_120px_80px_100px_100px_90px] bg-[#2c3e50] text-[13px] font-semibold uppercase tracking-wider text-white">
            <div className="px-3 py-3">ID</div>
            <div className="px-3 py-3">Email</div>
            <div className="px-3 py-3">Username</div>
            <div className="px-3 py-3 text-center">Role</div>
            <div className="px-3 py-3 text-right">Balance</div>
            <div className="px-3 py-3 text-center">Status</div>
            <div className="px-3 py-3 text-center">Joined</div>
          </div>

          {filtered.map((user, idx) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.2 }}
              className={`grid grid-cols-[80px_1fr_120px_80px_100px_100px_90px] border-b border-[#555a60] ${
                idx % 2 === 0 ? "bg-[#3a3f47]" : "bg-[#4a4f57]"
              }`}
            >
              <div className="px-3 py-3 text-sm font-medium text-white">
                {user.id}
              </div>
              <div className="px-3 py-3 text-sm text-[#b0b5ba]">{user.email}</div>
              <div className="px-3 py-3 text-sm font-semibold text-white">
                {user.username}
              </div>
              <div className="flex items-center justify-center px-3 py-3">
                <span
                  className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase ${roleColors[user.role]}`}
                >
                  {user.role}
                </span>
              </div>
              <div className="px-3 py-3 text-right text-sm text-white">
                ${user.balance.toFixed(2)}
              </div>
              <div className="flex items-center justify-center px-3 py-3">
                <span
                  className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase ${statusColors[user.status]}`}
                >
                  {user.status}
                </span>
              </div>
              <div className="px-3 py-3 text-center text-sm text-[#b0b5ba]">
                {user.joined}
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-[#7f8c8d]">
            No users found
          </div>
        )}
      </motion.div>
    </Layout>
  );
}
