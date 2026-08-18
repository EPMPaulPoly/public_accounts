import { db } from "../../../db/db.js";
import { constantsRepositories } from "../../repositories/common/constants.repositories.js";

class ConstantsService {
    /**getConstantsServ
     * the business logic layer which initiates the queries to get the required constants
     * @param param0 an object containing the equation_id a year, or a constant id
     * @returns the constants which are associated with eq_id, have the const_id
     */
    async getConstantsServ({
        eq_id,
        const_id,
        limit,
        offset,
        description_like,
        symbol_like,
        use_id
    }:{
        eq_id?:number,
        const_id?:number,
        limit?:number,
        offset?:number,
        description_like?:string,
        symbol_like?:string,
        use_id?:number
    }){
        const {data,count}= await db.transaction().execute(async(trx)=>{
            const data = await constantsRepositories.getConstantsRepo(trx,{eq_id:eq_id,const_id:const_id,limit:limit,offset:offset,description_like:description_like,symbol_like:symbol_like})
            let count:number|undefined=0
            if (limit!==undefined&&offset!==undefined){
                const resultCount = (await constantsRepositories.getConstantsCountRepo(trx,{eq_id:eq_id,const_id:const_id,description_like:description_like,symbol_like:symbol_like})) 
                count = resultCount?.[0]?.count ?? 0;
            }
              
            return {data,count}
        })
        return {data,count}
    }

    /**createConstantServ
     * Business logic function that initiates the creation of a new constant
     * @param param0 containing constant_desc, default_value,index_year,symbol
     * @returns the new 
     */
    async createConstantServ(
        {
            constant_desc,
            default_value,
            index_year,
            symbol
        }:{
            constant_desc:string,
            default_value:number,
            index_year:number,
            symbol:string
        }
    ){

        const constantToReturn = await db.transaction().execute(async(trx)=>{
            const data =  await constantsRepositories.createConstantsRepo(trx,{
                constant_desc:constant_desc,
                default_value:default_value,
                index_year:index_year,
                symbol:symbol
            })
            return data
        })
        return constantToReturn
    }
    /** updateConstantServ
     * Business logic fucntion that initiates the update to a business function
     * @param param0 containing const_id, constant_desc,default_value,index_year and symbol of the 
     * constant we're trying to modify
     * @returns the udpated constant
     */
    async updateConstantServ(
        {
            const_id,
            constant_desc,
            default_value,
            index_year,
            symbol
        }:{
            const_id:number,
            constant_desc:string,
            default_value:number,
            index_year:number,
            symbol:string
        }
    ){
        const constantToReturn = await db.transaction().execute(async(trx)=>{
            const data =  await constantsRepositories.updateConstantsRepo(trx,{
                const_id:const_id,
                constant_desc:constant_desc,
                default_value:default_value,
                index_year:index_year,
                symbol:symbol
            })
            return data
        })
        return constantToReturn
    }

    /**deleteConstantServ
     * Business logic function which initiates the query to delete
     * a constant 
     * @param id the identifier of the constant to delete
     * @returns the deleted constant body
     */
    async deleteConstantServ(id:number){
        const data =  await constantsRepositories.deleteConstantRepo(db,id)
        return data
    }
}

export const constantsService= new ConstantsService()