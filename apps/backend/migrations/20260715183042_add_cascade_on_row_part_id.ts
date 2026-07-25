import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {
    const action= db.schema
                .alterTable("municipal_qc.rows_table")
                .dropConstraint("rows_table_part_id_fkey")
            .execute();

    await db.schema
                .alterTable("municipal_qc.rows_table")
                .addForeignKeyConstraint(
                    "rows_table_part_id_fkey",
                    ["part_id"],
                    "municipal_qc.report_parts",
                    ["part_id"],
                    (cb) => cb.onDelete("cascade")
                )
                .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema
    .alterTable("municipal_qc.rows_table")
    .dropConstraint("rows_table_part_id_fkey")
    .execute();

  await db.schema
    .alterTable("municipal_qc.rows_table")
    .addForeignKeyConstraint(
      "rows_table_part_id_fkey",
      ["part_id"],
      "municipal_qc.report_parts",
      ["part_id"]
    )
    .execute();
}
