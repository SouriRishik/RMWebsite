const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_TOKEN = process.env.NEXT_PUBLIC_SANITY_TOKEN;
const DRY_RUN = process.env.DRY_RUN !== 'false';

if (!SANITY_PROJECT_ID) {
  console.error('SANITY_PROJECT_ID not set in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
});

async function run() {
  console.log('Sanity teamMember.year migration');
  console.log('DRY_RUN:', DRY_RUN);

  const docs = await client.fetch(`*[_type == "teamMember" && defined(year)]{_id, _rev, year}`);
  console.log('Found', docs.length, 'documents with year field');

  for (const doc of docs) {
    const raw = doc.year;
    if (!raw) continue;

    if (typeof raw === 'string' && /^\d{4}$/.test(raw)) {
      console.log(doc._id, 'already year string:', raw);
      continue;
    }

    let yearString = null;

    if (typeof raw === 'string') {
      const m = raw.match(/^(\d{4})/);
      if (m) yearString = m[1];
    }

    if (!yearString) {
      try {
        const d = new Date(raw);
        if (!isNaN(d.getTime())) yearString = String(d.getUTCFullYear());
      } catch (e) {
        // ignore
      }
    }

    if (!yearString) {
      console.log(doc._id, 'could not determine year from:', raw);
      continue;
    }

    console.log(doc._id, '->', yearString, DRY_RUN ? '(dry run)' : '(apply)');

    if (!DRY_RUN) {
      if (!SANITY_TOKEN) {
        console.error('SANITY_TOKEN required to apply changes. Set it in .env.local');
        process.exit(1);
      }

      try {
        await client.patch(doc._id).set({ year: yearString }).commit({ autoGenerateArrayKeys: true });
        console.log('Patched', doc._id);
      } catch (err) {
        console.error('Failed to patch', doc._id, err.message || err);
      }
    }
  }

  console.log('Migration finished');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
