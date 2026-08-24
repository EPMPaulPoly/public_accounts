import { Kysely,Transaction } from 'kysely'
import { Database } from '../db/types.js'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema.withSchema('common')
        .createTable('constants_table')
        .addColumn('const_id','serial',ref=>ref.primaryKey())
        .addColumn('constant_desc','text', col=>col.notNull())
        .addColumn('default_value','double precision', col=>col.notNull())
        .addColumn('index_year','integer', col=>col.notNull())
        .addColumn('symbol','text', col=>col.notNull()).execute()

}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema.dropTable('common.constants_table').execute()
}
