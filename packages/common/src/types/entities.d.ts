export type municipalite={
    nom_organisme:string,
    cod_geo:number
    year?:number
    desi_org?:string
    cod_mrc?:string
    cod_cm?:string
    nom_mrc?:string
    nom_cm?:string
    no_reg?:number
    desc_reg?:string
    population?:number
}

export type city_year_combo={
    munic:municipalite|null,
    year:number|null
}

export type year={
    year:number
}

export type regions={
    reg_name:string,
    reg_code:string|number
    reg_type:'mrc'|'reg'|'cm'|'aucun'
}