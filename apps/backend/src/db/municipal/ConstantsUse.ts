

import {
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

export interface ConstantsUseTable {
    use_id: Generated<number>,
    eq_id: number,
    const_id: number
}


export type ConstantUse = Selectable<ConstantsUseTable>
export type NewConstantUse = Insertable<ConstantsUseTable>
export type ConstantUseUpdate = Updateable<ConstantsUseTable>