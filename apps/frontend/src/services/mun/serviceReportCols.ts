import type { backend_response,FinStateSecColWHelp,FinStateSectionCol,FinStateSectionRow } from "@budgets_municipaux/common"
import api from "../api"

class ServiceReportCols{
    /**
     * Gets you all the years for which there are data
     * @returns array of year objects containing all the year available
     */
    async getReportCols(
        {
            part_id,
            parent_id,
            prov_rep_id,
            year,
            col_id,
            row_desc
        }:{
            part_id?:number,
            parent_id?:number,
            prov_rep_id?:string,
            year?:number,
            col_id?:number,
            row_desc?:string
        }):Promise<backend_response<FinStateSecColWHelp[]>>{
        try{
            let base_query = '/munic/report_cols'
            let query_adds=[]
            if (part_id!==undefined&&part_id!==null){
                query_adds.push(`part_id=${part_id}`)
            }
            if (parent_id!==undefined&&parent_id!==null){
                query_adds.push(`row_id=${parent_id}`)
            }
            if (col_id!==undefined&&col_id!==null){
                query_adds.push(`col_id=${col_id}`)
            }
            if (row_desc!==undefined&&row_desc!==null){
                query_adds.push(`col_id=${row_desc}`)
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
            return ({success:false,message:'Error retrieving cols'})
        }
    }

    async UpsertCols(newRows:FinStateSectionCol[]):Promise<backend_response<FinStateSecColWHelp[]>>{
        try{
            const base_query= '/munic/report_cols'
            const body={cols:newRows.map((row)=> {if (row.col_id===-1){return {...row,col_id:null}}else{return row}})}
            const apiresponse= await api.post(base_query,body)
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return({success:false,message:"Error creating new report section"})
        }
    }

    async deleteCol(col_id:number):Promise<backend_response<FinStateSecColWHelp[]>>{
        try{
            const base_query=`/munic/report_cols/${col_id}`
            const updatePage=await api.delete(base_query)
            return ({success:true,data:updatePage.data.data})
        }catch(error:any){
            return({success:false,message:'error deleting cols from page'})
        }
    }

    async moveCol(
        column_id:number,
        part_id:number,
        move:'left'|'right'
    ):Promise<backend_response<FinStateSecColWHelp[]>>{
        try{
            const base_query =`/munic/report_cols/move`
            const body={move:{
                part_id:part_id,
                col_id:column_id,
                move:move
            }}
            const data = await api.patch(base_query,body)
            return{success:true,data:data.data.data}
        }catch(err:any){
            return{success:false,message:'Error moving row'}
        }

    }
    async newCol(
        col_desc:string,
        part_id:number
    ):Promise<backend_response<FinStateSecColWHelp>>{
        try{
            const base_query= '/munic/report_cols/new-col'
            const body={part_id:part_id,column_desc:col_desc}
            const res= await api.post(base_query,body)
            return {success:true,data:res.data.data}
        }catch(err:any){
            return{success:false,message:'error creating new row'}
        }
    }
}

export const serviceReportCols = new ServiceReportCols()