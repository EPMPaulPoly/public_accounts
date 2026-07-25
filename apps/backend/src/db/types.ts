import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

import { YearTable } from './municipal/MunYearTable'
import { MunicipalityTable } from './municipal/MunicipalityTable'
import { ReportPartsTable } from './municipal/MunReportPartsTable'
import { PartRowsTable } from './municipal/MunPartRowsTable'
import { PartColumnsTable } from './municipal/MunPartColumnsTable'
import { PartRowColDataMatchTable } from './municipal/MunPartRowColumnDataMatch'
import { DataTable } from './municipal/MunDataTable'
import { EqsTable } from './municipal/MunEqsTable'
import { EqVarsTable } from './municipal/MunEqVarsTable'
export * from './municipal/MunYearTable'
export * from './municipal/MunicipalityTable'
export * from './municipal/MunReportPartsTable'
export * from './municipal/MunReportPartsTable'
export * from './municipal/MunPartColumnsTable'
export * from './municipal/MunPartRowColumnDataMatch'
export * from './municipal/MunDataTable'
export * from './municipal/MunEqsTable'
export * from './municipal/MunEqVarsTable'

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




