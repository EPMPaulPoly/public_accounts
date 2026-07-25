import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .createTable('municipalities')
        .addColumn('year_mun_id','serial')
        .addColumn('cod_geo','integer')
        .addColumn('nom_organisme','varchar')
        .addColumn('desi_org','varchar')
        .addColumn('cod_mrc','varchar')
        .addColumn('cod_cm','varchar')
        .addColumn('nom_mrc','varchar')
        .addColumn('no_reg','integer')
        .addColumn('desc_reg','varchar')
        .addColumn('type_org','varchar')
        .addColumn('population','integer')
        .addColumn('year','integer',col=>col
            .notNull()
            .references('municipal_qc.year_table.year')
            .onDelete('cascade')
        ).execute()

}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
        .withSchema('municipal_qc')
        .dropTable('municipalities_qc')
        .execute()
}
