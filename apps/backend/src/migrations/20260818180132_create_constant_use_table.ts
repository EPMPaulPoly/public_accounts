import { Kysely } from 'kysely'
import { Database } from '../db/types.js'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema.withSchema('municipal_qc')
        .createTable('constant_use_table')
        .addColumn('use_id','serial',ref=>ref.primaryKey())
        .addColumn('const_id','integer',ref=>ref.notNull().references('common.constants_table.const_id').onDelete('cascade'))
        .addColumn('eq_id','integer',ref=>ref.notNull().references('municipal_qc.eqs_table.eq_id').onDelete('cascade'))
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema.withSchema('municipal_qc').dropTable('constant_use_table').execute()
}
