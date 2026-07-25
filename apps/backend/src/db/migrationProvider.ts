import { Migrator, FileMigrationProvider } from 'kysely/migration'
import path from 'path'
import { Kysely } from 'kysely'
import fs from 'node:fs/promises'

export function createMigrator(db: Kysely<any>) {
    return new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            migrationFolder: path.join(__dirname, '../../migrations'),
        }),
    })
}