import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface PartRowColDataMatchTable{
    match_id:Generated<number>
    part_id:number,
    row_id:number,
    col_id:number,
    prov_rep_id:string|null,
    year:number
}

export type PartRowColDataMatch = Selectable<PartRowColDataMatchTable>
export type NewPartRowColDataMatch = Insertable<PartRowColDataMatchTable>
export type PartRowColDataMatchUpd = Updateable<PartRowColDataMatchTable>