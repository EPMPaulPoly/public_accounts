import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface YearTable{
    year: number
}


export type Year = Selectable<YearTable>
export type NewYear = Insertable<YearTable>
export type YearUpdate = Updateable<YearTable>