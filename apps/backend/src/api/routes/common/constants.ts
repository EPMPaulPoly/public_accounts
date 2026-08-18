import { Router } from "express"
import { validate } from "../../middleware/validate.js"
import { 
    ConstIdParamSchema,
    GetConstSchema, 
    NewConstSchema, 
    UpdateConstSchema
} from "../../validators/common/constants.validators.js"
import { constantsController } from "../../controllers/common/constants.controllers.js"
import { requireAuth, requireRole } from "../../middleware/auth.js"

export const creationRouteurConstantesConstruction=()=>{
    const router = Router()
    
    router.get('',validate(GetConstSchema),constantsController.getConstants)
    router.post('',requireAuth,requireRole('user'),validate(NewConstSchema),constantsController.createConstants)
    router.put('/:id',requireAuth,requireRole('user'),validate(UpdateConstSchema),constantsController.updateConstants) 
    router.delete('/:id',requireAuth,requireRole('user'),validate(ConstIdParamSchema),constantsController.deleteConstants)
    return router
}