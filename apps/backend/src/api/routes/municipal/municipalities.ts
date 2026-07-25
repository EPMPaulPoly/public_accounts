import { Router } from "express"
import { getMunicipality, getRegions } from "../../controllers/municipal/municipalities.controllers"


export const MunicipalitiesRouter=()=>{

    const router = Router()
    router.get('/',getMunicipality)
    router.get('/reg-opt',getRegions)
    return router

}

export default MunicipalitiesRouter