import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import {
  mlbGames,
  lmbGames,
  nbaGames,
  wnbaGames,
  bpsPlayers,
  nbasGames,
  soccerGames,
  periodTabs,
  sportBanners,
} from "@/data/mockData";
import type { SportCode, Game, BPSPlayer, NBASGame, Team } from "@/data/mockData";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.02 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const bannerVariants = {
  hidden: { opacity: 0, scale: 1.02 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function OddsTable() {
  const { currentSport, language } = useApp();
  const [activePeriod, setActivePeriod] = useState(0);

  const tabs = periodTabs[currentSport] || ["juegoCompleto"];

  return (
    <div className="flex-1 overflow-auto p-3 md:p-4">
      {/* Sport Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSport + "-banner"}
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="relative mb-4 h-[100px] overflow-hidden rounded-lg md:h-[120px]"
          style={{ background: sportBanners[currentSport] }}
        >
          {/* Watermark */}
          <span
            className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-white/[0.06] select-none md:text-5xl"
          >
            {currentSport}
          </span>
          {/* Label */}
          <div className="absolute bottom-0 left-0 p-3 md:p-4">
            <span className="text-sm font-bold text-white md:text-base">{currentSport}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Period Tabs - horizontally scrollable on mobile */}
      <div className="mb-3 flex overflow-x-auto hide-scrollbar">
        {tabs.map((tabKey, idx) => (
          <button
            key={tabKey}
            onClick={() => setActivePeriod(idx)}
            className={`shrink-0 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white transition-all duration-100 md:px-5 md:text-[13px] min-h-[44px] ${
              activePeriod === idx
                ? "border-t-2 border-t-white bg-[#3a3f47]"
                : "border-t-2 border-t-transparent bg-[#4a4f57] hover:bg-white/[0.04]"
            }`}
          >
            {t(language, tabKey as Parameters<typeof t>[1])}
          </button>
        ))}
      </div>

      {/* Table Content - horizontally scrollable on mobile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSport + "-" + activePeriod}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="overflow-x-auto hide-scrollbar"
        >
          {currentSport === "MLB" && <MLBTable games={mlbGames} />}
          {currentSport === "LMB" && <MLBTable games={lmbGames} />}
          {currentSport === "NBA" && <NBATable games={nbaGames} />}
          {currentSport === "WNBA" && <NBATable games={wnbaGames} />}
          {currentSport === "BPS" && <BPSTable players={bpsPlayers} />}
          {currentSport === "NBA-S" && <NBASTable games={nbasGames} />}
          {currentSport === "Soccer" && <SoccerTable games={soccerGames} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// MLB / LMB Table
function MLBTable({ games }: { games: Game[] }) {
  const { language } = useApp();

  return (
    <div className="min-w-[720px] overflow-hidden rounded md:w-full">
      {/* Header */}
      <div className="grid grid-cols-[60px_1fr_65px_85px_75px_75px_75px_75px] bg-[#2c3e50] text-[12px] font-semibold uppercase tracking-wider text-white md:text-[13px] md:grid-cols-[70px_1fr_70px_90px_80px_80px_80px_80px]">
        <div className="px-2 py-2.5">{t(language, "hora")}</div>
        <div className="px-2 py-2.5">{t(language, "equipo")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "ml")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "overUnder")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "rl")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "srl")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "soloPos")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "rla")}</div>
      </div>

      {/* Rows */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {games.map((game, gIdx) => (
          <GameRowsMLB key={game.id} game={game} gameIndex={gIdx} />
        ))}
      </motion.div>
    </div>
  );
}

function GameRowsMLB({ game, gameIndex }: { game: Game; gameIndex: number }) {
  const { addBet, isBetSelected } = useApp();

  const handleCellClick = (
    team: Team,
    type: string,
    line: string,
    odds: number | string
  ) => {
    if (typeof odds === "string" || odds === 0) return;
    addBet({
      sport: "MLB",
      gameId: game.id,
      team: team.name,
      type,
      line,
      odds: typeof odds === "number" ? odds : 0,
    });
  };

  const teams = [game.away, game.home];

  return (
    <>
      {teams.map((team, tIdx) => {
        const isAway = tIdx === 0;
        const rowBg = gameIndex % 2 === 0
          ? (tIdx === 0 ? "bg-[#3a3f47]" : "bg-[#4a4f57]")
          : (tIdx === 0 ? "bg-[#4a4f57]" : "bg-[#3a3f47]");

        return (
          <motion.div
            key={`${game.id}-${tIdx}`}
            variants={rowVariants}
            className={`grid grid-cols-[60px_1fr_65px_85px_75px_75px_75px_75px] border-b border-[#555a60] ${rowBg} md:grid-cols-[70px_1fr_70px_90px_80px_80px_80px_80px]`}
          >
            {/* Time */}
            <div className="flex items-center px-2 py-3 text-sm text-white">
              {tIdx === 0 ? game.time : ""}
            </div>

            {/* Team */}
            <div className="flex flex-col justify-center px-2 py-2.5">
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold">
                  {team.logo?.[0] || "?"}
                </span>
                {team.name}
              </span>
              {team.pitcher && (
                <span className="pl-7 text-xs text-[#b0b5ba]">
                  ({team.pitcher})
                </span>
              )}
            </div>

            {/* M.L. */}
            <OddsCell
              value={game.odds.ml?.[tIdx]}
              isSelected={isBetSelected(game.id, "M.L.", team.name)}
              onClick={() =>
                handleCellClick(team, "M.L.", `${game.odds.ml?.[tIdx]}`, game.odds.ml?.[tIdx] as number)
              }
            />

            {/* O/U */}
            <OddsCell
              value={
                game.odds.ou?.[0]
                  ? `${game.odds.ou[0].line} ${isAway ? game.odds.ou[0].over : game.odds.ou[0].under}`
                  : undefined
              }
              isSelected={isBetSelected(game.id, isAway ? "O" : "U", team.name)}
              onClick={() => {
                const ou = game.odds.ou?.[0];
                if (!ou) return;
                const odds = isAway ? ou.over : ou.under;
                handleCellClick(team, isAway ? "O" : "U", `${ou.line} ${odds}`, odds);
              }}
            />

            {/* R/L */}
            <OddsCell
              value={
                game.odds.rl?.[tIdx]
                  ? `${game.odds.rl[tIdx].line} ${game.odds.rl[tIdx].odds}`
                  : undefined
              }
              isSelected={isBetSelected(game.id, "R/L", team.name)}
              onClick={() => {
                const rl = game.odds.rl?.[tIdx];
                if (!rl) return;
                handleCellClick(team, "R/L", `${rl.line} ${rl.odds}`, rl.odds);
              }}
            />

            {/* SRL */}
            <OddsCell
              value={
                game.odds.srl?.[tIdx]
                  ? `${game.odds.srl[tIdx].line} ${game.odds.srl[tIdx].odds}`
                  : undefined
              }
              isSelected={isBetSelected(game.id, "SRL", team.name)}
              onClick={() => {
                const srl = game.odds.srl?.[tIdx];
                if (!srl) return;
                handleCellClick(team, "SRL", `${srl.line} ${srl.odds}`, srl.odds);
              }}
            />

            {/* SOLO(+) */}
            <OddsCell
              value={game.odds.soloPos?.[tIdx]}
              isSelected={isBetSelected(game.id, "SOLO(+)", team.name)}
              onClick={() => {
                const val = game.odds.soloPos?.[tIdx];
                if (typeof val === "string") return;
                handleCellClick(team, "SOLO(+)", `${val}`, val as number);
              }}
            />

            {/* RLA */}
            <OddsCell
              value={
                game.odds.rla?.[tIdx]
                  ? `${game.odds.rla[tIdx].line} ${game.odds.rla[tIdx].odds}`
                  : undefined
              }
              isSelected={isBetSelected(game.id, "RLA", team.name)}
              onClick={() => {
                const rla = game.odds.rla?.[tIdx];
                if (!rla) return;
                handleCellClick(team, "RLA", `${rla.line} ${rla.odds}`, rla.odds);
              }}
            />
          </motion.div>
        );
      })}
    </>
  );
}

// NBA / WNBA Table
function NBATable({ games }: { games: Game[] }) {
  const { language } = useApp();

  return (
    <div className="min-w-[640px] overflow-hidden rounded md:w-full">
      <div className="grid grid-cols-[60px_1fr_65px_75px_85px_75px_75px] bg-[#2c3e50] text-[12px] font-semibold uppercase tracking-wider text-white md:text-[13px] md:grid-cols-[70px_1fr_70px_80px_90px_80px_80px]">
        <div className="px-2 py-2.5">{t(language, "hora")}</div>
        <div className="px-2 py-2.5">{t(language, "equipo")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "ml")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "rl")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "overUnder")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "soloPos")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "soloNeg")}</div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {games.map((game, gIdx) => (
          <GameRowsNBA key={game.id} game={game} gameIndex={gIdx} />
        ))}
      </motion.div>
    </div>
  );
}

function GameRowsNBA({ game, gameIndex }: { game: Game; gameIndex: number }) {
  const { addBet, isBetSelected } = useApp();
  const teams = [game.away, game.home];

  const handleCellClick = (team: Team, type: string, line: string, odds: number | string) => {
    if (typeof odds === "string" || odds === 0) return;
    const sport: SportCode = game.id.startsWith("wnba") ? "WNBA" : "NBA";
    addBet({ sport, gameId: game.id, team: team.name, type, line, odds });
  };

  return (
    <>
      {teams.map((team, tIdx) => {
        const isAway = tIdx === 0;
        const rowBg = gameIndex % 2 === 0
          ? (tIdx === 0 ? "bg-[#3a3f47]" : "bg-[#4a4f57]")
          : (tIdx === 0 ? "bg-[#4a4f57]" : "bg-[#3a3f47]");

        return (
          <motion.div
            key={`${game.id}-${tIdx}`}
            variants={rowVariants}
            className={`grid grid-cols-[60px_1fr_65px_75px_85px_75px_75px] border-b border-[#555a60] ${rowBg} md:grid-cols-[70px_1fr_70px_80px_90px_80px_80px]`}
          >
            <div className="flex items-center px-2 py-3 text-sm text-white">
              {tIdx === 0 ? game.time : ""}
            </div>
            <div className="flex flex-col justify-center px-2 py-2.5">
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold">
                  {team.logo?.[0] || "?"}
                </span>
                {team.name}
              </span>
            </div>

            {/* ML */}
            <OddsCell
              value={game.odds.ml?.[tIdx]}
              isSelected={isBetSelected(game.id, "ML", team.name)}
              onClick={() => handleCellClick(team, "ML", `${game.odds.ml?.[tIdx]}`, game.odds.ml?.[tIdx] as number)}
            />

            {/* R/L */}
            <OddsCell
              value={game.odds.rl?.[tIdx] ? `${game.odds.rl[tIdx].line} ${game.odds.rl[tIdx].odds}` : undefined}
              isSelected={isBetSelected(game.id, "R/L", team.name)}
              onClick={() => {
                const rl = game.odds.rl?.[tIdx];
                if (!rl) return;
                handleCellClick(team, "R/L", `${rl.line} ${rl.odds}`, rl.odds);
              }}
            />

            {/* O/U */}
            <OddsCell
              value={game.odds.ou?.[0] ? `${game.odds.ou[0].line} ${isAway ? game.odds.ou[0].over : game.odds.ou[0].under}` : undefined}
              isSelected={isBetSelected(game.id, isAway ? "O" : "U", team.name)}
              onClick={() => {
                const ou = game.odds.ou?.[0];
                if (!ou) return;
                const odds = isAway ? ou.over : ou.under;
                handleCellClick(team, isAway ? "O" : "U", `${ou.line} ${odds}`, odds);
              }}
            />

            {/* SOLO(+) */}
            <OddsCell
              value={game.odds.soloPos?.[tIdx]}
              isSelected={isBetSelected(game.id, "SOLO(+)", team.name)}
              onClick={() => {
                const val = game.odds.soloPos?.[tIdx];
                if (typeof val === "string") return;
                handleCellClick(team, "SOLO(+)", `${val}`, val as number);
              }}
            />

            {/* SOLO(-) */}
            <OddsCell
              value={game.odds.soloNeg?.[tIdx]}
              isSelected={isBetSelected(game.id, "SOLO(-)", team.name)}
              onClick={() => {
                const val = game.odds.soloNeg?.[tIdx];
                if (typeof val === "string") return;
                handleCellClick(team, "SOLO(-)", `${val}`, val as number);
              }}
            />
          </motion.div>
        );
      })}
    </>
  );
}

// BPS Table
function BPSTable({ players }: { players: BPSPlayer[] }) {
  const { language, addBet, isBetSelected } = useApp();

  return (
    <div className="min-w-[400px] overflow-hidden rounded md:w-full">
      <div className="grid grid-cols-[60px_1fr_1fr_75px] bg-[#2c3e50] text-[12px] font-semibold uppercase tracking-wider text-white md:text-[13px] md:grid-cols-[70px_1fr_1fr_80px]">
        <div className="px-2 py-2.5">{t(language, "hora")}</div>
        <div className="px-2 py-2.5">{t(language, "equipo")}</div>
        <div className="px-2 py-2.5">Player</div>
        <div className="px-2 py-2.5 text-center">{t(language, "ml")}</div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {players.map((player, idx) => {
          const rowBg = idx % 2 === 0 ? "bg-[#3a3f47]" : "bg-[#4a4f57]";
          const isSelected = isBetSelected(player.id, "ML", player.name);

          return (
            <motion.div
              key={player.id}
              variants={rowVariants}
              className={`grid grid-cols-[60px_1fr_1fr_75px] border-b border-[#555a60] ${rowBg} md:grid-cols-[70px_1fr_1fr_80px]`}
            >
              <div className="flex items-center px-2 py-3 text-sm text-white">
                {player.time}
              </div>
              <div className="flex items-center px-2 py-3 text-sm font-semibold text-white">
                {player.team}
              </div>
              <div className="flex items-center px-2 py-3 text-sm font-semibold text-white">
                {player.name}
              </div>
              <OddsCell
                value={player.ml}
                isSelected={isSelected}
                onClick={() =>
                  addBet({
                    sport: "BPS",
                    gameId: player.id,
                    team: player.name,
                    type: "M.L.",
                    line: `${player.ml}`,
                    odds: player.ml,
                  })
                }
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// NBA-S Table
function NBASTable({ games }: { games: NBASGame[] }) {
  const { language, addBet, isBetSelected } = useApp();

  return (
    <div className="min-w-[560px] overflow-hidden rounded md:w-full">
      <div className="grid grid-cols-[60px_1fr_1fr_95px_75px_85px] bg-[#2c3e50] text-[12px] font-semibold uppercase tracking-wider text-white md:text-[13px] md:grid-cols-[70px_1fr_1fr_100px_80px_90px]">
        <div className="px-2 py-2.5">{t(language, "hora")}</div>
        <div className="px-2 py-2.5">Player</div>
        <div className="px-2 py-2.5">{t(language, "categoria")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "overUnder")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "precioMas")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "precioMenos")}</div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {games.map((game, idx) => {
          const rowBg = idx % 2 === 0 ? "bg-[#3a3f47]" : "bg-[#4a4f57]";

          return (
            <motion.div
              key={game.id}
              variants={rowVariants}
              className={`grid grid-cols-[60px_1fr_1fr_95px_75px_85px] border-b border-[#555a60] ${rowBg} md:grid-cols-[70px_1fr_1fr_100px_80px_90px]`}
            >
              <div className="flex items-center px-2 py-3 text-sm text-white">
                {game.time}
              </div>
              <div className="flex items-center px-2 py-3 text-sm font-semibold text-white">
                {game.player}
              </div>
              <div className="flex items-center px-2 py-3 text-sm text-[#b0b5ba]">
                {game.category}
              </div>

              {/* O/U */}
              <OddsCell
                value={`${game.ou.line} ${game.ou.over}`}
                isSelected={isBetSelected(game.id, "O/U", game.player)}
                onClick={() =>
                  addBet({
                    sport: "NBA-S",
                    gameId: game.id,
                    team: game.player,
                    type: "O/U",
                    line: `${game.ou.line} ${game.ou.over}`,
                    odds: game.ou.over,
                    points: `${game.ou.line}`,
                  })
                }
              />

              {/* Precio a mas */}
              <OddsCell
                value={game.precioMas}
                isSelected={isBetSelected(game.id, "Precio+", game.player)}
                onClick={() =>
                  addBet({
                    sport: "NBA-S",
                    gameId: game.id,
                    team: game.player,
                    type: "Precio+",
                    line: `${game.precioMas}`,
                    odds: game.precioMas,
                  })
                }
              />

              {/* Precio a menos */}
              <OddsCell
                value={game.precioMenos}
                isSelected={isBetSelected(game.id, "Precio-", game.player)}
                onClick={() =>
                  addBet({
                    sport: "NBA-S",
                    gameId: game.id,
                    team: game.player,
                    type: "Precio-",
                    line: `${game.precioMenos}`,
                    odds: game.precioMenos,
                  })
                }
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// Soccer Table
function SoccerTable({ games }: { games: Game[] }) {
  const { language } = useApp();

  return (
    <div className="min-w-[580px] overflow-hidden rounded md:w-full">
      <div className="grid grid-cols-[60px_1fr_75px_75px_85px_75px_75px] bg-[#2c3e50] text-[12px] font-semibold uppercase tracking-wider text-white md:text-[13px] md:grid-cols-[70px_1fr_80px_80px_90px_80px_80px]">
        <div className="px-2 py-2.5">{t(language, "hora")}</div>
        <div className="px-2 py-2.5">{t(language, "equipo")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "alML")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "empate")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "overUnder")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "soloPos")}</div>
        <div className="px-2 py-2.5 text-center">{t(language, "soloNeg")}</div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {games.map((game, gIdx) => (
          <SoccerGameRows key={game.id} game={game} gameIndex={gIdx} />
        ))}
      </motion.div>
    </div>
  );
}

function SoccerGameRows({ game, gameIndex }: { game: Game; gameIndex: number }) {
  const { addBet, isBetSelected } = useApp();
  const teams = [game.away, game.home];

  const handleCellClick = (team: Team, type: string, line: string, odds: number | string) => {
    if (typeof odds === "string" || odds === 0) return;
    addBet({ sport: "Soccer", gameId: game.id, team: team.name, type, line, odds });
  };

  return (
    <>
      {teams.map((team, tIdx) => {
        const isAway = tIdx === 0;
        const rowBg = gameIndex % 2 === 0
          ? (tIdx === 0 ? "bg-[#3a3f47]" : "bg-[#4a4f57]")
          : (tIdx === 0 ? "bg-[#4a4f57]" : "bg-[#3a3f47]");

        return (
          <motion.div
            key={`${game.id}-${tIdx}`}
            variants={rowVariants}
            className={`grid grid-cols-[60px_1fr_75px_75px_85px_75px_75px] border-b border-[#555a60] ${rowBg} md:grid-cols-[70px_1fr_80px_80px_90px_80px_80px]`}
          >
            <div className="flex items-center px-2 py-3 text-sm text-white">
              {tIdx === 0 ? game.time : ""}
            </div>
            <div className="flex flex-col justify-center px-2 py-2.5">
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold">
                  {team.flag || "?"}
                </span>
                {team.name}
              </span>
            </div>

            {/* Al ML - locked */}
            <OddsCell
              value={game.odds.ml?.[tIdx]}
              isSelected={isBetSelected(game.id, "Al ML", team.name)}
              onClick={() => {}}
            />

            {/* Empate - only show on away row */}
            <OddsCell
              value={tIdx === 0 ? game.odds.draw : undefined}
              isSelected={isBetSelected(game.id, "Empate", game.away.name)}
              onClick={() => {
                if (tIdx !== 0 || !game.odds.draw) return;
                const drawOdds = parseDrawOdds(game.odds.draw);
                addBet({
                  sport: "Soccer",
                  gameId: game.id,
                  team: "Empate",
                  type: "Empate",
                  line: game.odds.draw,
                  odds: drawOdds,
                });
              }}
            />

            {/* O/U */}
            <OddsCell
              value={game.odds.ou?.[0] ? `${game.odds.ou[0].line} ${isAway ? game.odds.ou[0].over : game.odds.ou[0].under}` : undefined}
              isSelected={isBetSelected(game.id, isAway ? "O" : "U", team.name)}
              onClick={() => {
                const ou = game.odds.ou?.[0];
                if (!ou) return;
                const odds = isAway ? ou.over : ou.under;
                handleCellClick(team, isAway ? "O" : "U", `${ou.line} ${odds}`, odds);
              }}
            />

            {/* SOLO(+) */}
            <OddsCell
              value={game.odds.soloPos?.[tIdx]}
              isSelected={isBetSelected(game.id, "SOLO(+)", team.name)}
              onClick={() => {
                const val = game.odds.soloPos?.[tIdx];
                if (!val) return;
                const odds = typeof val === "string" ? parseInt(val) : val;
                handleCellClick(team, "SOLO(+)", `${val}`, odds);
              }}
            />

            {/* SOLO(-) */}
            <OddsCell
              value={game.odds.soloNeg?.[tIdx]}
              isSelected={isBetSelected(game.id, "SOLO(-)", team.name)}
              onClick={() => {
                const val = game.odds.soloNeg?.[tIdx];
                if (!val) return;
                const odds = typeof val === "string" ? parseInt(val) : val;
                handleCellClick(team, "SOLO(-)", `${val}`, odds);
              }}
            />
          </motion.div>
        );
      })}
    </>
  );
}

// Odds Cell Component
function OddsCell({
  value,
  isSelected,
  onClick,
}: {
  value: string | number | undefined;
  isSelected: boolean;
  onClick: () => void;
}) {
  if (value === undefined || value === "") {
    return <div className="flex items-center justify-center px-1 py-3" />;
  }

  if (value === "locked" || value === "Locked") {
    return (
      <div className="flex items-center justify-center px-1 py-3">
        <Lock size={14} className="text-[#7f8c8d]" />
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-1 py-3 text-sm transition-all duration-100 min-h-[44px] ${
        isSelected
          ? "animate-pulse-red bg-[#e74c3c] font-bold text-white"
          : "bg-transparent font-semibold text-white hover:bg-[#3498db]/12"
      }`}
    >
      {value}
    </button>
  );
}

function parseDrawOdds(drawStr: string): number {
  // e.g. "+0.5 -130" -> extract -130
  const parts = drawStr.split(" ");
  const oddsPart = parts.find((p) => p.startsWith("+") || p.startsWith("-"));
  return oddsPart ? parseInt(oddsPart) : 0;
}
