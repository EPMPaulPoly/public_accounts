import type { IndicatorConstant } from "@budgets_municipaux/common"
import api from "../api"


class ServiceConstants{
    /**getConstants
     * Service to obtain the relevant constants via an API
     * @param searchParams const_id, use_id and eq_id can be used to search for a given constant
     * @returns the Constants that meet the selected criteria
     */
    async getConstants({
        const_id,
        use_id,
        eq_id,
        description_like,
        symbol_like,
        limit,
        offset
    }:{
        const_id?:number,
        use_id?:number,
        eq_id?:number,
        description_like?:string,
        symbol_like?:string,
        limit?:number,
        offset?:number
    }){
        try{
            let base_query = `/common/constants`
            const query_string:string[]=[]
            if (const_id){
                query_string.push(`const_id=${const_id}`)
            }
            if (use_id){
                query_string.push(`use_id=${use_id}`)
            }
            if (eq_id){
                query_string.push(`eq_id=${eq_id}`)
            }
            if (limit!==undefined&&offset!==undefined){
                query_string.push(`limit=${limit}`)
                query_string.push(`offset=${offset}`)
            }
            if(description_like){
                query_string.push(`description_like=${description_like}`)
            }
            if (symbol_like){
                query_string.push(`symbol_like=${symbol_like}`)
            }

            if (query_string.length>0){
                base_query= base_query + '?' +query_string.join('&')
            }
            const apiresponse = await api.get(base_query)
            return ({success:true,data:apiresponse.data.data,total:apiresponse.data.total})
        }catch(error:any){
            return ({success:false,message:'Error retrieving constants'})
        }
    }
    /**createNewConstant
     * generates a new constant which is generic as a starting point
     * @returns the newly created constant
     */
    async createNewConstant(){
        try{
            const NewConstant:Omit<IndicatorConstant,'const_id'>={
                constant_desc:'Nouvelle constante',
                index_year:2010,
                default_value:0,
                symbol:'C_nouv'
            }
            const result = await api.post('/common/constants',NewConstant)
            return ({success:result.data.success, data:result.data.data,message:result.data.message})
        }catch(err:any){
            return ({success:false,message:'Error creating new constant'})
        }
    }
    /**deleteConstant
     * Does API call to delete constant
     * @param constToDelete is the unique id (const_id) of the constant you want to delete
     * @returns the deleted constant or an error message if that occurs 
     */
    async deleteConstant(constToDelete:number){
        try {
            const result = await api.delete(`/common/constants/${constToDelete}`)
            return ({success:result.data.success,data:result.data.data,message:result.data.message})
        } catch (error:any) {
            return ({success:false,message:'Error while deleting a constant'})
        }
    }

    async updateConstant(const_id:number, const_body:Omit<IndicatorConstant,'const_id'>){
        try{
            const result = await api.put(`/common/constants/${const_id}`,const_body)
            return ({success:result.data.success,data:result.data.data,message:result.data.message})
        }catch(error:any){
            return ({success:false,message:'Error while updating a constant'})
        }

    }

}

export const serviceConstants= new ServiceConstants() 
