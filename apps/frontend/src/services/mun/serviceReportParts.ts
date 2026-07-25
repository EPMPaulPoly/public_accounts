import type { backend_response ,FinStateSection} from "@budgets_municipaux/common"
import api from "../api"

class ServiceReportParts{
    /**
     * Gets you all the years for which there are data
     * @returns array of year objects containing all the year available
     */
    async getReportParts(
        part_id?:number,
        row_id?:number,
        col_id?:number,
        prov_rep_id?:number,
        year?:number
    ):Promise<backend_response<FinStateSection[]>>{
        try{
            let base_query = '/munic/report_parts'
            let query_adds=[]
            if (part_id!==undefined&&part_id!==null){
                query_adds.push(`part_id=${part_id}`)
            }
            if (row_id!==undefined&&row_id!==null){
                query_adds.push(`row_id=${row_id}`)
            }
            if (col_id!==undefined&&col_id!==null){
                query_adds.push(`col_id=${col_id}`)
            }
            if (prov_rep_id!==undefined&&year!==undefined&&prov_rep_id!==null&&year!==null){
                query_adds.push(`prov_rep_id=${prov_rep_id}`)
                query_adds.push(`year=${year}`)
            }
            if (query_adds.length>0){
                base_query += '?' + query_adds.join('&')
            }
            const apiresponse = await api.get(base_query)
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return ({success:false,message:'Error retrieving P&L'})
        }
    }

    async createNewPart(description:string,secName:string):Promise<backend_response<FinStateSection[]>>{
        try{
            const base_query= '/munic/report_parts'
            const body={part_page_def:secName,part_desc:description}
            const apiresponse= await api.post(base_query,body)
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return({success:false,message:"Error creating new report section"})
        }
    }

    async deleteReportParts(part_id:number):Promise<backend_response<FinStateSection>>{
        try{
            const base_query= `/munic/report_parts/${part_id}`
            const apiresponse= await api.delete(base_query)
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return({success:false,message:"Error creating new report section"})
        }
    }
    async updateReportPart(part_id:number,description:string,sec_name:string):Promise<backend_response<FinStateSection>>{
        try {
            const base_query=`/munic/report_parts/${part_id}`
            const body={part_page_def:sec_name,part_desc:description}
            const apiresponse=await api.put(base_query,body)
            return {success:true,data:apiresponse.data.data}
        } catch (error:any) {
            return {success:false,message:'Error while updating the report section'}
        }
    }
}

export const serviceReportParts = new ServiceReportParts()