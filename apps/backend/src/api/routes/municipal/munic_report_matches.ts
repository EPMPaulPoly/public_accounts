import { Router } from 'express'
import {
     copyMatchesBetweenYearsCont, 
     deleteMatchCont, 
     deleteMatchGridCont, 
     getGridMatchesCont, 
     getMatchesCont, 
     modifyMatchCont, 
     modifyMatchGridCont, 
      newMatchesCont, 
      newMatchesGridCont 
} from '../../controllers/municipal/munic_report_matches.controllers.js'
import { 
    MatchesCopyBetweenYearQuerySchema, 
    MatchesCreateQueryScheme, 
    MatchesDeleteGridQueryScheme, 
    MatchesDeleteQueryScheme, 
    MatchesGridQuerySchema, 
    MatchesQuerySchema, 
    MatchesUpdateQueryScheme 
} from '../../validators/municipal/munic_data_matches.validators.js'
import { validate } from '../../middleware/validate.js'
import { requireAuth, requireRole } from '../../middleware/auth.js'

export const MunicReportMatchesRouter=()=>{

    const router = Router()
    router.get('/',validate(MatchesQuerySchema),getMatchesCont)
    router.get('/grid',validate(MatchesGridQuerySchema),getGridMatchesCont)
    router.post('/',requireAuth,requireRole('admin'),validate(MatchesCreateQueryScheme),newMatchesCont)
    router.post('/grid',requireAuth,requireRole('admin'),validate(MatchesCreateQueryScheme), newMatchesGridCont)
    router.post('/copy-between-years',requireAuth,requireRole('admin'),validate(MatchesCopyBetweenYearQuerySchema),copyMatchesBetweenYearsCont)
    router.put('/',requireAuth,requireRole('admin'),validate(MatchesUpdateQueryScheme),modifyMatchCont)
    router.put('/grid',requireAuth,requireRole('admin'),validate(MatchesUpdateQueryScheme),modifyMatchGridCont)
    router.delete('/grid/:match_id',requireAuth,requireRole('admin'),validate(MatchesDeleteGridQueryScheme),deleteMatchGridCont)
    router.delete('/:match_id',requireAuth,requireRole('admin'),validate(MatchesDeleteQueryScheme),deleteMatchCont)
    return router

}

export default MunicReportMatchesRouter