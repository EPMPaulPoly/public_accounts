import { Router } from 'express';
import { MunicYearsRouter } from './munic_years';
import MunicReportPartsRouter from './munic_report_parts';
import MunicipalitiesRouter from './municipalities';
import MunicReportRowsRouter from './munic_report_rows';
import MunicReportColsRouter from './munic_report_cols';
import MunicReportMatchesRouter from './munic_report_matches';
import MunicReportDataRouter from './munic_report_data';
import MunicEquationsRouter from './munic_eqs';

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