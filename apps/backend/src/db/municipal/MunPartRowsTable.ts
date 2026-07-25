import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface PartRowsTable{
    row_id:Generated<number>
    part_id:number,
    row_desc:string,
    parent_id:number|null,
    item_order:number
}

export type PartRow = Selectable<PartRowsTable>
export type NewPartRow = Insertable<PartRowsTable>
export type PartRowUpdate = Updateable<PartRowsTable>
