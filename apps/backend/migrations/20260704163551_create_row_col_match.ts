import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .createTable('match')
        .addColumn('match_id','serial')
        .addColumn(
            'part_id',
            'integer',
            col=>col
            .notNull()
            .references('municipal_qc.report_parts.part_id')
            .onDelete('cascade')
        ).addColumn(
            'row_id',
            'integer',
            col=>col.notNull().references(
                'municipal_qc.rows_table.row_id'
            ).onDelete('cascade')
        ).addColumn(
            'col_id',
            'integer',
            col=>col
            .notNull()
            .references('municipal_qc.columns_table.col_id')
            .onDelete('cascade')
        ).addColumn(
            'prov_rep_id',
            'varchar'
        ).addColumn(
            'year',
            'integer',
            col=>col
            .notNull()
            .references('municipal_qc.year_table.year')
        ).execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .dropTable('match')
        .execute()
}
