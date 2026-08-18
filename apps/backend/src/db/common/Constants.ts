import {
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

export interface ConstantsTable {
    const_id: Generated<number>,
    constant_desc: string,
    default_value:number,
    index_year:number
    symbol:string
}


export type Constant = Selectable<ConstantsTable>
export type NewConstant = Insertable<ConstantsTable>
export type ConstantUpdate = Updateable<ConstantsTable>