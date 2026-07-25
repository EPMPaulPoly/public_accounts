import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema.withSchema('municipal_qc')
                    .createTable('eqs_table')
                    .addColumn(
                        'eq_id'
                        ,'serial'
                        ,col=>col.primaryKey()
                    ).addColumn(
                        'eq_expression',
                        'varchar'
                    ).addColumn('eq_name','varchar')
                    .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema.withSchema('municipal_qc')
                        .dropTable('eqs_table')
                        .execute()
}
