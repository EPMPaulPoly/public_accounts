import type { backend_response ,municipalite,regions,year } from "@budgets_municipaux/common"
import api from "../api"

class ServiceMunicEnt{
    /**
     * Gets you all the years for which there are data
     * @returns array of year objects containing all the year available
     */
    async getYears():Promise<backend_response<year[]>>{
        try{
            const base_query = '/munic/years'
            const apiresponse = await api.get(base_query)
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return ({success:false,message:'Error retrieving P&L'})
        }
    }

    async getRegionOptions({region_type,year}:{region_type:'cm'|'reg'|'mrc'|'aucun',year:number}):Promise<backend_response<regions[]>>{
        try{
            const base_query = `/munic/munic/reg-opt?reg_type=${region_type}&year=${year}`
            const apiresponse = await api.get(base_query)
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return ({success:false,message:'Error retrieving Regions'})
        }
    }
    /**
     * Gets municipalities meeting criteria in input
     * @param year - year you're getting info for
     * @param mun_code - unique identifier for the municipality you're looking for
     * @param region_type - If looking for municipalities in a MRC, Metropolitan community or admin region
     * @param region_id - identifier for the region whose municipalities you want
     * @param pop_gt - get cities with population greater than
     * @param pop_st - get cites with population smaller than
     * @returns municipalities meeting criteria and a flag says success or failure
     */
    async getMunic(
        {
            year,
            mun_code,
            region_type,
            region_id,
            pop_gt,
            pop_st,
            limit,
            offset,
        }:{
            year?:number|null,
            mun_code?:number,
            region_type?:'cm'|'mrc'|'reg'|'aucun',
            region_id?:string|number,
            pop_gt?:number,
            pop_st?:number,
            limit?:number
            offset?:number
        }   
    ):Promise<backend_response<municipalite[]>>{
        try{
            let query = '/munic/munic'
            let query_adds = []
            if (year){
                query_adds.push(`year=${year}`)
            }
            if (mun_code!==undefined){
                query_adds.push(`code_geo=${mun_code}`)
            }
            if (region_type!==undefined && region_id!== undefined){
                query_adds.push(`region_type=${region_type}`)
                query_adds.push(`region_id=${region_id}`)
            }
            if (pop_gt!==undefined){
                query_adds.push(`pop_gt=${pop_gt}`)
            }
            if (pop_st!==undefined){
                query_adds.push(`pop_st=${pop_st}`)
            }
            if (limit!==undefined && offset!==undefined){
                query_adds.push(`limit=${limit}`)
                query_adds.push(`offset=${offset}`)
            }
            if (query_adds.length>0){
                query += '?' + query_adds.join('&')
            }
            
            const data = await api.get(query)
            return({success:true,data:data.data.data,total:data.data.total})
        }catch(err:any){
            return ({success:false,message:'Error retrieving municipalities'})
        }
    }
    /**
     * 
     * @param yearToCreate - integer which denotes a year you want to create
     */
    async createYear(yearToCreate:number){
        try{
            const apiresponse = await api.post('/munic/years',{year:yearToCreate})
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return ({success:false,message:'Error creating year'})
        }
    }
    

    async deleteYear(yearToDelete:number){
        try{
            const apiresponse = await api.delete(`/munic/years/${yearToDelete}`)
            return ({success:true,data:apiresponse.data.data})
        }catch(error:any){
            return ({success:false,message:'Error creating year'})
        }
    }
}

export const serviceMunicEnt = new ServiceMunicEnt()