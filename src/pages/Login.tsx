import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "juan01" && password === "050587") {
      login({
        email: "duepostllc@gmail.com",
        username: "juan01",
        role: "player",
      });
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4">
      {/* Dark sports-themed background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-black/70" />

      {/* Subtle sports pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[380px]"
      >
        <h1 className="mb-8 text-center text-[32px] font-extrabold tracking-tight text-white">
          JuegaSports
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7f8c8d]"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded-lg border border-[#555a60] bg-[#4a4f57] py-3.5 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#e74c3c] min-h-[48px]"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7f8c8d]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-[#555a60] bg-[#4a4f57] py-3.5 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#e74c3c] min-h-[48px]"
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm text-[#e74c3c]">{error}</p>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#e74c3c] py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#c0392b] active:scale-[0.98] min-h-[48px]"
          >
            LOG IN
          </button>
        </form>
      </motion.div>

      {/* CSS for animated gradient */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
