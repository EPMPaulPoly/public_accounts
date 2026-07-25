import type { backend_response, FinStateAssignGrid, pageYearCombo } from "@budgets_municipaux/common"
import api from "../api"

class ServiceReportAssign{

    async getReportAssigns(combo:pageYearCombo):Promise<backend_response<FinStateAssignGrid[]>>{
        try{
            let base_query = `/munic/matches/grid?year=${combo.year}&part_id=${combo.part_id}`
            const apiresponse = await api.get(base_query)
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return ({success:false,message:'Error retrieving P&L'})
        }
    }

    async newReportAssign(
        row_id:number,
        col_id:number,
        year:number,
        part_id:number,
        prov_rep_id:string
    ):Promise<backend_response<FinStateAssignGrid[]>>{
        try{
            let base_query=`/munic/matches/grid`
            const body={
                row_id:row_id,
                col_id:col_id,
                year:year,
                part_id:part_id,
                prov_rep_id:prov_rep_id
            }
            const apiresponse=await api.post(base_query,body)
            return ({success:true,data: apiresponse.data.data})
        }catch(err:any){
            return({success:false})
        }
    }

    async updateReportAssign(
        match_id:number,
        row_id:number,
        col_id:number,
        year:number,
        part_id:number,
        prov_rep_id:string
    ):Promise<backend_response<FinStateAssignGrid[]>>{
        try{
            let base_query=`/munic/matches/grid`
            const body={
                match_id:match_id,
                row_id:row_id,
                col_id:col_id,
                year:year,
                part_id:part_id,
                prov_rep_id:prov_rep_id
            }
            const apiresponse=await api.put(base_query,body)
            return ({success:true,data: apiresponse.data.data})
        }catch(err:any){
            return({success:false})
        }
    }
    async deleteReportAssign(
        match_id:number,
        year:number,
        part_id:number
    ):Promise<backend_response<FinStateAssignGrid[]>>{
        try{
            let base_query=`/munic/matches/grid/${match_id}?year=${year}&part_id=${part_id}`
            const apiresponse=await api.delete(base_query)
            return ({success:true,data: apiresponse.data.data})
        }catch(err:any){
            return({success:false})
        }
    }

    async copyAssignmentsFromTo(year_to_copy:number,year_to_seed:number){
        try{
            let base_query=`/munic/matches/copy-between-years?year_to_copy=${year_to_copy}&year_to_seed=${year_to_seed}`  
            const apiresponse=await api.post(base_query)
            return ({success:true,data: apiresponse.data.data})
        }catch(err:any){
            return({success:false})
        }
    }
}

export const serviceReportAssign = new ServiceReportAssign()