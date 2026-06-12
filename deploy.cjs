const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const REMOTE = '/domains/nmvdapp.com/public_html/deportes';

async function deploy() {
  const client = new ftp.Client(60000);
  client.ftp.verbose = false;

  await client.access({
    host: '82.25.87.157',
    port: 21,
    user: 'u108221933',
    password: 'Producers0587@',
    secure: false,
  });
  console.log('Connected!');

  const topFiles = fs.readdirSync(DIST).filter(f => !fs.statSync(path.join(DIST, f)).isDirectory());
  const assetsDir = path.join(DIST, 'assets');
  const assets = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];

  let ok = 0;

  for (const f of topFiles) {
    await client.cd('/');
    await client.uploadFrom(path.join(DIST, f), REMOTE + '/' + f);
    ok++;
    console.log('OK:', f);
  }

  await client.ensureDir(REMOTE + '/assets');

  for (const f of assets) {
    await client.cd('/');
    await client.uploadFrom(path.join(assetsDir, f), REMOTE + '/assets/' + f);
    ok++;
    if (ok % 20 === 0) console.log('Progress:', ok + '/' + (topFiles.length + assets.length));
  }

  client.close();
  console.log('Done! Total:', ok, 'files');
}

deploy().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
