import { Router } from 'express'
import { MatchesGridQuerySchema, MatchesQuerySchema } from '../../validators/municipal/munic_data_matches.validators'
import { validate } from '../../middleware/validate'
import { DataProvIdQuerySchema, GetDataGridScheme } from '../../validators/municipal/munic_report_data.validators'
import { getDataGridCont, getProvIds } from '../../controllers/municipal/municipal_report_data.controller'
import { requireAuth, requireRole } from '../../middleware/auth'

const MunicReportDataRouter=()=>{

    const router = Router()
    router.get('/prov-ids',validate(DataProvIdQuerySchema),getProvIds)
    router.get('/grid',validate(GetDataGridScheme),getDataGridCont)
    return router

}

export default MunicReportDataRouter