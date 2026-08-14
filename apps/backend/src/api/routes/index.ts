import { Router } from 'express'; 
import { createMunicipalRouter } from './municipal/index.js';
import { createCommonRouter } from './common/index.js';

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