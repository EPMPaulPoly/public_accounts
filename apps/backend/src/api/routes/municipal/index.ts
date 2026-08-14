import { Router } from 'express';
import { MunicYearsRouter } from './munic_years.js';
import MunicReportPartsRouter from './munic_report_parts.js';
import MunicipalitiesRouter from './municipalities.js';
import MunicReportRowsRouter from './munic_report_rows.js';
import MunicReportColsRouter from './munic_report_cols.js';
import MunicReportMatchesRouter from './munic_report_matches.js';
import MunicReportDataRouter from './munic_report_data.js';
import MunicEquationsRouter from './munic_eqs.js';

export const createMunicipalRouter = () => {
    const router = Router();
    console.log('going through municipal router')
    router.use('/years',MunicYearsRouter())
    router.use('/report_parts',MunicReportPartsRouter())
    router.use('/munic',MunicipalitiesRouter())
    router.use('/report_rows',MunicReportRowsRouter())
    router.use("/report_cols",MunicReportColsRouter())
    router.use('/matches',MunicReportMatchesRouter())
    router.use('/data',MunicReportDataRouter())
    router.use('/indicators',MunicEquationsRouter())
    return router;
}