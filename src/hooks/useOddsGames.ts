// useOddsGames.ts — React hook for live odds data
// Uses The Odds API for MLB, NBA, WNBA, NACIONES, Soccer.
// Falls back to mockData for CPBL, LMB, BPS, NBA-S.

import { useState, useEffect } from "react";
import type { Game, SportCode } from "@/data/mockData";
import { getGamesBySport } from "@/data/mockData";
import { fetchLiveGames } from "@/lib/sportsApi";

// Sports that have live API coverage
const LIVE_SPORTS: SportCode[] = ["MLB", "NBA", "WNBA", "NACIONES", "Soccer"];

export interface OddsGamesResult {
  games: Game[];
  loading: boolean;
  error: string | null;
}

export function useOddsGames(sportCode: SportCode): OddsGamesResult {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Sports without API → use mock immediately
    if (!LIVE_SPORTS.includes(sportCode)) {
      setGames(getGamesBySport(sportCode));
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setGames([]);

    fetchLiveGames(sportCode)
      .then((data) => {
        if (!cancelled) {
          setGames(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          console.warn("Live odds fetch failed, using mock data:", err.message);
          // Fall back to mock data so the app never shows blank
          setGames(getGamesBySport(sportCode));
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sportCode]);

  return { games, loading, error };
}
