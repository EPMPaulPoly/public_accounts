import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface DataTable{
    data_id:Generated<number>
    prov_rep_id:string,
    year:number,
    cod_geo:number,
    value:number|null
}

export type Data = Selectable<DataTable>
export type NewData = Insertable<DataTable>
export type DataUpdate= Updateable<DataTable>