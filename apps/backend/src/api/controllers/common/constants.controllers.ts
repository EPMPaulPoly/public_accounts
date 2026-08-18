import { 
    NextFunction,
    Request,
    Response  
} from "express"
import { constantsService } from "../../services/common/constants.services.js"

class ConstantsController{
    /** getConstants
     * @param req an expanded express request with additional field validated which respects
     * the constants.validators
     * @param res an express reponse which is modified by the controller for output. 
     * @param next the next function to execute
     * @returns void
     */
    getConstants=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {
                const_id,
                eq_id,
                limit,
                offset,
                description_like,
                symbol_like,
                use_id
            }=req.validated?.query as {
                const_id:number, 
                eq_id:number,
                limit:number,
                offset:number,
                description_like:string,
                symbol_like:string,
                use_id:number
            }
            const {data,count} = await constantsService.getConstantsServ({eq_id:eq_id,const_id:const_id,limit:limit,offset:offset,description_like:description_like,symbol_like:symbol_like,use_id:use_id})
            res.status(200).json({success:true,data:data,total:count})
        }catch(error:any){
            res.status(500).json({success:false,message:"Error retrieving the data for the constants"})
        }
    }
    /** createConstants
     * @param req an expanded express request with additional field validated which respects
     * the constants.validators
     * @param res an express reponse which is modified by the controller for output. 
     * @param next the next function to execute
     * @returns void
     */
    createConstants=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {
                constant_desc,
                index_year,
                default_value,
                symbol
            }=req.validated?.body as {
                constant_desc:string,
                index_year:number,
                default_value:number,
                symbol:string
            }
            const newConstant = await constantsService.createConstantServ({constant_desc,default_value,index_year,symbol})
            res.status(200).json({success:true,data:newConstant})
        }catch(err:any){
            res.status(500).json({success:false,message:'Error on creating a new constant'})
        }
    }
    /**updateContants
     * Updates the constants previoulsy defined with new values
     * @param req an expanded express request with an additional field called validated 
     * whose values were validated based on common/constants.validators
     * @param res an express response containing the deleted data
     * @param next the next function in the express stack
     */
    updateConstants=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {
                constant_desc,
                index_year,
                default_value,
                symbol
            }=req.validated?.body as {
                constant_desc:string,
                index_year:number,
                default_value:number,
                symbol:string
            }
            const {id}=req.validated?.params as {id:number}
            const data = await constantsService.updateConstantServ(
                {
                    const_id:id,
                    constant_desc:constant_desc,
                    default_value:default_value,
                    index_year:index_year,
                    symbol:symbol
                }
            )
            res.status(200).json({success:true, data:data})
        }catch(error:any){
            res.status(500).json({success:false,message:'Error on updating constant'})
        }
    }

    /**deleteConstants
     * handles the express request to delete a constant
     * @param req an expanded express request with an additional field called validated 
     * whose values were validated based on common/constants.validators
     * @param res an express response containing the deleted data
     * @param next the next function in the express stack
     */
    deleteConstants=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {id}=req.validated?.params as {id:number}
            const data = await constantsService.deleteConstantServ(id)
            res.status(200).json({success:true,data:data})
        } catch (error:any) {
            res.status(500).json({success:false,message:`Error during creation: ${error.message}`})
        }
    }

}

export const constantsController = new ConstantsController()