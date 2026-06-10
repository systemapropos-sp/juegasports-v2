import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4">
      {/* Animated mesh gradient background */}
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

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[400px] rounded-xl bg-[#3a3f47]/90 p-6 shadow-2xl backdrop-blur-sm md:p-8"
      >
        <h1 className="mb-6 text-center text-[28px] font-extrabold text-white md:text-[32px]">
          Sports v2
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-[13px] font-medium tracking-wide text-[#b0b5ba]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-[#555a60] bg-[#4a4f57] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#3498db] min-h-[48px]"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium tracking-wide text-[#b0b5ba]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full rounded-lg border border-[#555a60] bg-[#4a4f57] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#3498db] min-h-[48px]"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium tracking-wide text-[#b0b5ba]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#555a60] bg-[#4a4f57] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-[#7f8c8d] focus:border-[#3498db] min-h-[48px]"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#e74c3c] py-3.5 text-sm font-bold uppercase text-white transition-all hover:bg-[#c0392b] active:scale-[0.98] min-h-[48px]"
          >
            Login
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
