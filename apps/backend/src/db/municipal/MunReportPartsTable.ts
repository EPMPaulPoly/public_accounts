import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

export interface ReportPartsTable {
    part_id: Generated<number>,
    part_page_def: string
    part_desc: string
}

export type ReportPart = Selectable<ReportPartsTable>
export type NewReportPart = Insertable<ReportPartsTable>
export type ReportPartUpdate = Updateable<ReportPartsTable>