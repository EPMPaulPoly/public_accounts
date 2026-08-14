

import { YearTable } from './municipal/MunYearTable.js'
import { MunicipalityTable } from './municipal/MunicipalityTable.js'
import { ReportPartsTable } from './municipal/MunReportPartsTable.js'
import { PartRowsTable } from './municipal/MunPartRowsTable.js'
import { PartColumnsTable } from './municipal/MunPartColumnsTable.js'
import { PartRowColDataMatchTable } from './municipal/MunPartRowColumnDataMatch.js'
import { DataTable } from './municipal/MunDataTable.js'
import { EqsTable } from './municipal/MunEqsTable.js'
import { EqVarsTable } from './municipal/MunEqVarsTable.js'
export * from './municipal/MunYearTable.js'
export * from './municipal/MunicipalityTable.js'
export * from './municipal/MunReportPartsTable.js'
export * from './municipal/MunReportPartsTable.js'
export * from './municipal/MunPartColumnsTable.js'
export * from './municipal/MunPartRowColumnDataMatch.js'
export * from './municipal/MunDataTable.js'
export * from './municipal/MunEqsTable.js'
export * from './municipal/MunEqVarsTable.js'

export interface Database{
    'municipal_qc.year_table': YearTable,
    'municipal_qc.municipalities': MunicipalityTable,
    'municipal_qc.report_parts': ReportPartsTable,
    'municipal_qc.rows_table':PartRowsTable
    'municipal_qc.columns_table':PartColumnsTable
    'municipal_qc.match':PartRowColDataMatchTable
    'municipal_qc.data':DataTable
    'municipal_qc.eqs_table':EqsTable
    'municipal_qc.eq_vars_table':EqVarsTable
}




