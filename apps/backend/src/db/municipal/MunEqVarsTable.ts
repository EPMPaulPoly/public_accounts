import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface EqVarsTable{
    eq_var_id:Generated<number>
    part_id:number,
    row_id:number,
    col_id:number,
    eq_id:number,
    eq_var_symbol:string
}

export type EqVar = Selectable<EqVarsTable>
export type NewEqVar = Insertable<EqVarsTable>
export type EqVarUpdate= Updateable<EqVarsTable>