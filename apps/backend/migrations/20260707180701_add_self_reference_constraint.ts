import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    db.schema.alterTable('municipal_qc.rows_table').addForeignKeyConstraint(
        'rows_table_parent_fk',
        ['parent_id'],
        'municipal_qc.rows_table',
        ['row_id']
    )
        .onDelete('cascade')
        .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
        .alterTable('municipal_part_rows')
        .dropConstraint('municipal_part_rows_parent_fk')
        .execute();
}
