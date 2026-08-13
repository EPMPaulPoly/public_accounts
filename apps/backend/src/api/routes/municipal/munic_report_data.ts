import { Router } from 'express'
import { validate } from '../../middleware/validate.js'
import { 
    DataProvIdQuerySchema, 
    GetDataGridScheme 
} from '../../validators/municipal/munic_report_data.validators.js'
import { 
    getDataGridCont, 
    getProvIds 
} from '../../controllers/municipal/municipal_report_data.controller.js'

const MunicReportDataRouter=()=>{

    const router = Router()
    router.get('/prov-ids',validate(DataProvIdQuerySchema),getProvIds)
    router.get('/grid',validate(GetDataGridScheme),getDataGridCont)
    return router

}

export default MunicReportDataRouter