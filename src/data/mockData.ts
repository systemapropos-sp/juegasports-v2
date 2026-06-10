export type SportCode = "MLB" | "CPBL" | "LMB" | "NBA" | "WNBA" | "BPS" | "NBA-S" | "NACIONES" | "Soccer";

export interface Team {
  name: string;
  pitcher?: string;
  logo?: string;
  flag?: string;
}

export interface OddsCell {
  line?: string | number;
  odds?: number;
  locked?: boolean;
}

export interface GameOdds {
  ml?: (number | string)[];
  ou?: { line: number; over: number; under: number }[];
  rl?: { line: string; odds: number }[];
  srl?: { line: string; odds: number }[];
  soloPos?: (string | number)[];
  soloNeg?: (string | number)[];
  rla?: { line: string; odds: number }[];
  draw?: string;
  soloPosVal?: (number | string)[];
  soloNegVal?: (number | string)[];
}

export interface Game {
  id: string;
  time: string;
  away: Team;
  home: Team;
  odds: GameOdds;
}

export interface BPSPlayer {
  id: string;
  time: string;
  name: string;
  team: string;
  ml: number;
}

export interface NBASGame {
  id: string;
  time: string;
  player: string;
  team: string;
  category: string;
  ou: { line: number; over: number; under: number };
  precioMas: number;
  precioMenos: number;
}

export interface SportInfo {
  code: SportCode;
  name: string;
  matchCount: number;
}

export const sportsList: SportInfo[] = [
  { code: "MLB", name: "Major League Baseball", matchCount: 13 },
  { code: "CPBL", name: "Chinese Professional Baseball League", matchCount: 4 },
  { code: "LMB", name: "Liga Mexicana de Beisbol", matchCount: 10 },
  { code: "NBA", name: "National Basketball Association", matchCount: 1 },
  { code: "WNBA", name: "Women's National Basketball Association", matchCount: 2 },
  { code: "BPS", name: "Baseball Players", matchCount: 8 },
  { code: "NBA-S", name: "NBA Solo", matchCount: 29 },
  { code: "NACIONES", name: "UEFA Nations League", matchCount: 4 },
];

// MLB Games (13)
export const mlbGames: Game[] = [
  {
    id: "mlb-1",
    time: "03:45 PM",
    away: { name: "Nationals", pitcher: "F. Griffin", logo: "WSH" },
    home: { name: "Giants", pitcher: "R. Ray", logo: "SF" },
    odds: {
      ml: [-110, -110],
      ou: [{ line: 8.5, over: -110, under: -110 }],
      rl: [{ line: "+1.5", odds: -230 }, { line: "-1.5", odds: +185 }],
      srl: [{ line: "+2.5", odds: -400 }, { line: "-2.5", odds: +280 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +150 }, { line: "+1.5", odds: -220 }],
    },
  },
  {
    id: "mlb-2",
    time: "04:10 PM",
    away: { name: "Reds", pitcher: "B. Singer", logo: "CIN" },
    home: { name: "Padres", pitcher: "M. King", logo: "SD" },
    odds: {
      ml: [+140, -160],
      ou: [{ line: 8.5, over: -105, under: -115 }],
      rl: [{ line: "+1.5", odds: -150 }, { line: "-1.5", odds: +130 }],
      srl: [{ line: "+2.5", odds: -320 }, { line: "-2.5", odds: +200 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +170 }, { line: "+1.5", odds: -210 }],
    },
  },
  {
    id: "mlb-3",
    time: "04:10 PM",
    away: { name: "Mets", pitcher: "K. Bradish", logo: "NYM" },
    home: { name: "Phillies", pitcher: "Z. Wheeler", logo: "PHI" },
    odds: {
      ml: [+155, -180],
      ou: [{ line: 7.5, over: -110, under: -110 }],
      rl: [{ line: "+1.5", odds: -140 }, { line: "-1.5", odds: +120 }],
      srl: [{ line: "+2.5", odds: -280 }, { line: "-2.5", odds: +180 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +200 }, { line: "+1.5", odds: -250 }],
    },
  },
  {
    id: "mlb-4",
    time: "05:05 PM",
    away: { name: "Mariners", pitcher: "L. Castillo", logo: "SEA" },
    home: { name: "Rangers", pitcher: "J. Gray", logo: "TEX" },
    odds: {
      ml: [-125, +105],
      ou: [{ line: 8.0, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +140 }, { line: "+1.5", odds: -160 }],
      srl: [{ line: "-2.5", odds: +260 }, { line: "+2.5", odds: -340 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +130 }, { line: "+1.5", odds: -155 }],
    },
  },
  {
    id: "mlb-5",
    time: "06:40 PM",
    away: { name: "Orioles", pitcher: "C. Burnes", logo: "BAL" },
    home: { name: "Blue Jays", pitcher: "K. Gausman", logo: "TOR" },
    odds: {
      ml: [-130, +110],
      ou: [{ line: 8.5, over: -105, under: -115 }],
      rl: [{ line: "-1.5", odds: +135 }, { line: "+1.5", odds: -155 }],
      srl: [{ line: "-2.5", odds: +240 }, { line: "+2.5", odds: -300 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +125 }, { line: "+1.5", odds: -145 }],
    },
  },
  {
    id: "mlb-6",
    time: "07:05 PM",
    away: { name: "Yankees", pitcher: "G. Cole", logo: "NYY" },
    home: { name: "Red Sox", pitcher: "B. Bello", logo: "BOS" },
    odds: {
      ml: [-145, +120],
      ou: [{ line: 9.0, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +115 }, { line: "+1.5", odds: -135 }],
      srl: [{ line: "-2.5", odds: +200 }, { line: "+2.5", odds: -260 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +110 }, { line: "+1.5", odds: -130 }],
    },
  },
  {
    id: "mlb-7",
    time: "07:10 PM",
    away: { name: "Dodgers", pitcher: "T. Glasnow", logo: "LAD" },
    home: { name: "Diamondbacks", pitcher: "M. Kelly", logo: "ARI" },
    odds: {
      ml: [-155, +130],
      ou: [{ line: 8.5, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +110 }, { line: "+1.5", odds: -130 }],
      srl: [{ line: "-2.5", odds: +180 }, { line: "+2.5", odds: -240 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +105 }, { line: "+1.5", odds: -125 }],
    },
  },
  {
    id: "mlb-8",
    time: "07:20 PM",
    away: { name: "Braves", pitcher: "C. Sale", logo: "ATL" },
    home: { name: "Cubs", pitcher: "S. Imanaga", logo: "CHC" },
    odds: {
      ml: [-120, +100],
      ou: [{ line: 7.0, over: -115, under: -105 }],
      rl: [{ line: "-1.5", odds: +155 }, { line: "+1.5", odds: -180 }],
      srl: [{ line: "-2.5", odds: +240 }, { line: "+2.5", odds: -300 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +140 }, { line: "+1.5", odds: -165 }],
    },
  },
  {
    id: "mlb-9",
    time: "08:05 PM",
    away: { name: "Cardinals", pitcher: "M. Mikolas", logo: "STL" },
    home: { name: "Brewers", pitcher: "F. Peralta", logo: "MIL" },
    odds: {
      ml: [+125, -150],
      ou: [{ line: 8.5, over: -110, under: -110 }],
      rl: [{ line: "+1.5", odds: -170 }, { line: "-1.5", odds: +145 }],
      srl: [{ line: "+2.5", odds: -340 }, { line: "-2.5", odds: +260 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +185 }, { line: "+1.5", odds: -225 }],
    },
  },
  {
    id: "mlb-10",
    time: "08:10 PM",
    away: { name: "Astros", pitcher: "F. Valdez", logo: "HOU" },
    home: { name: "Angels", pitcher: "T. Anderson", logo: "LAA" },
    odds: {
      ml: [-135, +115],
      ou: [{ line: 8.5, over: -105, under: -115 }],
      rl: [{ line: "-1.5", odds: +125 }, { line: "+1.5", odds: -145 }],
      srl: [{ line: "-2.5", odds: +210 }, { line: "+2.5", odds: -270 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +115 }, { line: "+1.5", odds: -135 }],
    },
  },
  {
    id: "mlb-11",
    time: "08:10 PM",
    away: { name: "Rays", pitcher: "Z. Littell", logo: "TB" },
    home: { name: "Twins", pitcher: "P. Lopez", logo: "MIN" },
    odds: {
      ml: [+110, -130],
      ou: [{ line: 8.0, over: -110, under: -110 }],
      rl: [{ line: "+1.5", odds: -185 }, { line: "-1.5", odds: +155 }],
      srl: [{ line: "+2.5", odds: -360 }, { line: "-2.5", odds: +280 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +195 }, { line: "+1.5", odds: -240 }],
    },
  },
  {
    id: "mlb-12",
    time: "09:40 PM",
    away: { name: "White Sox", pitcher: "C. Flexen", logo: "CWS" },
    home: { name: "Athletics", pitcher: "JP. Sears", logo: "OAK" },
    odds: {
      ml: [+130, -155],
      ou: [{ line: 8.5, over: -110, under: -110 }],
      rl: [{ line: "+1.5", odds: -160 }, { line: "-1.5", odds: +135 }],
      srl: [{ line: "+2.5", odds: -310 }, { line: "-2.5", odds: +240 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +175 }, { line: "+1.5", odds: -215 }],
    },
  },
  {
    id: "mlb-13",
    time: "10:10 PM",
    away: { name: "Guardians", pitcher: "T. Bibee", logo: "CLE" },
    home: { name: "Royals", pitcher: "S. Lugo", logo: "KC" },
    odds: {
      ml: [-115, -105],
      ou: [{ line: 8.0, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +150 }, { line: "+1.5", odds: -175 }],
      srl: [{ line: "-2.5", odds: +230 }, { line: "+2.5", odds: -290 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +135 }, { line: "+1.5", odds: -160 }],
    },
  },
];

// CPBL Games (4)
export const cpblGames: Game[] = [
  {
    id: "cpbl-1",
    time: "06:35 AM",
    away: { name: "Rakuten Monkeys", pitcher: "C. Wang", logo: "RAK" },
    home: { name: "Uni-Lions", pitcher: "L. Chen", logo: "UL" },
    odds: {
      ml: [-120, +100],
      ou: [{ line: 10.5, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +140 }, { line: "+1.5", odds: -160 }],
      srl: [{ line: "-2.5", odds: +200 }, { line: "+2.5", odds: -260 }],
      soloPos: [5.5, -130],
      soloNeg: [5.5, -130],
      rla: [{ line: "-1.5", odds: +130 }, { line: "+1.5", odds: -155 }],
    },
  },
  {
    id: "cpbl-2",
    time: "06:35 AM",
    away: { name: "Fubon Guardians", pitcher: "H. Yang", logo: "FBG" },
    home: { name: "Wei Chuan Dragons", pitcher: "E. Paredes", logo: "WCD" },
    odds: {
      ml: [+110, -130],
      ou: [{ line: 9.5, over: -110, under: -110 }],
      rl: [{ line: "+1.5", odds: -175 }, { line: "-1.5", odds: +150 }],
      srl: [{ line: "+2.5", odds: -340 }, { line: "-2.5", odds: +260 }],
      soloPos: [5.5, -130],
      soloNeg: [5.5, -130],
      rla: [{ line: "-1.5", odds: +160 }, { line: "+1.5", odds: -190 }],
    },
  },
  {
    id: "cpbl-3",
    time: "06:35 AM",
    away: { name: "TSG Hawks", pitcher: "B. Woodall", logo: "TSG" },
    home: { name: "CTBC Brothers", pitcher: "J. Houbrick", logo: "CTBC" },
    odds: {
      ml: [+150, -175],
      ou: [{ line: 10.0, over: -105, under: -115 }],
      rl: [{ line: "+1.5", odds: -140 }, { line: "-1.5", odds: +120 }],
      srl: [{ line: "+2.5", odds: -300 }, { line: "-2.5", odds: +220 }],
      soloPos: [5.5, -130],
      soloNeg: [5.5, -130],
      rla: [{ line: "-1.5", odds: +180 }, { line: "+1.5", odds: -220 }],
    },
  },
  {
    id: "cpbl-4",
    time: "06:35 AM",
    away: { name: "Wei Chuan Dragons", pitcher: "T. Brock", logo: "WCD" },
    home: { name: "Rakuten Monkeys", pitcher: "A. Carducci", logo: "RAK" },
    odds: {
      ml: [-110, -110],
      ou: [{ line: 9.5, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +150 }, { line: "+1.5", odds: -175 }],
      srl: [{ line: "-2.5", odds: +210 }, { line: "+2.5", odds: -270 }],
      soloPos: [5.5, -130],
      soloNeg: [5.5, -130],
      rla: [{ line: "-1.5", odds: +140 }, { line: "+1.5", odds: -165 }],
    },
  },
];

// LMB Games (10)
export const lmbGames: Game[] = [
  {
    id: "lmb-1",
    time: "05:00 PM",
    away: { name: "Toros de Tijuana", pitcher: "A. Reyes", logo: "TIJ" },
    home: { name: "Sultanes de Monterrey", pitcher: "L. Verdugo", logo: "MTY" },
    odds: {
      ml: [-120, +100],
      ou: [{ line: 9.5, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +140 }, { line: "+1.5", odds: -160 }],
      srl: [{ line: "-2.5", odds: +220 }, { line: "+2.5", odds: -280 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +130 }, { line: "+1.5", odds: -155 }],
    },
  },
  {
    id: "lmb-2",
    time: "05:30 PM",
    away: { name: "Leones de Yucatan", pitcher: "M. Alvarez", logo: "YUC" },
    home: { name: "Tigres de Quintana Roo", pitcher: "R. Hernandez", logo: "QR" },
    odds: {
      ml: [-110, -110],
      ou: [{ line: 10.0, over: -105, under: -115 }],
      rl: [{ line: "-1.5", odds: +155 }, { line: "+1.5", odds: -180 }],
      srl: [{ line: "-2.5", odds: +260 }, { line: "+2.5", odds: -340 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +145 }, { line: "+1.5", odds: -170 }],
    },
  },
  {
    id: "lmb-3",
    time: "06:00 PM",
    away: { name: "Diablos Rojos", pitcher: "J. Pena", logo: "MEX" },
    home: { name: "Pericos de Puebla", pitcher: "W. Paredes", logo: "PUE" },
    odds: {
      ml: [-140, +115],
      ou: [{ line: 9.0, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +120 }, { line: "+1.5", odds: -140 }],
      srl: [{ line: "-2.5", odds: +200 }, { line: "+2.5", odds: -250 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +110 }, { line: "+1.5", odds: -130 }],
    },
  },
  {
    id: "lmb-4",
    time: "06:30 PM",
    away: { name: "Acereros de Monclova", pitcher: "D. Eveland", logo: "MON" },
    home: { name: "Saraperos de Saltillo", pitcher: "O. Garcia", logo: "SAL" },
    odds: {
      ml: [-125, +105],
      ou: [{ line: 9.5, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +135 }, { line: "+1.5", odds: -155 }],
      srl: [{ line: "-2.5", odds: +220 }, { line: "+2.5", odds: -270 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +125 }, { line: "+1.5", odds: -150 }],
    },
  },
  {
    id: "lmb-5",
    time: "07:00 PM",
    away: { name: "Bravos de Leon", pitcher: "G. Sanmiguel", logo: "LEO" },
    home: { name: "Rieleros de Aguascalientes", pitcher: "R. Bustamante", logo: "AGS" },
    odds: {
      ml: [+120, -145],
      ou: [{ line: 10.5, over: -105, under: -115 }],
      rl: [{ line: "+1.5", odds: -165 }, { line: "-1.5", odds: +140 }],
      srl: [{ line: "+2.5", odds: -330 }, { line: "-2.5", odds: +250 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +180 }, { line: "+1.5", odds: -220 }],
    },
  },
  {
    id: "lmb-6",
    time: "07:30 PM",
    away: { name: "Generales de Durango", pitcher: "M. Ramirez", logo: "DGO" },
    home: { name: "Algodoneros de Torreon", pitcher: "A. Tovalin", logo: "TOR" },
    odds: {
      ml: [+140, -165],
      ou: [{ line: 9.5, over: -110, under: -110 }],
      rl: [{ line: "+1.5", odds: -150 }, { line: "-1.5", odds: +125 }],
      srl: [{ line: "+2.5", odds: -300 }, { line: "-2.5", odds: +230 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +195 }, { line: "+1.5", odds: -240 }],
    },
  },
  {
    id: "lmb-7",
    time: "08:00 PM",
    away: { name: "Mariachis de Guadalajara", pitcher: "J. Lopez", logo: "GDL" },
    home: { name: "Charros de Jalisco", pitcher: "M. Carrillo", logo: "JAL" },
    odds: {
      ml: [-115, -105],
      ou: [{ line: 9.0, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +150 }, { line: "+1.5", odds: -175 }],
      srl: [{ line: "-2.5", odds: +240 }, { line: "+2.5", odds: -300 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +135 }, { line: "+1.5", odds: -160 }],
    },
  },
  {
    id: "lmb-8",
    time: "08:30 PM",
    away: { name: "Olmecas de Tabasco", pitcher: "C. Morales", logo: "TAB" },
    home: { name: "Piratas de Campeche", pitcher: "L. Cruz", logo: "CAM" },
    odds: {
      ml: [+110, -130],
      ou: [{ line: 9.5, over: -105, under: -115 }],
      rl: [{ line: "+1.5", odds: -170 }, { line: "-1.5", odds: +145 }],
      srl: [{ line: "+2.5", odds: -340 }, { line: "-2.5", odds: +260 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +185 }, { line: "+1.5", odds: -225 }],
    },
  },
  {
    id: "lmb-9",
    time: "09:00 PM",
    away: { name: "El Aguila de Veracruz", pitcher: "D. Gutierrez", logo: "VER" },
    home: { name: "Delfines de Ciudad del Carmen", pitcher: "E. Gonzalez", logo: "CDC" },
    odds: {
      ml: [-130, +110],
      ou: [{ line: 9.0, over: -110, under: -110 }],
      rl: [{ line: "-1.5", odds: +125 }, { line: "+1.5", odds: -145 }],
      srl: [{ line: "-2.5", odds: +210 }, { line: "+2.5", odds: -265 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +115 }, { line: "+1.5", odds: -135 }],
    },
  },
  {
    id: "lmb-10",
    time: "09:30 PM",
    away: { name: "Caliente de Durango", pitcher: "J. Vargas", logo: "CDGO" },
    home: { name: "Tomateros de Culiacan", pitcher: "M. Flores", logo: "CUL" },
    odds: {
      ml: [+125, -150],
      ou: [{ line: 9.5, over: -110, under: -110 }],
      rl: [{ line: "+1.5", odds: -160 }, { line: "-1.5", odds: +135 }],
      srl: [{ line: "+2.5", odds: -320 }, { line: "-2.5", odds: +245 }],
      soloPos: [4.5, -130],
      soloNeg: [4.5, -130],
      rla: [{ line: "-1.5", odds: +175 }, { line: "+1.5", odds: -210 }],
    },
  },
];

// NBA Games (1)
export const nbaGames: Game[] = [
  {
    id: "nba-1",
    time: "08:30 PM",
    away: { name: "San Antonio Spurs", logo: "SAS" },
    home: { name: "New York Knicks", logo: "NYK" },
    odds: {
      ml: [+115, -135],
      rl: [{ line: "+2.0", odds: -110 }, { line: "-2.0", odds: -110 }],
      ou: [{ line: 216.5, over: -110, under: -110 }],
      soloPos: [107.5, -120],
      soloNeg: [107.5, -120],
    },
  },
];

// WNBA Games (2)
export const wnbaGames: Game[] = [
  {
    id: "wnba-1",
    time: "07:00 PM",
    away: { name: "Las Vegas Aces", logo: "LVA" },
    home: { name: "New York Liberty", logo: "NYL" },
    odds: {
      ml: [-105, -115],
      rl: [{ line: "+1.0", odds: -110 }, { line: "-1.0", odds: -110 }],
      ou: [{ line: 169.5, over: -110, under: -110 }],
      soloPos: [82.5, -135],
      soloNeg: [82.5, -135],
    },
  },
  {
    id: "wnba-2",
    time: "09:00 PM",
    away: { name: "Phoenix Mercury", logo: "PHO" },
    home: { name: "Seattle Storm", logo: "SEA" },
    odds: {
      ml: [+140, -165],
      rl: [{ line: "+3.5", odds: -110 }, { line: "-3.5", odds: -110 }],
      ou: [{ line: 162.0, over: -105, under: -115 }],
      soloPos: [78.5, -125],
      soloNeg: [78.5, -125],
    },
  },
];

// BPS Players (8)
export const bpsPlayers: BPSPlayer[] = [
  { id: "bps-1", time: "07:05 PM", name: "Aaron Judge", team: "NYY", ml: -140 },
  { id: "bps-2", time: "07:05 PM", name: "Juan Soto", team: "NYY", ml: +115 },
  { id: "bps-3", time: "07:10 PM", name: "Shohei Ohtani", team: "LAD", ml: -160 },
  { id: "bps-4", time: "07:10 PM", name: "Mookie Betts", team: "LAD", ml: +125 },
  { id: "bps-5", time: "08:10 PM", name: "Yordan Alvarez", team: "HOU", ml: -130 },
  { id: "bps-6", time: "08:10 PM", name: "Mike Trout", team: "LAA", ml: +110 },
  { id: "bps-7", time: "04:10 PM", name: "Manny Machado", team: "SD", ml: -145 },
  { id: "bps-8", time: "04:10 PM", name: "Fernando Tatis Jr.", team: "SD", ml: +120 },
];

// NBA-S Games (29)
export const nbasGames: NBASGame[] = [
  { id: "nbas-1", time: "07:00 PM", player: "J. Tatum", team: "BOS", category: "Puntos", ou: { line: 28.5, over: -110, under: -110 }, precioMas: -125, precioMenos: -105 },
  { id: "nbas-2", time: "07:00 PM", player: "J. Brown", team: "BOS", category: "Puntos", ou: { line: 24.5, over: -110, under: -110 }, precioMas: -115, precioMenos: -105 },
  { id: "nbas-3", time: "07:00 PM", player: "J. Tatum", team: "BOS", category: "Rebotes", ou: { line: 8.5, over: -110, under: -110 }, precioMas: -120, precioMenos: -110 },
  { id: "nbas-4", time: "07:00 PM", player: "J. Holiday", team: "BOS", category: "Asistencia", ou: { line: 5.5, over: -110, under: -110 }, precioMas: -130, precioMenos: +100 },
  { id: "nbas-5", time: "07:30 PM", player: "L. Doncic", team: "DAL", category: "Puntos", ou: { line: 32.5, over: -110, under: -110 }, precioMas: -135, precioMenos: -105 },
  { id: "nbas-6", time: "07:30 PM", player: "K. Irving", team: "DAL", category: "Puntos", ou: { line: 26.5, over: -110, under: -110 }, precioMas: -120, precioMenos: -110 },
  { id: "nbas-7", time: "07:30 PM", player: "L. Doncic", team: "DAL", category: "Asistencia", ou: { line: 9.5, over: -110, under: -110 }, precioMas: -140, precioMenos: -105 },
  { id: "nbas-8", time: "07:30 PM", player: "K. Irving", team: "DAL", category: "Rebotes", ou: { line: 4.5, over: -110, under: -110 }, precioMas: -115, precioMenos: -105 },
  { id: "nbas-9", time: "08:00 PM", player: "G. Antetokounmpo", team: "MIL", category: "Puntos", ou: { line: 30.5, over: -110, under: -110 }, precioMas: -130, precioMenos: -105 },
  { id: "nbas-10", time: "08:00 PM", player: "D. Lillard", team: "MIL", category: "Puntos", ou: { line: 25.5, over: -110, under: -110 }, precioMas: -115, precioMenos: -105 },
  { id: "nbas-11", time: "08:00 PM", player: "G. Antetokounmpo", team: "MIL", category: "Rebotes", ou: { line: 11.5, over: -110, under: -110 }, precioMas: -125, precioMenos: -105 },
  { id: "nbas-12", time: "08:00 PM", player: "D. Lillard", team: "MIL", category: "Asistencia", ou: { line: 6.5, over: -110, under: -110 }, precioMas: -120, precioMenos: -110 },
  { id: "nbas-13", time: "08:30 PM", player: "S. Curry", team: "GSW", category: "Puntos", ou: { line: 27.5, over: -110, under: -110 }, precioMas: -125, precioMenos: -105 },
  { id: "nbas-14", time: "08:30 PM", player: "K. Thompson", team: "GSW", category: "Puntos", ou: { line: 20.5, over: -110, under: -110 }, precioMas: -115, precioMenos: -105 },
  { id: "nbas-15", time: "08:30 PM", player: "S. Curry", team: "GSW", category: "Asistencia", ou: { line: 5.5, over: -110, under: -110 }, precioMas: -130, precioMenos: -100 },
  { id: "nbas-16", time: "08:30 PM", player: "D. Green", team: "GSW", category: "Rebotes", ou: { line: 7.5, over: -110, under: -110 }, precioMas: -120, precioMenos: -110 },
  { id: "nbas-17", time: "09:00 PM", player: "N. Jokic", team: "DEN", category: "Puntos", ou: { line: 26.5, over: -110, under: -110 }, precioMas: -120, precioMenos: -110 },
  { id: "nbas-18", time: "09:00 PM", player: "J. Murray", team: "DEN", category: "Puntos", ou: { line: 21.5, over: -110, under: -110 }, precioMas: -115, precioMenos: -105 },
  { id: "nbas-19", time: "09:00 PM", player: "N. Jokic", team: "DEN", category: "Rebotes", ou: { line: 12.5, over: -110, under: -110 }, precioMas: -135, precioMenos: -105 },
  { id: "nbas-20", time: "09:00 PM", player: "N. Jokic", team: "DEN", category: "Asistencia", ou: { line: 8.5, over: -110, under: -110 }, precioMas: -125, precioMenos: -105 },
  { id: "nbas-21", time: "10:00 PM", player: "K. Durant", team: "PHX", category: "Puntos", ou: { line: 29.5, over: -110, under: -110 }, precioMas: -130, precioMenos: -105 },
  { id: "nbas-22", time: "10:00 PM", player: "D. Booker", team: "PHX", category: "Puntos", ou: { line: 27.5, over: -110, under: -110 }, precioMas: -125, precioMenos: -105 },
  { id: "nbas-23", time: "10:00 PM", player: "K. Durant", team: "PHX", category: "Rebotes", ou: { line: 6.5, over: -110, under: -110 }, precioMas: -120, precioMenos: -110 },
  { id: "nbas-24", time: "10:00 PM", player: "D. Booker", team: "PHX", category: "Asistencia", ou: { line: 6.5, over: -110, under: -110 }, precioMas: -120, precioMenos: -110 },
  { id: "nbas-25", time: "10:30 PM", player: "L. James", team: "LAL", category: "Puntos", ou: { line: 25.5, over: -110, under: -110 }, precioMas: -120, precioMenos: -110 },
  { id: "nbas-26", time: "10:30 PM", player: "A. Davis", team: "LAL", category: "Puntos", ou: { line: 24.5, over: -110, under: -110 }, precioMas: -115, precioMenos: -105 },
  { id: "nbas-27", time: "10:30 PM", player: "L. James", team: "LAL", category: "Asistencia", ou: { line: 7.5, over: -110, under: -110 }, precioMas: -125, precioMenos: -105 },
  { id: "nbas-28", time: "10:30 PM", player: "A. Davis", team: "LAL", category: "Rebotes", ou: { line: 11.5, over: -110, under: -110 }, precioMas: -130, precioMenos: -105 },
  { id: "nbas-29", time: "07:00 PM", player: "J. Embiid", team: "PHI", category: "Puntos", ou: { line: 31.5, over: -110, under: -110 }, precioMas: -135, precioMenos: -105 },
];

// NACIONES (UEFA Nations League) Games (4)
export const nacionesGames: Game[] = [
  {
    id: "nac-1",
    time: "02:45 PM",
    away: { name: "Spain", flag: "ES" },
    home: { name: "Germany", flag: "DE" },
    odds: {
      ml: [+125, -150],
      ou: [{ line: 2.5, over: -105, under: -115 }],
      rl: [{ line: "+0.5", odds: -175 }, { line: "-0.5", odds: +145 }],
      draw: "+0.5 -130",
    },
  },
  {
    id: "nac-2",
    time: "02:45 PM",
    away: { name: "France", flag: "FR" },
    home: { name: "Italy", flag: "IT" },
    odds: {
      ml: [-130, +110],
      ou: [{ line: 2.5, over: -110, under: -110 }],
      rl: [{ line: "-0.5", odds: +140 }, { line: "+0.5", odds: -160 }],
      draw: "+0.5 -130",
    },
  },
  {
    id: "nac-3",
    time: "02:45 PM",
    away: { name: "Portugal", flag: "PT" },
    home: { name: "Netherlands", flag: "NL" },
    odds: {
      ml: [+110, -130],
      ou: [{ line: 2.5, over: -105, under: -115 }],
      rl: [{ line: "+0.5", odds: -165 }, { line: "-0.5", odds: +140 }],
      draw: "+0.5 -130",
    },
  },
  {
    id: "nac-4",
    time: "02:45 PM",
    away: { name: "England", flag: "GB" },
    home: { name: "Croatia", flag: "HR" },
    odds: {
      ml: [-145, +120],
      ou: [{ line: 2.5, over: -110, under: -110 }],
      rl: [{ line: "-0.5", odds: +130 }, { line: "+0.5", odds: -150 }],
      draw: "+0.5 -130",
    },
  },
];

// Soccer Games (5)
export const soccerGames: Game[] = [
  {
    id: "soc-1",
    time: "03:00 PM",
    away: { name: "Las Palmas", flag: "ES" },
    home: { name: "Malaga", flag: "ES" },
    odds: {
      ml: ["locked", "locked"],
      draw: "+0.5 -130",
      ou: [{ line: 2.5, over: -105, under: -115 }],
      soloPos: ["+250"],
      soloNeg: [],
    },
  },
  {
    id: "soc-2",
    time: "05:15 PM",
    away: { name: "Real Betis", flag: "ES" },
    home: { name: "Villarreal", flag: "ES" },
    odds: {
      ml: ["locked", "locked"],
      draw: "+0.5 -125",
      ou: [{ line: 2.5, over: -110, under: -110 }],
      soloPos: ["+200"],
      soloNeg: [],
    },
  },
  {
    id: "soc-3",
    time: "07:30 PM",
    away: { name: "Liverpool", flag: "GB" },
    home: { name: "Arsenal", flag: "GB" },
    odds: {
      ml: ["locked", "locked"],
      draw: "+0.5 -140",
      ou: [{ line: 3.0, over: -110, under: -110 }],
      soloPos: ["+180"],
      soloNeg: [],
    },
  },
  {
    id: "soc-4",
    time: "08:00 PM",
    away: { name: "Bayern Munich", flag: "DE" },
    home: { name: "Dortmund", flag: "DE" },
    odds: {
      ml: ["locked", "locked"],
      draw: "+0.5 -150",
      ou: [{ line: 3.5, over: -105, under: -115 }],
      soloPos: ["+155"],
      soloNeg: [],
    },
  },
  {
    id: "soc-5",
    time: "09:45 PM",
    away: { name: "Inter Milan", flag: "IT" },
    home: { name: "AC Milan", flag: "IT" },
    odds: {
      ml: ["locked", "locked"],
      draw: "+0.5 -135",
      ou: [{ line: 2.5, over: -110, under: -110 }],
      soloPos: ["+190"],
      soloNeg: [],
    },
  },
];

// Period tabs per sport
export const periodTabs: Record<string, string[]> = {
  MLB: ["juegoCompleto", "primeraMitad", "primeraTercia", "extra"],
  LMB: ["juegoCompleto", "primeraMitad", "primeraTercia", "extra"],
  NBA: ["juegoCompleto", "primeraMitad", "segundaMitad", "periodo1", "periodo2", "periodo3", "periodo4"],
  WNBA: ["juegoCompleto", "primeraMitad", "segundaMitad", "periodo1", "periodo2", "periodo3", "periodo4"],
  Soccer: ["juegoCompleto", "primeraMitad", "segundaMitad"],
  BPS: ["juegoCompleto"],
  "NBA-S": ["juegoCompleto"],
  CPBL: ["juegoCompleto", "primeraMitad", "primeraTercia", "extra"],
  NACIONES: ["juegoCompleto", "primeraMitad", "segundaMitad"],
};

// Banner gradients per sport
export const sportBanners: Record<string, string> = {
  MLB: "linear-gradient(135deg, #1a3a1c 0%, #0d2810 50%, #1a4720 100%)",
  LMB: "linear-gradient(135deg, #1a3a1c 0%, #0d2810 50%, #1a4720 100%)",
  NBA: "linear-gradient(135deg, #1a1a3e 0%, #0d0d2b 50%, #1a1640 100%)",
  WNBA: "linear-gradient(135deg, #2d1a3e 0%, #1a0d2b 50%, #3a1640 100%)",
  BPS: "linear-gradient(135deg, #1a3a1c 0%, #0d2810 50%, #1a4720 100%)",
  "NBA-S": "linear-gradient(135deg, #1a1a3e 0%, #0d0d2b 50%, #1a1640 100%)",
  Soccer: "linear-gradient(135deg, #0d2b1a 0%, #1a3a1c 50%, #0d2810 100%)",
  CPBL: "linear-gradient(135deg, #1a3a1c 0%, #0d2810 50%, #1a4720 100%)",
  NACIONES: "linear-gradient(135deg, #1a1a3e 0%, #16213e 50%, #0f3460 100%)",
};

// Results dropdown items
export const resultsItems = [
  { label: "MLB", url: "https://www.mlb.com/scores" },
  { label: "LMB", url: "https://www.milb.com/scores" },
  { label: "LIDOM", url: "https://www.lidom.com/resultados" },
  { label: "NBA", url: "https://www.nba.com/scores" },
  { label: "WNBA", url: "https://www.wnba.com/schedule?pd=2025&se=2025" },
  { label: "CBB", url: "https://www.ncaa.com/scoreboard/basketball-men/d1" },
  { label: "NHL", url: "https://www.nhl.com/scores" },
  { label: "NFL", url: "https://www.nfl.com/scores/" },
  { label: "CFB", url: "https://www.ncaa.com/scoreboard/football/fbs" },
  { label: "CFL", url: "https://www.cfl.ca/scores/" },
  { label: "SOCCER", url: "https://www.espn.com/soccer/scores" },
  { label: "UFC", url: "https://www.ufc.com/scores" },
  { label: "GALLOS", url: "https://www.sabong.net/" },
];

// Helper to get games by sport code
export function getGamesBySport(sportCode: SportCode): Game[] {
  switch (sportCode) {
    case "MLB": return mlbGames;
    case "CPBL": return cpblGames;
    case "LMB": return lmbGames;
    case "NBA": return nbaGames;
    case "WNBA": return wnbaGames;
    case "NACIONES": return nacionesGames;
    case "Soccer": return soccerGames;
    default: return [];
  }
}
