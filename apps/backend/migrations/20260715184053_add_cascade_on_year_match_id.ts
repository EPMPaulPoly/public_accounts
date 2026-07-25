import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    const action= db.schema
                .alterTable("municipal_qc.match")
                .dropConstraint("match_year_fkey")
            .execute();

    await db.schema
                .alterTable("municipal_qc.match")
                .addForeignKeyConstraint(
                    "match_year_fkey",
                    ["year"],
                    "municipal_qc.year_table",
                    ["year"],
                    (cb) => cb.onDelete("cascade")
                )
                .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
        await db.schema
    .alterTable("municipal_qc.match")
    .dropConstraint("match_year_fkey")
    .execute();

  await db.schema
    .alterTable("municipal_qc.rows_table")
    .addForeignKeyConstraint(
      "match_year_fkey",
      ["year"],
      "municipal_qc.year_table",
      ["year"]
    )
    .execute();
}
