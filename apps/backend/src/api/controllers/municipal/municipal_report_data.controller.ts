import { Request, RequestHandler, Response, Router } from 'express'
import { serviceReportMatches } from '../../services/municipal/municipal_report_matches.services'
import { reportDataService } from '../../services/municipal/municipal_report_data.services'
import { addRowLevelEditFlagFields } from '../../../utils/addLevelEditFlagFields'
import { FinSecAssignMin } from '@budgets_municipaux/common/types/accounting.js'

export const getProvIds: RequestHandler = async (req: Request, res: Response, next) => {
    try {
        const {
            year,
            limit,
            offset,
            search_string
        }=req.validated?.query as {
            year:number|undefined,
            limit:number|undefined,
            offset:number|undefined,
            search_string:string|undefined
        }
        const {data,countOut}=await reportDataService.getProvIds(year,limit,offset,search_string)
        res.status(200).json({success:true,data:data,total:countOut})
    } catch (err: any) {
        res.status(500).json({success:false,message:'error retrieving matches'})
    }
}   
/**Basic data get option in order show a grid table
 * 
 * @param req express Request body with additional validated field
 * @param res express response object used to return data
 * @param next catch all for an additional function after just in case
 */
export const getDataGridCont: RequestHandler = async(req:Request,res:Response,next)=>{
    try{
        const{
            cod_geo,
            part_id,
            year
        } = req.validated?.query as {cod_geo:number,part_id:number,year:number}
        const rawArray = await reportDataService.getDataValGridServ(year,cod_geo,part_id)
        res.status(200).json({success:true,data:rawArray})
    }catch(error:any){
        res.status(500).json({success:false,message:'error getting data grid'})
    }
}