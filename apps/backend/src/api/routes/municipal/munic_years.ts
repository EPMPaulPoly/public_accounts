import { Router } from 'express'
import { createYears, deleteYears, getYears } from '../../controllers/municipal/munic_years.controllers'
import { requireAuth, requireRole } from '../../middleware/auth'

export const MunicYearsRouter=()=>{
    
    console.log('going through years router')
    const router = Router()
    router.get('/',getYears)
    router.post('/',requireAuth,requireRole('admin'),createYears)
    router.delete('/:id',requireAuth,requireRole('admin'),deleteYears)
    return router

}

export default MunicYearsRouter