import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .alterTable('municipalities')
        .addColumn('nom_cm','varchar')
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .alterTable('municipalities')
        .dropColumn('nom_cm')
        .execute()
}
