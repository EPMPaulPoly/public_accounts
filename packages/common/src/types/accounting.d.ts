export type ProfitAndLossStatement={
    revenues:Revenue[],
    expenses:Expense[]
}

export type Revenue={
    id:string,
    description:string,
    value:number
    components?:Revenue[]
}

export type Expense={
    id:string,
    description:string,
    value:number
    components?:Expense[]
}

export type FinancialAsset={
    id:string,
    description:string,
    value:number
    components?:Expense[]
}

export type FinancialLiability={
    id:string,
    description:string,
    value:number
    components?:Expense[]
}

export type NonFinancialAsset={
    id:string,
    description:string,
    value:number
    components?:Expense[]
}

export type AccumulatedDeficit={
    id:string,
    description:string
    value:number
    components?:Expense[]
}

export type BalanceSheet={
    fin_assets:FinancialAsset[],
    fin_liab:FinancialLiability[],
    non_fin_assets:NonFinancialAsset[],
    acc_defic:AccumulatedDeficit[]
}

export type ExpenseAnalysis={
    expenses:Expense[]
}

export type FinStateSection={
    part_id:number,
    part_page_def:string,
    part_desc:string
}

export type FinStateSectionRowMin={
    row_id:number,
    part_id:number,
    row_desc:string,
    item_order:number
}

export type FinStateSectionRow=FinStateSectionRowMin&{
    parent_id:number|null,
}

export type FinStateSectionCol={
    col_id:number,
    part_id:number,
    column_desc:string,
    column_order:number
}

export type FinStateSectionRowLO = FinStateSectionRow&{
    level:number
}

export type FinStateSecRowLev=FinStateSectionRowLO&{
    edit_flag:boolean
}
 

export type FinStateSecRowSibs=FinStateSecRowLev&{
    end_block:number|undefined
    next_sib:number|undefined
    prev_sib:number|undefined
}
export type FinStateSecRowWHelp=FinStateSecRowTreeEnd&{
    can_move_up:boolean
    can_move_down:boolean
}

export type FinStateSecColLev=FinStateSectionCol&{
    edit_flag:boolean
    level:number
}
export type FinStateSecColSibs=FinStateSecColLev&{
    end_block:number|undefined
    next_sib:number|undefined
    prev_sib:number|undefined
}

export type FinStateSecColWHelp=FinStateSecColTreeEnd&{
    can_move_left:boolean
    can_move_right:boolean
}

export type FinSecAssignMin={
    year:number,
    parent_id:number
    match_id:number,
    part_id:number,
    row_id:number,
    col_id:number,
}

export type FinStateSecAssign=FinSecAssignMin&ProvincialDataId

export type FinStateSecAssignDisp=FinStateSecAssign&{
    column_desc:string
}

export type FinStateSecAssignWOrder=FinStateSecAssign&{
    item_order:number,
    column_order:number
}

export type FinStateSecAssignWDesc=FinStateSecAssignWOrder&{
    column_desc:number,
    row_desc:number
}
export type FinStateSecAssignWLev=FinStateSecAssignWDesc&{
    level:number
}

export type FinStateSecAssignWSibs=FinStateSecAssignWLev&{
    end_block:number|undefined
    next_sib:number|undefined
    prev_sib:number|undefined
}


export type FinStateAssignGrid=FinStateSecRowSibs&{
    cells:FinStateSecAssignDisp[]
}

export type FinStateSecValueWithDesc=FinStateSecAssignWDesc&{
    cod_geo:number
    value:number,
    value_text:string
}

export type FinStateSecValueWLev = FinStateSecValueWithDesc&{
    level:number
}

export type FinStateSecValueSibs = FinStateSecValueWLev&{
    end_block:number|undefined
    next_sib:number|undefined
    prev_sib:number|undefined
}

export type FinStateSecValueDisp=FinStateSecAssignDisp&{
    value:number,
    value_text:string
}


export type FinStateValueGrid=FinStateSecRowSibs&{
    cells:FinStateSecValueWithDesc[]
}

export type pageYearCombo={
    year:number,
    part_id:number
}

export type ProvincialDataId={
    prov_rep_id:string|null
}