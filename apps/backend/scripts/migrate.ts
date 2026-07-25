import { db } from '../src/db/db'
import { createMigrator } from '../src/db/migrationProvider'
import { auth } from '../src/utils/auth'
import { getMigrations } from 'better-auth/db/migration'

async function run() {


    // 1. Run Better Auth migrations first
    const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options)

    if (toBeCreated.length || toBeAdded.length) {
        console.log(`Better Auth: ${toBeCreated.length} tables to create, ${toBeAdded.length} columns to add`)
        await runMigrations()
        console.log('Better Auth migrations applied')
    } else {
        console.log('Better Auth: no pending migrations')
    }



    const migrator = createMigrator(db)

    const { error, results } = await migrator.migrateToLatest()

    results?.forEach(result => {
        console.log(result)
    })

    if (error) {
        console.error(error)
        process.exit(1)
    }

    await db.destroy()
}

run()