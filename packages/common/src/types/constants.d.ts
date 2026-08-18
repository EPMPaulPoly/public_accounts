export type IndicatorConstant={
    const_id:number,
    constant_desc:string,
    default_value:number,
    index_year:number,
    symbol:string
}

export type IndicatorWUse=IndicatorConstant&{
    use_id?:number,
    eq_id?:number
}