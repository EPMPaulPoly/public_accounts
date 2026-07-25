import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface MunicipalityTable{
    year_mun_id: Generated<number>
    cod_geo: number,
    nom_organisme:string,
    desi_org:string,
    cod_mrc:string,
    cod_cm: string,
    nom_mrc:string,
    nom_cm:string,
    no_reg:number,
    desc_reg:string,
    type_org:string,
    population:number,
    year:number
}

export type Munic = Selectable<MunicipalityTable>
export type NewMunic = Insertable<MunicipalityTable>
export type MunicUpdate = Updateable<MunicipalityTable>