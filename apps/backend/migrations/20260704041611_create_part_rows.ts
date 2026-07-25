import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .createTable('rows_table')
        .addColumn(
            'row_id',
            'serial',
            col=>col.primaryKey()
        )
        .addColumn(
            'part_id',
            'integer',
            col=>col
                .notNull()
                .references('municipal_qc.report_parts.part_id')
        ).addColumn('row_desc','varchar')
        .addColumn(
            'parent_id',
            'integer'
        ).addColumn('item_order','integer')
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .dropTable('rows_table')
        .execute()
}
