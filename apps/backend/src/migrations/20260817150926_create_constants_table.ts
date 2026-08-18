import { Kysely,Transaction } from 'kysely'
import { Database } from '../db/types.js'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema.withSchema('common')
        .createTable('constants_table')
        .addColumn('const_id','serial',ref=>ref.primaryKey())
        .addColumn('constant_desc','text')
        .addColumn('default_value','double precision')
        .addColumn('index_year','integer')
        .addColumn('symbol','text').execute()

}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema.dropTable('common.constants_table').execute()
}
