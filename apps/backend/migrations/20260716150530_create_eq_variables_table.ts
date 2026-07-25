import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema.withSchema('municipal_qc')
                .createTable('eq_vars_table')
                .addColumn(
                    'eq_var_id',
                    'serial',
                    col=>col.primaryKey()
                ).addColumn(
                    'part_id',
                    'bigint',
                    col=>col.notNull()
                        .references('municipal_qc.report_parts.part_id')
                        .onDelete('cascade')
                ).addColumn(
                    'row_id',
                    'bigint',
                    col=>col.notNull()
                                .references('municipal_qc.rows_table.row_id')
                                .onDelete('cascade')
                ).addColumn(
                    'col_id',
                    'bigint',
                    col=> col.notNull()
                                .references('municipal_qc.columns_table.col_id')
                                .onDelete('cascade')
                ).addColumn(
                    'eq_var_symbol',
                    'varchar'
                ).addColumn(
                    'eq_id',
                    'bigint',
                    col=>col.references('municipal_qc.eqs_table.eq_id').notNull().onDelete('cascade')
                ).execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
        await db.schema
            .withSchema('municipal_qc')
            .dropTable('eq_var_table')
            .execute()
}
