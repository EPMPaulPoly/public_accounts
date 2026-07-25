import { Kysely,sql } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await sql`
    CREATE SCHEMA IF NOT EXISTS municipal_qc;
    CREATE SCHEMA IF NOT EXISTS provincial;
    CREATE SCHEMA IF NOT EXISTS federal;
  `.execute(db)
}

export async function down(db: Kysely<Database>): Promise<void> {
    await sql`
    DROP SCHEMA IF EXISTS municipal_qc CASCADE;
    DROP SCHEMA IF EXISTS provincial CASCADE;
    DROP SCHEMA IF EXISTS federal CASCADE;
  `.execute(db)
}
