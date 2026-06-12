import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, Plus, Minus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import type { SportCode, Game } from "@/data/mockData";
import { getGamesBySport } from "@/data/mockData";

interface BettingLineButtonProps {
  label: string;
  odds: number | string;
  isSelected: boolean;
  onClick: () => void;
}

function BettingLineButton({
  label,
  odds,
  isSelected,
  onClick,
}: BettingLineButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-lg px-2 py-1.5 text-center text-[11px] font-semibold transition-all active:scale-[0.97] ${
        isSelected
          ? "bg-[#e74c3c] text-white shadow-md"
          : "bg-[#4a4f57] text-white hover:bg-[#555a60]"
      }`}
    >
      <span className="opacity-80">{label}</span>
      <span className="text-[13px] font-bold">{odds}</span>
    </button>
  );
}

interface GameRowProps {
  game: Game;
  sportCode: SportCode;
}

function GameRow({ game, sportCode }: GameRowProps) {
  const {
    expandedGameId,
    setExpandedGameId,
    addBet,
    isBetSelected,
  } = useApp();
  const isExpanded = expandedGameId === game.id;
  const language = "es";

  const toggleExpand = () => {
    setExpandedGameId(isExpanded ? null : game.id);
  };

  const handleAddBet = (
    type: string,
    team: string,
    line: string,
    odds: number,
    points?: string
  ) => {
    addBet({
      sport: sportCode,
      gameId: game.id,
      team,
      type,
      line,
      odds,
      points,
    });
  };

  const odds = game.odds;

  return (
    <div className="border-b border-[#555a60]">
      {/* Game Row Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        onClick={toggleExpand}
      >
        {/* Time */}
        <span className="w-[60px] shrink-0 text-[12px] font-medium text-[#b0b5ba]">
          {game.time}
        </span>

        {/* Teams */}
        <div className="min-w-0 flex-1">
          {/* Away team */}
          <div className="flex items-center gap-1.5">
            {game.away.logo && (
              <span className="text-[10px] font-bold text-[#7f8c8d]">
                {game.away.logo}
              </span>
            )}
            <span className="truncate text-[13px] font-semibold text-white">
              {game.away.name}
            </span>
            {game.away.pitcher && (
              <span className="truncate text-[11px] text-[#7f8c8d]">
                ({game.away.pitcher})
              </span>
            )}
          </div>

          {/* VS in red */}
          <span className="px-0.5 text-[11px] font-bold text-[#e74c3c]">
            vs
          </span>

          {/* Home team */}
          <div className="flex items-center gap-1.5">
            {game.home.logo && (
              <span className="text-[10px] font-bold text-[#7f8c8d]">
                {game.home.logo}
              </span>
            )}
            <span className="truncate text-[13px] font-semibold text-white">
              {game.home.name}
            </span>
            {game.home.pitcher && (
              <span className="truncate text-[11px] text-[#7f8c8d]">
                ({game.home.pitcher})
              </span>
            )}
          </div>
        </div>

        {/* Expand button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isExpanded
              ? "bg-[#e74c3c] text-white"
              : "bg-[#4a4f57] text-[#b0b5ba] hover:bg-[#555a60]"
          }`}
        >
          {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
        </button>
      </div>

      {/* Expanded Lines */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1.5 bg-[#2c2f33] px-3 py-2">
              {/* Linea de carrera (RL) */}
              {odds.rl && odds.rl.length >= 2 && (
                <div className="flex items-center gap-2">
                  <span className="w-[90px] shrink-0 text-[11px] font-medium text-[#b0b5ba]">
                    {t(language, "lineaCarrera")}
                  </span>
                  <div className="flex flex-1 gap-2">
                    {odds.rl.map((rl, idx) => (
                      <BettingLineButton
                          key={`rl-${idx}`}
                          label={rl.line}
                          odds={rl.odds > 0 ? `+${rl.odds}` : rl.odds}
                          isSelected={isBetSelected(
                            game.id,
                            "RL",
                            idx === 0 ? game.away.name : game.home.name
                          )}
                          onClick={() =>
                            handleAddBet(
                              "RL",
                              idx === 0 ? game.away.name : game.home.name,
                              rl.line,
                              rl.odds
                            )
                          }
                        />
                    ))}
                  </div>
                </div>
              )}

              {/* ML */}
              {odds.ml && odds.ml.length >= 2 && typeof odds.ml[0] === "number" && (
                <div className="flex items-center gap-2">
                  <span className="w-[90px] shrink-0 text-[11px] font-medium text-[#b0b5ba]">
                    ML
                  </span>
                  <div className="flex flex-1 gap-2">
                    {odds.ml.map((ml, idx) => {
                      const num = ml as number;
                      return (
                        <BettingLineButton
                          key={`ml-${idx}`}
                          label=""
                          odds={num > 0 ? `+${num}` : num}
                          isSelected={isBetSelected(
                            game.id,
                            "ML",
                            idx === 0 ? game.away.name : game.home.name
                          )}
                          onClick={() =>
                            handleAddBet(
                              "ML",
                              idx === 0 ? game.away.name : game.home.name,
                              "",
                              num
                            )
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Total (OU) */}
              {odds.ou && odds.ou.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-[90px] shrink-0 text-[11px] font-medium text-[#b0b5ba]">
                    Total
                  </span>
                  <div className="flex flex-1 gap-2">
                    <BettingLineButton
                      label={`O ${odds.ou[0].line}`}
                      odds={odds.ou[0].over > 0 ? `+${odds.ou[0].over}` : odds.ou[0].over}
                      isSelected={isBetSelected(game.id, "OVER", game.away.name)}
                      onClick={() =>
                        handleAddBet(
                          "OVER",
                          game.away.name,
                          `${odds.ou![0].line}`,
                          odds.ou![0].over
                        )
                      }
                    />
                    <BettingLineButton
                      label={`${odds.ou[0].line}`}
                      odds={odds.ou[0].under > 0 ? `+${odds.ou[0].under}` : odds.ou[0].under}
                      isSelected={isBetSelected(game.id, "UNDER", game.home.name)}
                      onClick={() =>
                        handleAddBet(
                          "UNDER",
                          game.home.name,
                          `${odds.ou![0].line}`,
                          odds.ou![0].under
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {/* Super R/L (SRL) */}
              {odds.srl && odds.srl.length >= 2 && (
                <div className="flex items-center gap-2">
                  <span className="w-[90px] shrink-0 text-[11px] font-medium text-[#b0b5ba]">
                    {t(language, "superRL")}
                  </span>
                  <div className="flex flex-1 gap-2">
                    {odds.srl.map((srl, idx) => (
                      <BettingLineButton
                        key={`srl-${idx}`}
                        label={srl.line}
                        odds={srl.odds > 0 ? `+${srl.odds}` : srl.odds}
                        isSelected={isBetSelected(
                          game.id,
                          "SRL",
                          idx === 0 ? game.away.name : game.home.name
                        )}
                        onClick={() =>
                          handleAddBet(
                            "SRL",
                            idx === 0 ? game.away.name : game.home.name,
                            srl.line,
                            srl.odds
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Alt R/L (RLA) */}
              {odds.rla && odds.rla.length >= 2 && (
                <div className="flex items-center gap-2">
                  <span className="w-[90px] shrink-0 text-[11px] font-medium text-[#b0b5ba]">
                    {t(language, "altRL")}
                  </span>
                  <div className="flex flex-1 gap-2">
                    {odds.rla.map((rla, idx) => (
                      <BettingLineButton
                        key={`rla-${idx}`}
                        label={rla.line}
                        odds={rla.odds > 0 ? `+${rla.odds}` : rla.odds}
                        isSelected={isBetSelected(
                          game.id,
                          "RLA",
                          idx === 0 ? game.away.name : game.home.name
                        )}
                        onClick={() =>
                          handleAddBet(
                            "RLA",
                            idx === 0 ? game.away.name : game.home.name,
                            rla.line,
                            rla.odds
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Solo a mas (soloPos) */}
              {odds.soloPos &&
                odds.soloPos.length >= 2 &&
                typeof odds.soloPos[0] === "number" && (
                  <div className="flex items-center gap-2">
                    <span className="w-[90px] shrink-0 text-[11px] font-medium text-[#b0b5ba]">
                      {t(language, "soloMas")}
                    </span>
                    <div className="flex flex-1 gap-2">
                      <BettingLineButton
                        label={`${odds.soloPos[0]}`}
                        odds={
                          typeof odds.soloPos[1] === "number" && odds.soloPos[1] > 0
                            ? `+${odds.soloPos[1]}`
                            : odds.soloPos[1]
                        }
                        isSelected={isBetSelected(game.id, "SOLO+", game.away.name)}
                        onClick={() =>
                          handleAddBet(
                            "SOLO+",
                            game.away.name,
                            `${odds.soloPos![0]}`,
                            typeof odds.soloPos![1] === "number"
                              ? odds.soloPos![1]
                              : 0
                          )
                        }
                      />
                      <BettingLineButton
                        label={`${odds.soloPos[0]}`}
                        odds={
                          typeof odds.soloPos[1] === "number" && odds.soloPos[1] > 0
                            ? `+${odds.soloPos[1]}`
                            : odds.soloPos[1]
                        }
                        isSelected={isBetSelected(game.id, "SOLO+", game.home.name)}
                        onClick={() =>
                          handleAddBet(
                            "SOLO+",
                            game.home.name,
                            `${odds.soloPos![0]}`,
                            typeof odds.soloPos![1] === "number"
                              ? odds.soloPos![1]
                              : 0
                          )
                        }
                      />
                    </div>
                  </div>
                )}

              {/* Solo a menos (soloNeg) */}
              {odds.soloNeg &&
                odds.soloNeg.length >= 2 &&
                typeof odds.soloNeg[0] === "number" && (
                  <div className="flex items-center gap-2">
                    <span className="w-[90px] shrink-0 text-[11px] font-medium text-[#b0b5ba]">
                      {t(language, "soloMenos")}
                    </span>
                    <div className="flex flex-1 gap-2">
                      <BettingLineButton
                        label={`${odds.soloNeg[0]}`}
                        odds={
                          typeof odds.soloNeg[1] === "number" && odds.soloNeg[1] > 0
                            ? `+${odds.soloNeg[1]}`
                            : odds.soloNeg[1]
                        }
                        isSelected={isBetSelected(game.id, "SOLO-", game.away.name)}
                        onClick={() =>
                          handleAddBet(
                            "SOLO-",
                            game.away.name,
                            `${odds.soloNeg![0]}`,
                            typeof odds.soloNeg![1] === "number"
                              ? odds.soloNeg![1]
                              : 0
                          )
                        }
                      />
                      <BettingLineButton
                        label={`${odds.soloNeg[0]}`}
                        odds={
                          typeof odds.soloNeg[1] === "number" && odds.soloNeg[1] > 0
                            ? `+${odds.soloNeg[1]}`
                            : odds.soloNeg[1]
                        }
                        isSelected={isBetSelected(game.id, "SOLO-", game.home.name)}
                        onClick={() =>
                          handleAddBet(
                            "SOLO-",
                            game.home.name,
                            `${odds.soloNeg![0]}`,
                            typeof odds.soloNeg![1] === "number"
                              ? odds.soloNeg![1]
                              : 0
                          )
                        }
                      />
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SportGames() {
  const { sportCode } = useParams<{ sportCode: string }>();
  const navigate = useNavigate();
  const {
    toggleBetSlipSheet,
    betAmount,
    setBetAmount,
    selectedBets,
    language,
  } = useApp();

  const code = (sportCode || "MLB") as SportCode;
  const games = getGamesBySport(code);

  const totalPayout = selectedBets.reduce((acc) => {
    const amt = parseFloat(betAmount) || 0;
    if (amt <= 0) return 0;
    return acc + amt * 2; // Simplified
  }, 0);

  const allSports: { code: SportCode; name: string }[] = [
    { code: "MLB", name: "MLB" },
    { code: "LMB", name: "LMB" },
    { code: "NBA", name: "NBA" },
    { code: "WNBA", name: "WNBA" },
    { code: "BPS", name: "BPS" },
    { code: "Soccer", name: "NACIONES" },
    { code: "NBA-S", name: "NBA-S" },
  ];

  const currentIndex = allSports.findIndex((s) => s.code === code);
  const prevSport = currentIndex > 0 ? allSports[currentIndex - 1] : null;
  const nextSport =
    currentIndex < allSports.length - 1 ? allSports[currentIndex + 1] : null;

  return (
    <div className="min-h-[100dvh] bg-[#3a3f47] pt-12">
      {/* Top section: Cantidad, PREMIO, PREMIO SI, Activar si */}
      <div className="border-b border-[#555a60] bg-[#3a3f47] px-3 py-2">
        {/* Cantidad */}
        <div className="mb-2">
          <label className="mb-0.5 block text-[12px] font-medium text-[#b0b5ba]">
            {t(language, "cantidad")}
          </label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded border border-[#555a60] bg-white px-3 py-2 text-sm text-[#2c2f33] outline-none transition-colors placeholder:text-[#999] focus:border-[#e74c3c]"
          />
        </div>

        {/* PREMIO | PREMIO SI | Activar si */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="text-[11px] font-semibold text-[#b0b5ba]">
              {t(language, "premio")}
            </span>
            <p className="text-[14px] font-bold text-white">
              ${totalPayout.toFixed(2)}
            </p>
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-semibold text-[#b0b5ba]">
              {t(language, "premioSi")}
            </span>
            <p className="text-[14px] font-bold text-white">
              ${totalPayout.toFixed(2)}
            </p>
          </div>
          <button className="shrink-0 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#2c2f33] shadow transition-colors active:bg-gray-100">
            {t(language, "activarSi")}
          </button>
        </div>
      </div>

      {/* Sport selector: Home + Juego Completo dropdown + arrows */}
      <div className="flex items-center gap-2 border-b border-[#555a60] bg-[#3a3f47] px-3 py-2">
        <button
          onClick={() => navigate("/")}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#e74c3c] text-white"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>

        <div className="relative flex-1">
          <select
            value={code}
            onChange={(e) => navigate(`/sport/${e.target.value}`)}
            className="w-full appearance-none rounded border border-[#555a60] bg-[#4a4f57] px-3 py-2 pr-8 text-[13px] font-semibold text-white outline-none"
          >
            <option value="">{t(language, "juegoCompleto")}</option>
            {allSports.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
          <ChevronLeft
            size={14}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rotate-[-90deg] text-[#b0b5ba]"
          />
        </div>

        <button
          onClick={() => prevSport && navigate(`/sport/${prevSport.code}`)}
          disabled={!prevSport}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#555a60] bg-[#4a4f57] text-white transition-colors disabled:opacity-30 active:bg-[#555a60]"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => nextSport && navigate(`/sport/${nextSport.code}`)}
          disabled={!nextSport}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#555a60] bg-[#4a4f57] text-white transition-colors disabled:opacity-30 active:bg-[#555a60]"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Games List */}
      <div className="pb-32">
        {games.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[#7f8c8d]">No games available</p>
          </div>
        ) : (
          games.map((game) => (
            <GameRow key={game.id} game={game} sportCode={code} />
          ))
        )}
      </div>

      {/* Bottom: Tus jugadas button - above bottom nav */}
      <div className="fixed bottom-16 left-0 right-0 z-30 p-3">
        <button
          onClick={() => toggleBetSlipSheet()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2ecc71] py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all active:scale-[0.98] active:bg-[#27ae60]"
        >
          <span>{t(language, "tusJugadas")}</span>
          <ChevronUp size={18} />
          {selectedBets.length > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#2ecc71]">
              {selectedBets.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
