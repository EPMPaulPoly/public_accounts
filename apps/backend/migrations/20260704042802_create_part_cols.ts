import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
            .withSchema('municipal_qc')
            .createTable('columns_table')
            .addColumn(
                'col_id',
                'serial',
                col=>col.primaryKey()
            )
            .addColumn(
                'part_id',
                'integer',
                col=>col
                .notNull()
                .references('municipal_qc.report_parts.part_id')
                .onDelete('cascade'))
            .addColumn('column_desc','varchar')
            .addColumn('column_order','integer')
            .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
            .withSchema('municipal_qc')
            .dropTable('columns_table')
            .execute()
}
