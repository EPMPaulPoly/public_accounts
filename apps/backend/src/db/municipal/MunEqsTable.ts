import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface EqsTable{
    eq_id:Generated<number>
    eq_expression:string,
    eq_name:string
}

export type Eq = Selectable<EqsTable>
export type NewEq = Insertable<EqsTable>
export type EqUpdate= Updateable<EqsTable>