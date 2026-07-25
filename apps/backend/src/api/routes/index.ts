import { Router } from 'express';
import { MunicYearsRouter } from './municipal/munic_years';
import MunicReportPartsRouter from './municipal/munic_report_parts';
import { createMunicipalRouter } from './municipal';
import { createCommonRouter } from './common';

export const createApiRouter = () => {
    const router = Router();
    console.log('going through order of gov router')
    router.use('/munic',createMunicipalRouter())
    router.use('/common',createCommonRouter())
    /*
        TODO: create provincial and federal public accounts
    */
    return router;
}