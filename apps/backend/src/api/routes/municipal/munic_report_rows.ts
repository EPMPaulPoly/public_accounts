import { Router } from 'express'
import { 
    changeDesc, 
    changeParent, 
    deleteReportRow, 
    getReportRows, 
    move,
    newRow, 
    upsertReportRows 
} from '../../controllers/municipal/munic_report_rows.controllers'
import { validate } from '../../middleware/validate'
import { 
    ReportRowsChangeDescSchema, 
    ReportRowsChangeParentSchema, 
    ReportRowsDeleteRowSchema, 
    ReportRowsMoveSchema, 
    ReportNewRowSchema, 
    ReportRowsQuerySchema, 
    ReportRowsUpsertSchema 
} from '../../validators/municipal/munic_report_rows.validators'
import { requireAuth, requireRole } from '../../middleware/auth'

export const MunicReportRowsRouter=()=>{
    const router = Router()
    console.log('going through report rows')
    router.get('/',validate(ReportRowsQuerySchema),getReportRows)
    router.post('/',requireAuth,requireRole('admin'),validate(ReportRowsUpsertSchema),upsertReportRows)
    router.delete('/:row_id',requireAuth,requireRole('admin'),validate(ReportRowsDeleteRowSchema),deleteReportRow)
    router.patch("/move",requireAuth,requireRole('admin'),validate(ReportRowsMoveSchema),move)
    router.post('/new-row',requireAuth,requireRole('admin'),validate(ReportNewRowSchema),newRow)
    router.patch('/change-desc',requireAuth,requireRole('admin'),validate(ReportRowsChangeDescSchema),changeDesc)
    router.patch('/change-parent',requireAuth,requireRole('admin'),validate(ReportRowsChangeParentSchema),changeParent)
    return router

}

export default MunicReportRowsRouter