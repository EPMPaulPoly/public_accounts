import { Database } from "../../../db/types";
import { Kysely } from "kysely";
import { db } from "../../../db/db";
import { municPartRepository } from "../../repositories/municipal/munic_report_parts.repositories";
class ReportPartsService {
    async getReportParts() {
        console.log("→ getReportParts called")

        const query = db
            .selectFrom("municipal_qc.report_parts")
            .selectAll()

        console.log("→ SQL about to run")
        console.log("SQL:", query.compile().sql)
        console.log("PARAMS:", query.compile().parameters)
        const data = await query.execute()

        console.log("→ result:", data)

        return data
    }

    async createReportPart(desc:string,secName:string){
        const query = db
                        .insertInto('municipal_qc.report_parts')
                        .values({
                            part_desc:desc,
                            part_page_def:secName})
                        .returningAll()
        console.log("→ SQL about to run")
        console.log("SQL:", query.compile().sql)
        console.log("PARAMS:", query.compile().parameters)
        const data = await query.execute()

        console.log("→ result:", data)

        return data
    }

    async deleteReportPart(part_id:number){
        const query = db
                        .deleteFrom('municipal_qc.report_parts')
                        .where('municipal_qc.report_parts.part_id','=',part_id)
                        .returningAll()
        console.log("→ SQL about to run")
        console.log("SQL:", query.compile().sql)
        console.log("PARAMS:", query.compile().parameters)
        const data = await query.execute()

        console.log("→ result:", data)

        return data
    }

    async modifyReportPart(part_id:number,part_desc:string,part_page_def:string){
        const data =municPartRepository.modifyReportPartRepo(db,part_id,part_desc,part_page_def)
        return data
    }
}   



export const reportPartsService = new ReportPartsService()