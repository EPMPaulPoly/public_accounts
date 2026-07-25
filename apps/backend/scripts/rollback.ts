import { getMigrations } from 'better-auth/db/migration'
import { db } from '../src/db/db'
import { createMigrator } from '../src/db/migrationProvider'
import { auth } from '../src/utils/auth'


type RollbackMode = 'custom-steps' | 'better-auth-last' | 'both'

interface RollbackOptions {
    mode: RollbackMode
    steps: number // for 'custom-to' mode
}

async function rollbackCustomMigrations(options: { steps: number }) {
    const migrator = createMigrator(db)

    if (options.steps) {
        // Rollback until specific migration (inclusive)
        for (let i=1; steps;i++){
            await migrator.migrateDown()
        }
        console.log(`Rolled back custom migrations ${options.steps} steps`)
    } else {
        throw new Error('Need to provide a number of steps')
    }
}

async function rollbackBetterAuthMigrations() {
    // Better Auth doesn't have automatic rollback tracking
    // You need to manually identify which migration to rollback
    
    // Option 1: Get all pending migrations and run their down functions
    const { toBeCreated, toBeAdded } = await getMigrations(auth.options)
    
    if (toBeCreated.length === 0 && toBeAdded.length === 0) {
        console.log('No Better Auth migrations pending rollback')
        return
    }

    console.log(`Better Auth tables to drop: ${toBeCreated.map(t => t.table).join(', ')}`)
    console.log(`Better Auth columns to remove: ${toBeAdded.map(a => `${a.table}.${Object.keys(a.fields)}`).join(', ')}`)
    
    // IMPORTANT: Better Auth doesn't track migration history
    // You must manually run the down operations here
    // This typically means dropping tables/columns in reverse order
    
    // For safety, you might want to implement explicit down logic:
    // await db.schema.dropTable('session').execute()
    // await db.schema.dropTable('account').execute()
    // etc.
    
    console.warn('⚠️  Better Auth rollback requires manual intervention')
    console.warn('   See documentation at https://better-auth.com/docs/concepts/database')
}

async function run(options: RollbackOptions) {
    switch (options.mode) {
        case 'custom-steps':
            await rollbackCustomMigrations({steps:options.steps})
            break
        case 'better-auth-last':
            await rollbackBetterAuthMigrations()
            break

        case 'both':
            // Rollback custom first (safer), then Better Auth
            await rollbackCustomMigrations({steps:options.steps})
            await rollbackBetterAuthMigrations()
            break

        default:
            throw new Error(`Unknown rollback mode: ${(options as any).mode}`)
    }

    await db.destroy()
}

// Parse command line args
const modeArg = process.argv.find(arg => arg.startsWith('--mode='))
const stepsArg = process.argv.find(arg => arg.startsWith('--steps='))

const mode = modeArg?.split('=')[1] as RollbackMode || 'custom-steps'
const steps = !Number.isNaN(Number(stepsArg?.split('=')[1]))?Number(stepsArg?.split('=')[1]):0

run({ mode, steps }).catch(err => {
    console.error(err)
    process.exit(1)
})