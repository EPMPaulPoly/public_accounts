import { Router } from 'express'
import { validate } from '../../middleware/validate'
import { 
    DeleteEquationScheme,
    DeleteVariableScheme,
    GetEquationResultsSchema,
    GetEquationsSchema, 
    GetEquationVariablesSchema, 
    PostEquationScheme, 
    PostVariableScheme, 
    PutEquationScheme,
    PutVariableScheme
} from '../../validators/municipal/munic_eqs.validators'
import { 
    createEquation, 
    createVariable, 
    deleteEquation, 
    deleteVariable, 
    getEquations, 
    getResults, 
    getVariables, 
    updateEquation, 
    updateVariable
} from '../../controllers/municipal/munic_eqs.controllers'
import { requireAuth, requireRole } from '../../middleware/auth'

const MunicEquationsRouter=()=>{
    console.log('equations router enabled')
    const router = Router()
    router.get('/equation',validate(GetEquationsSchema),getEquations)
    router.get('/variable',validate(GetEquationVariablesSchema),getVariables)
    router.get('/result',validate(GetEquationResultsSchema),getResults)
    router.post('/equation',requireAuth,requireRole('user'),validate(PostEquationScheme),createEquation)
    router.post('/variable',requireAuth,requireRole('user'),validate(PostVariableScheme),createVariable)
    router.put('/equation/:eq_id',requireAuth,requireRole('user'),validate(PutEquationScheme),updateEquation)
    router.put('/variable/:eq_var_id',requireAuth,requireRole('user'),validate(PutVariableScheme),updateVariable)
    router.delete('/equation/:eq_id',requireAuth,requireRole('user'),validate(DeleteEquationScheme),deleteEquation)
    router.delete('/variable/:eq_var_id',requireAuth,requireRole('user'),validate(DeleteVariableScheme),deleteVariable)
    return router

}

export default MunicEquationsRouter