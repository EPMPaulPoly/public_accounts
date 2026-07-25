import {
	DummyDriver,
	PostgresAdapter,
	PostgresDialect,
	PostgresIntrospector,
	PostgresQueryCompiler,
} from 'kysely'
import { defineConfig, getKnexTimestampPrefix } from 'kysely-ctl'
import { Pool } from 'pg'
import 'dotenv'

export default defineConfig({
	// replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
	dialect: new PostgresDialect({
		pool: new Pool({
			database: process.env.DB_NAME,
			host: 'localhost',
			user: process.env.DB_USER,
			password:process.env.DB_PASSWORD
		})
	})
	,
	migrations: {
	    migrationFolder: "migrations",
		getMigrationPrefix: getKnexTimestampPrefix
	},
	//   plugins: [],
	//   seeds: {
	//     seedFolder: "seeds",
	//   }
})
