export type FileDBEquivalence={
    db_column:string
    file_column:string
    column_description:string
    mandatory:boolean
    page?:string
}

export type FileDBEquivalenceCSVCoordPoint={
    db_column:string,
    description:string,
    page?:string,
    mandatory:boolean,
    desc_geometrie:ColumnGeometryPoint|ColumnGeometryLine
}

export interface mappingLine{
    type:'Ligne',
    data:string[][]
}
export interface mappingPoint{
    type:'Point'
    data:string[]
}

export type ColumnGeometryPoint={
    type:'Point'
    descriptionXLon:string,
    colonneXLon:string,
    descriptionYLat:string,
    colonneYLat:string
}

export type ColumnGeometryLine={
    type:'Ligne'
    pointDeb:ColumnGeometryPoint,
    pointFin:ColumnGeometryPoint
}

export type EquivalenceCSVCoordPoint={
    db_column:string,
    description:string,
    page?:string,
    mandatory:boolean,
    desc_geometrie:ColumnGeometryPoint|ColumnGeometryLine
}

