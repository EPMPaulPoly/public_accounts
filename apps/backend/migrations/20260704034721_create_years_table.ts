import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .createTable('year_table')
        .addColumn('year','integer',col=>col.primaryKey())
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .dropTable('year_table')
        .execute()
}
