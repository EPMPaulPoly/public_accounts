
export type EquationDef={
    eq_id:number,
    eq_name:string,
    eq_expression:string
}

export type EquationCalcRow=EquationDef&{
    cod_geo:number,
    year:number
}

export type EquationVar={
    eq_var_id:number,
    eq_id:number
    eq_var_symbol:string
    part_id:number,
    row_id:number,
    col_id:number,
}

export type EqVarWDesc=EquationVar&{
    row_desc:string,
    column_desc:string,
    part_desc:string
}

export type EquationVarData=EquationVar&{
    year:number,
    cod_geo:number,
    value:number
}



export type EquationCalcPrecursor=EquationDef&EquationVarData&{
    nom_organisme:string,
    population:number
}

export type EquationCalcFormatted = EquationCalcRow & {
    nom_organisme:string,
    population:number
    cells: EquationVarData[];
    scope: Record<string, number>;
};
export type EquationCalcResult=EquationCalcFormatted&{
    result:number
}