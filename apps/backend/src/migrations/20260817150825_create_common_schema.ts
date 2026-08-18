import { Kysely, sql } from 'kysely'
import { Database } from '../db/types.js'

export async function up(db: Kysely<Database>): Promise<void> {
    await sql`
    CREATE SCHEMA IF NOT EXISTS common;
  `.execute(db)
}

export async function down(db: Kysely<Database>): Promise<void> {
    await sql`
    DROP SCHEMA IF EXISTS common CASCADE;
  `.execute(db)
}