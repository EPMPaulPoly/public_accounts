import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .alterTable('data')
        .addColumn('cod_geo','integer')
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .alterTable('data')
        .dropColumn('cod_geo',)
        .execute()
}
