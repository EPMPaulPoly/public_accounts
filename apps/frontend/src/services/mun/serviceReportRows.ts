import type { backend_response,FinStateSecRowWHelp,FinStateSectionRow } from "@budgets_municipaux/common"
import api from "../api"

class ServiceReportRows{
    /**
     * Gets you all the years for which there are data
     * @returns array of year objects containing all the year available
     */
    async getReportRows({
        row_id,
        part_id,
        parent_id,
        prov_rep_id,
        year,
        col_id,
        row_desc
    }:{
        row_id?:number,
        part_id?:number,
        parent_id?:number,
        prov_rep_id?:string,
        year?:number,
        col_id?:number,
        row_desc?:string
    }):Promise<backend_response<FinStateSecRowWHelp[]>>{
        try{
            let base_query = '/munic/report_rows'
            let query_adds=[]
            if (row_id!==undefined&&row_id!==null){
                query_adds.push(`row_id=${row_id}`)
            }
            if (part_id!==undefined&&part_id!==null){
                query_adds.push(`part_id=${part_id}`)
            }
            if (parent_id!==undefined&&parent_id!==null){
                query_adds.push(`parent_id=${parent_id}`)
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
            return ({success:false,message:'Error retrieving P&L'})
        }
    }

    async UpsertRows(newRows:FinStateSectionRow[]):Promise<backend_response<FinStateSecRowWHelp[]>>{
        try{
            const base_query= '/munic/report_rows'
            const body={rows:newRows.map((row)=> {if (row.row_id===-1){return {...row,row_id:null}}else{return row}})}
            const apiresponse= await api.post(base_query,body)
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return({success:false,message:"Error creating new report section"})
        }
    }

    async deleteRow(row_id:number):Promise<backend_response<FinStateSecRowWHelp[]>>{
        try{
            const base_query=`/munic/report_rows/${row_id}`
            const updatePage=await api.delete(base_query)
            return ({success:true,data:updatePage.data.data})
        }catch(error:any){
            return({success:false,message:'error deleting rows from page'})
        }
    }

    async moveRow(
        row_id:number,
        part_id:number,
        move:'up'|'down'
    ):Promise<backend_response<FinStateSecRowWHelp[]>>{
        try{
            const base_query =`/munic/report_rows/move`
            const body={move:{
                part_id:part_id,
                row_id:row_id,
                move:move
            }}
            const data = await api.patch(base_query,body)
            return{success:true,data:data.data.data}
        }catch(err:any){
            return{success:false,message:'Error moving row'}
        }

    }

    async newLine(row_desc:string,part_id:number,parent:number|null){
        try{
            const base_query=`/munic/report_rows/new-row`
            let body:{
                row_desc:string,
                part_id:number
                parent_id?:number
            }
            if (parent===null){
                 body={row_desc:row_desc,part_id:part_id}
            }else{
                body={row_desc:row_desc,part_id:part_id,parent_id:parent}
            }
            
            const updatePage=await api.post(base_query,body)
            return ({success:true,data:updatePage.data.data})
        }catch(error:any){
            return ({success:false,message:'error creating new row'})
        }
    }

    async changeRowParent(row_id:number,row_desc:string,new_parent:number|null,part_id:number){
        try{
            const base_query=`/munic/report_rows/change-parent`
            let body:{
                row_desc:string,
                row_id:number
                part_id:number
                new_parent_id:number|null
            }
                body={row_desc:row_desc,row_id:row_id,part_id:part_id,new_parent_id:new_parent}
            
            const updatePage=await api.patch(base_query,body)
            return ({success:true,data:updatePage.data.data})
        }catch(error:any){
            return ({success:false,message:'error creating new row'})
        }
    
    }
}

export const serviceReportRows = new ServiceReportRows()