import { Request, RequestHandler, Response, Router } from 'express'
import { serviceReportMatches } from '../../services/municipal/municipal_report_matches.services'

export const getMatchesCont: RequestHandler = async (req: Request, res: Response, next) => {
    try {
        const {
            part_id,
            row_id,
            col_id,
            prov_rep_id,
            year
        }=req.validated?.query as {part_id:number|undefined,
            row_id:number|undefined,
            col_id:number|undefined,
            prov_rep_id:string|undefined,
            year:number|undefined}
        const data=await serviceReportMatches.getMatches({part_id:part_id,row_id:row_id,col_id:col_id,prov_rep_id:prov_rep_id,year:year})
        res.status(200).json({success:true,data:data})
        return next()
    } catch (err: any) {
        res.status(500).json({success:false,message:'error retrieving matches'})
    }
}   
export const getGridMatchesCont: RequestHandler = async (req: Request, res: Response, next) => {
    try {
        const {
            part_id,
            year
        }=req.validated?.query as {part_id:number,
            year:number}
        const data=await serviceReportMatches.getGridMatchesQuery({part_id:part_id,year:year})
        res.status(200).json({success:true,data:data})
        return next()
    } catch (err: any) {
        res.status(500).json({success:false,message:'error retrieving matches'})
    }
}
export const  newMatchesGridCont: RequestHandler = async (req: Request, res: Response,next) => {
    try {
        const {
            part_id,
            year,
            row_id,
            col_id,
            prov_rep_id
        }=req.validated?.body as {part_id:number,
            year:number,row_id:number,col_id:number,prov_rep_id:string}
        const data= await serviceReportMatches.createMatchGridReturn(part_id,row_id,col_id,year,prov_rep_id)
        res.status(200).json({success:true,data:data})
        return next()
    } catch (err: any) {
        res.status(500).json({success:false,message:'Issue occured when creating new match or building grid'})
    }
}
export const  newMatchesCont: RequestHandler = async (req: Request, res: Response,next) => {
    try {
        const {
            part_id,
            year,
            row_id,
            col_id, 
            prov_rep_id
        }=req.validated?.body as {part_id:number,
            year:number,row_id:number,col_id:number,prov_rep_id:string}
        const data= await serviceReportMatches.createMatch(part_id,row_id,col_id,year,prov_rep_id)
        res.status(200).json({success:true,data:data})
    } catch (err: any) {
        res.status(500).json({success:false,message:'Issue occured when creating new match or building grid'})
    }
}

export const modifyMatchGridCont: RequestHandler = async (req: Request, res: Response,next) => {
    try {
        const {
            match_id,
            part_id,
            year,
            row_id,
            col_id,
            prov_rep_id
        }=req.validated?.body as {match_id:number,part_id:number,
            year:number,row_id:number,col_id:number,prov_rep_id:string}
        const data= await serviceReportMatches.updateMatchGridReturn(match_id,part_id,row_id,col_id,year,prov_rep_id)
        res.status(200).json({success:true,data:data})
        return next()
    } catch (err: any) {
        res.status(500).json({success:false,message:'Issue occured when creating new match or building grid'})
    }
}
export const modifyMatchCont: RequestHandler = async (req: Request, res: Response,next) => {
    try {
        const {
            match_id,
            part_id,
            year,
            row_id,
            col_id,
            prov_rep_id
        }=req.validated?.query as {match_id:number,part_id:number,
            year:number,row_id:number,col_id:number,prov_rep_id:string}
        const data= await serviceReportMatches.updateMatchGridReturn(match_id,part_id,row_id,col_id,year,prov_rep_id)
        res.status(200).json({success:true,data:data})
        return next()
    } catch (err: any) {
        res.status(500).json({success:false,message:'Issue occured when creating new match or building grid'})
    }
}

export const deleteMatchGridCont: RequestHandler = async (req: Request, res: Response,next) => {
    try {
        const {
            match_id
        }=req.validated?.params as {match_id:number}
        const {
            year,
            part_id
        }=req.validated?.query as {year:number,part_id:number}
        const data= await serviceReportMatches.deleteMatchGridReturn(match_id,part_id,year)
        res.status(200).json({success:true,data:data})
        return next()
    } catch (err: any) {
        res.status(500).json({success:false,message:'Issue occured when creating new match or building grid'})
    }
}

export const deleteMatchCont: RequestHandler = async (req: Request, res: Response,next) => {
    try {
        const {
            match_id
        }=req.validated?.params as {match_id:number}
        const {
            year,
            part_id
        }=req.validated?.query as {year:number,part_id:number}
        const data= await serviceReportMatches.deleteMatch(match_id)
        res.status(200).json({success:true,data:data})
        return next()
    } catch (err: any) {
        res.status(500).json({success:false,message:'Issue occured when deleting new match'})
    }
}

export const copyMatchesBetweenYearsCont: RequestHandler = async (req: Request, res: Response,next) => {
    try {
        const {
            year_to_copy,
            year_to_seed
        }=req.validated?.query as {year_to_copy:number,year_to_seed:number}
        const data= await serviceReportMatches.copyDataFromToService(year_to_copy,year_to_seed)
        res.status(200).json({success:true})
        return next()
    } catch (err: any) {
        res.status(500).json({success:false,message:'Issue occured when deleting new match'})
    }
}


