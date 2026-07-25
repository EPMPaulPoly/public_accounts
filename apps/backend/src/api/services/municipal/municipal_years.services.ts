import { Database } from "../../../db/types";
import { Kysely } from "kysely";
import { db } from "../../../db/db";
class YearsService {
    async getYears() {
        console.log("→ getYears called")

        const query = db
            .selectFrom("municipal_qc.year_table")
            .selectAll()

        console.log("→ SQL about to run")
        console.log("SQL:", query.compile().sql)
        console.log("PARAMS:", query.compile().parameters)
        const data = await query.execute()

        console.log("→ result:", data)

        return data
    }
    async createYear(year:number){
        console.log("→ creatYears called")

        const query = db
            .insertInto("municipal_qc.year_table")
            .values({'year':year})
            .returningAll()

        console.log("→ SQL about to run")
        console.log("SQL:", query.compile().sql)
        console.log("PARAMS:", query.compile().parameters)
        const data = await query.execute()

        console.log("→ result:", data)

        return data
    }

    async deleteYear(year:number){
        console.log("→ creatYears called")

        const query = db
            .deleteFrom("municipal_qc.year_table")
            .where("municipal_qc.year_table.year",'=',year)
            .returningAll()

        console.log("→ SQL about to run")
        console.log("SQL:", query.compile().sql)
        console.log("PARAMS:", query.compile().parameters)
        const data = await query.execute()

        console.log("→ result:", data)

        return data
    }
}   


export const yearService = new YearsService()