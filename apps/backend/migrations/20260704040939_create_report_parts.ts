import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .createTable('report_parts')
        .addColumn('part_id','serial',col=>col.primaryKey())
        .addColumn('part_page_def','varchar')
        .addColumn('part_desc','varchar')
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .dropTable('report_parts')
        .execute()
}
