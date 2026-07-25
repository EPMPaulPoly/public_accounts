import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
            .withSchema('municipal_qc')
            .createTable('data')
            .addColumn(
                'data_id',
                'serial',
                col=>col.primaryKey()
            ).addColumn(
                'prov_rep_id',
                'varchar'
            ).addColumn(
                'year',
                'integer',
                col=>col
                .notNull()
                .references('municipal_qc.year_table.year')
                .onDelete('cascade')
            ).addColumn(
                'value',
                'numeric'
            ).execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
            .withSchema('municipal_qc')
            .dropTable('data')
            .execute()
}
