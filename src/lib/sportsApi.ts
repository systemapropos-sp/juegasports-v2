// sportsApi.ts — Live odds from The Odds API (https://the-odds-api.com/)
// Fetches ONLY today's games in ET timezone.

import type { Game, SportCode, GameOdds, Team } from "@/data/mockData";

const API_KEY = "4438da50f0c328b5a126888c41ee2ffa";
const BASE_URL = "https://api.the-odds-api.com/v4";

// Map SportCode → The Odds API sport key
const SPORT_API_KEYS: Partial<Record<SportCode, string>> = {
  MLB:      "baseball_mlb",
  NBA:      "basketball_nba",
  WNBA:     "basketball_wnba",
  NACIONES: "soccer_uefa_nations_league",
  Soccer:   "soccer_usa_mls",
};

// Returns today's date range in UTC for ET timezone (UTC-4 EDT)
function getTodayRangeET(): { from: string; to: string } {
  const now = new Date();
  const offset = 4 * 60 * 60 * 1000; // EDT = UTC-4
  const etNow = new Date(now.getTime() - offset);
  const start = new Date(etNow);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(etNow);
  end.setUTCHours(23, 59, 59, 0);
  return {
    from: new Date(start.getTime() + offset).toISOString().replace(".000Z", "Z"),
    to:   new Date(end.getTime()   + offset).toISOString().replace(".000Z", "Z"),
  };
}

// Shorten full team name: "New York Yankees" → "Yankees"
function shortName(full: string): string {
  const twoWord = ["Red Sox", "Blue Jays", "White Sox", "Real Madrid", "Man City", "Man Utd"];
  for (const tw of twoWord) {
    if (full.endsWith(tw)) return tw;
  }
  const parts = full.trim().split(" ");
  return parts[parts.length - 1] ?? full;
}

// Format ISO time to ET: "2026-06-11T23:07:00Z" → "07:07 PM"
function formatET(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
}

// Convert single API game object to our Game format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformGame(g: any, _sportCode: SportCode): Game | null {
  const bookmaker = g.bookmakers?.[0];
  if (!bookmaker) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markets: any[] = bookmaker.markets ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mlMkt  = markets.find((m: any) => m.key === "h2h");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rlMkt  = markets.find((m: any) => m.key === "spreads");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ouMkt  = markets.find((m: any) => m.key === "totals");

  const awayName = g.away_team as string;
  const homeName = g.home_team as string;
  const fmt = (n: number) => (n > 0 ? `+${n}` : String(n));

  // Moneyline ml: [awayOdds, homeOdds]
  let ml: number[] | undefined;
  if (mlMkt?.outcomes) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ao = mlMkt.outcomes.find((o: any) => o.name === awayName)?.price;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ho = mlMkt.outcomes.find((o: any) => o.name === homeName)?.price;
    if (ao != null && ho != null) ml = [ao, ho];
  }

  // Run line rl / srl (super RL -0.5) / rla (alternate RL swapped)
  let rl: GameOdds["rl"];
  let srl: GameOdds["srl"];
  let rla: GameOdds["rla"];
  if (rlMkt?.outcomes) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ao = rlMkt.outcomes.find((o: any) => o.name === awayName);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ho = rlMkt.outcomes.find((o: any) => o.name === homeName);
    if (ao && ho) {
      rl  = [{ line: fmt(ao.point), odds: ao.price }, { line: fmt(ho.point), odds: ho.price }];
      srl = [{ line: fmt(ao.point - 0.5), odds: ao.price }, { line: fmt(ho.point + 0.5), odds: ho.price }];
      rla = [{ line: fmt(ho.point), odds: ho.price }, { line: fmt(ao.point), odds: ao.price }];
    }
  }

  // Totals ou / solo (half the total line)
  let ou: GameOdds["ou"];
  let soloPos: GameOdds["soloPos"];
  let soloNeg: GameOdds["soloNeg"];
  if (ouMkt?.outcomes) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ov = ouMkt.outcomes.find((o: any) => o.name === "Over");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const un = ouMkt.outcomes.find((o: any) => o.name === "Under");
    if (ov && un) {
      ou = [{ line: ov.point, over: ov.price, under: un.price }];
      const half = Math.round(ov.point / 2 * 2) / 2;
      soloPos = [half, ov.price];
      soloNeg = [half, un.price];
    }
  }

  const odds: GameOdds = { ml, ou, rl, srl, rla, soloPos, soloNeg };

  const away: Team = {
    name: shortName(awayName),
    logo: awayName.substring(0, 3).toUpperCase(),
  };
  const home: Team = {
    name: shortName(homeName),
    logo: homeName.substring(0, 3).toUpperCase(),
  };

  return { id: g.id as string, time: formatET(g.commence_time), away, home, odds };
}

/** Fetch today's live games for a given SportCode.
 *  Returns [] if the sport has no API mapping (CPBL, LMB, BPS, NBA-S). */
export async function fetchLiveGames(sportCode: SportCode): Promise<Game[]> {
  const apiKey = SPORT_API_KEYS[sportCode];
  if (!apiKey) return [];

  const { from, to } = getTodayRangeET();

  const url = new URL(`${BASE_URL}/sports/${apiKey}/odds`);
  url.searchParams.set("apiKey", API_KEY);
  url.searchParams.set("regions", "us");
  url.searchParams.set("markets", "h2h,spreads,totals");
  url.searchParams.set("oddsFormat", "american");
  url.searchParams.set("commenceTimeFrom", from);
  url.searchParams.set("commenceTimeTo", to);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`The-Odds-API error ${res.status}`);

  const data: unknown[] = await res.json();
  return (data as object[])
    .map((g) => transformGame(g, sportCode))
    .filter((g): g is Game => g !== null);
}
