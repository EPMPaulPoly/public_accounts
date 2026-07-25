import type { backend_response, municipalite, ProvincialDataId } from "@budgets_municipaux/common"
import api from "../api"

class ServiceReportData{

    async getUniqueDataTags(
        year:number,
        limit:number,
        offset:number,
        search_string?:string
    ):Promise<backend_response<ProvincialDataId[]>>{
        try{
            let base_query = `/munic/data/prov-ids?year=${year}&limit=${limit}&offset=${offset}`
            if (search_string){
                base_query+=`&search_string=${search_string}`
            }
            const apiresponse = await api.get(base_query)
            return ({success:true,data:apiresponse.data.data,total:apiresponse.data.total})
        }catch(error:any){
            return ({success:false,message:'Error retrieving P&L'})
        }
    }
    /**Getting the data to show financial statements you have to supply relevant information
     * to get one financial statement
     * @param munic municipality code for financial statement to obtain
     * @param year Year we're getting financial statements for
     * @param part_id Section of the report we're getting the data for
     * @returns an array where lines have descriptor and cells which are columns
     */
    async getGridData(munic:number,year:number,part_id:number){
        try{
            const base_query = `/munic/data/grid?cod_geo=${munic}&year=${year}&part_id=${part_id}`
            const apiresponse= await api.get(base_query)
            return ({success:true,data: apiresponse.data.data})
        }catch{
            return ({success:false,message:'error retrieving value grid'})
        }
    }
}

export const serviceReportData = new ServiceReportData()