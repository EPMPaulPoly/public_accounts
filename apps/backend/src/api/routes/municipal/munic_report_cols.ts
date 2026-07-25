import { Router } from 'express'
import { 
    changeDesc, 
    deleteReportCol, 
    getReportCols, 
    moveCol, 
    newCol, 
    upsertReportCols 
} from '../../controllers/municipal/munic_report_cols.controllers'
import { validate } from '../../middleware/validate'
import { 
    ReportColsChangeDescSchema, 
    ReportColsMoveSchema, 
    ReportColsQuerySchema, 
    ReportColsUpsertSchema,
    ReportDeleteColSchema,
    ReportNewColSchema, 
 } from '../../validators/municipal/munic_report_cols.validators'
import { requireAuth, requireRole } from '../../middleware/auth'

export const MunicReportColsRouter=()=>{


    const router = Router()
    router.get('/',validate(ReportColsQuerySchema),getReportCols)
    router.post('/',requireAuth,requireRole('admin'),validate(ReportColsUpsertSchema),upsertReportCols)
    router.delete('/:col_id',requireAuth,requireRole('admin'),validate(ReportDeleteColSchema),deleteReportCol)
    router.patch("/move",requireAuth,requireRole('admin'),validate(ReportColsMoveSchema),moveCol)
    router.post('/new-col',requireAuth,requireRole('admin'),validate(ReportNewColSchema),newCol)
    router.patch('/change-desc',requireAuth,requireRole('admin'),validate(ReportColsChangeDescSchema),changeDesc)
    return router

}

export default MunicReportColsRouter