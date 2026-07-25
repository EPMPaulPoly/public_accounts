import { Router } from 'express'
import { createReportPart, deleteReportParts, getReportParts, modifyReportPart } from '../../controllers/municipal/munic_report_parts.controllers'
import { ReportPartCreateSchema, ReportPartDeleteSchema, ReportPartModifySchema, ReportPartQuerySchema } from '../../validators/municipal/munic_report_parts.validators'
import { validate } from '../../middleware/validate'
import { requireAuth, requireRole } from '../../middleware/auth'

export const MunicReportPartsRouter=()=>{

    const router = Router()
    router.get('/',validate(ReportPartQuerySchema), getReportParts)
    router.post('/',requireAuth,requireRole('admin'),validate(ReportPartCreateSchema),createReportPart)
    router.delete('/:part_id',requireAuth,requireRole('admin'),validate(ReportPartDeleteSchema),deleteReportParts)
    router.put('/:part_id',requireAuth,requireRole('admin'),validate(ReportPartModifySchema),modifyReportPart)
    return router

}

export default MunicReportPartsRouter