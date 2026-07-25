import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface PartColumnsTable{
    col_id:Generated<number>,
    part_id:number,
    column_desc:string,
    column_order:number
}

export type PartColumn = Selectable<PartColumnsTable>
export type NewPartColumn= Insertable<PartColumnsTable>
export type PartColumnUpdate=Updateable<PartColumnsTable>