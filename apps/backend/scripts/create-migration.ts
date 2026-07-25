import fs from 'fs'
import path from 'path'

function getNameFromArgs(): string {
  const name = process.argv[2]
  if (!name) {
    console.error('❌ Please provide a migration name')
    process.exit(1)
  }
  return name
}

function timestamp(): string {
  const now = new Date()
  return now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
}

function createMigrationFile(name: string) {
  const ts = timestamp()
  const fileName = `${ts}_${name}.ts`

  const filePath = path.join(process.cwd(), 'migrations', fileName)

  const template = `import { Kysely } from 'kysely'
import { Database } from '../src/db/types'

export async function up(db: Kysely<Database>): Promise<void> {

}

export async function down(db: Kysely<Database>): Promise<void> {

}
`

  fs.writeFileSync(filePath, template)

  console.log(`✅ Created migration: ${fileName}`)
}

createMigrationFile(getNameFromArgs())