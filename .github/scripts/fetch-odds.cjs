// fetch-odds.cjs — Fetches from the-odds-api and uploads to Supabase Storage
// Runs via GitHub Actions daily at 11am ET. Also usable locally.
'use strict';
const https = require('https');

const ODDS_API_KEY = process.env.ODDS_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BUCKET = 'odds-data';

if (!ODDS_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing env vars: ODDS_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY');
  process.exit(1);
}

// Sports to fetch from the-odds-api → mapped to our app's SportCode
const SPORTS = [
  { apiKey: 'baseball_mlb',              code: 'MLB'    },
  { apiKey: 'basketball_nba',            code: 'NBA'    },
  { apiKey: 'basketball_wnba',           code: 'WNBA'   },
  { apiKey: 'soccer_uefa_nations_league',code: 'Soccer' },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { reject(new Error('JSON parse error: ' + data.substring(0, 200))); }
      });
    }).on('error', reject);
  });
}

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// Short team name (trim city): "New York Yankees" → "Yankees"
function shortName(full) {
  const parts = full.trim().split(' ');
  if (parts.length <= 1) return full;
  const twoWord = ['Red Sox','Blue Jays','White Sox','Real Madrid','Man City'];
  const lastTwo = parts.slice(-2).join(' ');
  if (twoWord.some(n => full.endsWith(n))) return lastTwo;
  return parts[parts.length - 1];
}

// Format game time in ET
function formatTime(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
    timeZone: 'America/New_York'
  });
}

// Returns today's date range in UTC for ET timezone (UTC-4 during EDT)
function getTodayRangeET() {
  const now = new Date();
  const offset = 4 * 60 * 60 * 1000; // EDT = UTC-4
  const etNow = new Date(now.getTime() - offset);
  const start = new Date(etNow); start.setUTCHours(0, 0, 0, 0);
  const end   = new Date(etNow); end.setUTCHours(23, 59, 59, 0);
  return {
    from: new Date(start.getTime() + offset).toISOString().replace('.000Z', 'Z'),
    to:   new Date(end.getTime()   + offset).toISOString().replace('.000Z', 'Z'),
  };
}

// Transform one game from the-odds-api format → our Game format
function transformGame(g, sportCode) {
  const bookmaker = g.bookmakers?.[0];
  if (!bookmaker) return null;

  const ml_market  = bookmaker.markets?.find(m => m.key === 'h2h');
  const rl_market  = bookmaker.markets?.find(m => m.key === 'spreads');
  const tot_market = bookmaker.markets?.find(m => m.key === 'totals');

  const away = g.away_team;
  const home = g.home_team;

  // Moneyline
  let ml;
  if (ml_market) {
    const ao = ml_market.outcomes.find(o => o.name === away)?.price;
    const ho = ml_market.outcomes.find(o => o.name === home)?.price;
    if (ao != null && ho != null) ml = [ao, ho];
  }

  // Run line / spread
  let rl;
  if (rl_market) {
    const as = rl_market.outcomes.find(o => o.name === away);
    const hs = rl_market.outcomes.find(o => o.name === home);
    if (as && hs) {
      rl = [
        { line: as.point > 0 ? `+${as.point}` : String(as.point), odds: as.price },
        { line: hs.point > 0 ? `+${hs.point}` : String(hs.point), odds: hs.price },
      ];
    }
  }

  // Totals over/under
  let ou;
  if (tot_market) {
    const ov = tot_market.outcomes.find(o => o.name === 'Over');
    const un = tot_market.outcomes.find(o => o.name === 'Under');
    if (ov && un) ou = [{ line: ov.point, over: ov.price, under: un.price }];
  }

  return {
    id: g.id,
    time: formatTime(g.commence_time),
    away: { name: shortName(away), logo: away.substring(0, 3).toUpperCase() },
    home: { name: shortName(home), logo: home.substring(0, 3).toUpperCase() },
    odds: { ml, ou, rl },
  };
}

// ─── Supabase Storage helpers ────────────────────────────────────────────────

const supabaseHost = SUPABASE_URL.replace('https://', '');

async function ensureBucket() {
  const opts = {
    hostname: supabaseHost,
    path: `/storage/v1/bucket`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_KEY,
    },
  };
  const body = JSON.stringify({ id: BUCKET, name: BUCKET, public: true });
  const res = await httpsRequest(opts, body);
  if (res.status === 200 || res.status === 409) {
    console.log('Bucket ready:', BUCKET);
    return true;
  }
  console.error('Bucket create error:', res.status, res.body);
  return false;
}

async function uploadJSON(filename, data) {
  const json = JSON.stringify(data, null, 2);
  const buf  = Buffer.from(json, 'utf8');
  for (const method of ['PUT', 'POST']) {
    const opts = {
      hostname: supabaseHost,
      path: `/storage/v1/object/${BUCKET}/${filename}`,
      method,
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Content-Length': buf.byteLength,
        'x-upsert': 'true',
      },
    };
    const res = await httpsRequest(opts, buf);
    if (res.status === 200 || res.status === 201) {
      console.log(`Uploaded ${filename} (${(buf.byteLength/1024).toFixed(1)}KB) [${method}]`);
      return true;
    }
    if (method === 'POST') console.error('Upload failed:', res.status, res.body);
  }
  return false;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== fetch-odds starting ===');
  console.log('Time (ET):', new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));

  await ensureBucket();

  const result = { last_updated: new Date().toISOString(), games: {} };
  const { from, to } = getTodayRangeET();
  console.log(`Date filter: ${from} → ${to}`);

  for (const sport of SPORTS) {
    const url = `https://api.the-odds-api.com/v4/sports/${sport.apiKey}/odds/?`
      + `apiKey=${ODDS_API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
      + `&commenceTimeFrom=${from}&commenceTimeTo=${to}`;

    console.log(`\nFetching ${sport.code} (${sport.apiKey})...`);
    const { status, body } = await httpsGet(url);

    if (status !== 200) {
      console.warn(`  → HTTP ${status}, skipping`);
      result.games[sport.code] = [];
      continue;
    }

    const games = Array.isArray(body) ? body : [];
    const transformed = games.map(g => transformGame(g, sport.code)).filter(Boolean);
    result.games[sport.code] = transformed;
    console.log(`  → ${transformed.length} games`);
  }

  await uploadJSON('games.json', result);

  const status_doc = {
    last_run: new Date().toISOString(),
    counts: Object.fromEntries(Object.entries(result.games).map(([k,v]) => [k, v.length])),
  };
  await uploadJSON('status.json', status_doc);

  console.log('\n=== Done! ===');
  console.log('Public URL:', `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/games.json`);
}

main().catch(err => { console.error(err); process.exit(1); });
