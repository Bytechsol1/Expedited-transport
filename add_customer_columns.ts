import { db } from './src/lib/db/client.ts';
import { sql } from 'drizzle-orm';

async function run() {
  try {
    await db.execute(sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS full_name text;`);
    await db.execute(sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone text;`);
    await db.execute(sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS company text;`);
    console.log('success');
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}
run();
