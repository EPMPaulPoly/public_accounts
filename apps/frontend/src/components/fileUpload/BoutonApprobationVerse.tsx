import { Button } from "@mui/material"
import { type Dispatch, type SetStateAction } from "react"
import type { 
    EquivalenceCSVCoordPoint, 
    FileDBEquivalence, 
    mappingLine, 
    mappingPoint 
} from "@budgets_municipaux/common"
import { useAppContext } from "../../context/contextProvider" 

interface PropsBoutApprobVersement{
    modalOuvert: boolean,
    defModalOuvert:Dispatch<SetStateAction<boolean>>,
    champsARemplir: FileDBEquivalence[]
    champsGeomARemplir?: EquivalenceCSVCoordPoint[],
    idFichier:string,
    table:string,
    annee:number|null,
    serviceMAJ:(
        fileID:string,
        regularMapping:Record<string,string>,
        table:string,
        annee_maj:number,
        mappingCarto?:Record<string,mappingLine|mappingPoint>
    )=>Promise<{
        success:boolean,
        data:number
    }>
}

function BoutonApprobationVerse(props:PropsBoutApprobVersement){
    const {setSnackMessage,setSnackOpen,setSnackSev,snackSev,snackOpen,snackMessage}=useAppContext()
    const handleFileInsert=async ()=>{
        try{
            const regularMapping = Object.values(props.champsARemplir)
            .filter(entree=>entree.mandatory ||entree.file_column!=='')
            .reduce((accumulator,entree)=>{
                accumulator[entree.db_column] = entree.file_column;
                return accumulator
            },{} as Record<string,string>)
            let cartoMapping
            let response
            if (props.annee === null){
                throw new Error('Annee doit être mise en place')
            }
            if (props.champsGeomARemplir){
                cartoMapping = Object.values(props.champsGeomARemplir)
                .filter(entree=>entree.mandatory ||
                    (
                        entree.desc_geometrie.type==='Point' && 
                        entree.desc_geometrie.colonneXLon!==''&& 
                        entree.desc_geometrie.colonneYLat!==''
                    )||
                    (
                        entree.desc_geometrie.type==='Ligne' && 
                        entree.desc_geometrie.pointDeb.colonneXLon!==''&& 
                        entree.desc_geometrie.pointDeb.colonneYLat!==''&&
                        entree.desc_geometrie.pointFin.colonneXLon!==''&&
                        entree.desc_geometrie.pointFin.colonneYLat!==''
                    )
                )
                .reduce((accumulator,entree)=>{
                    if(entree.desc_geometrie.type==='Ligne'){
                        accumulator[entree.db_column]={
                            type:'Ligne',
                            data:[
                                [   entree.desc_geometrie.pointDeb.colonneXLon,
                                    entree.desc_geometrie.pointDeb.colonneYLat
                                ],[
                                    entree.desc_geometrie.pointFin.colonneXLon,
                                    entree.desc_geometrie.pointFin.colonneYLat
                                ]
                            ]
                        }
                    }else{
                        accumulator[entree.db_column]={
                            type:'Point',
                            data:[   
                                    entree.desc_geometrie.colonneXLon,
                                    entree.desc_geometrie.colonneYLat
                                ]
                            }
                    }
                    return accumulator
                },{} as Record<string,any>)

                response = await props.serviceMAJ(props.idFichier,regularMapping,props.table,props.annee,cartoMapping)
                if (response.success=== true){
                    setSnackMessage(`Inséré ${response.data}`)
                    setSnackSev('success')
                    setSnackOpen(true)
                    props.defModalOuvert(false)
                } else{
                    setSnackMessage(`Erreur inconnue`)
                    setSnackSev('error')
                    setSnackOpen(true)
                }

            }else{
                response = await props.serviceMAJ(props.idFichier,regularMapping,props.table,props.annee)
                if (response.success=== true){
                    setSnackMessage(`Inséré ${response.data}`)
                    setSnackSev('success')
                    setSnackOpen(true)
                    props.defModalOuvert(false)
                } else{
                    setSnackMessage(`Erreur inconnue`)
                    setSnackSev('error')
                    setSnackOpen(true)
                }
            }

        } catch(err:any){
            setSnackMessage('Erreur Versement')
            setSnackSev('error')
            setSnackOpen(true)
        }
    }
    const lineGeomCheck =(entree:EquivalenceCSVCoordPoint):boolean=>{
        if (entree.desc_geometrie.type==='Ligne'){
            if(entree.desc_geometrie.pointDeb.colonneXLon!==''&&
                entree.desc_geometrie.pointDeb.colonneYLat!==''&&
                entree.desc_geometrie.pointFin.colonneXLon!==''&&
                entree.desc_geometrie.pointFin.colonneYLat!==''
            ){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
    const pointGeomCheck = (entree:EquivalenceCSVCoordPoint):boolean=>{
        if(entree.desc_geometrie.type==='Point'){
            if(
                entree.desc_geometrie.type==='Point' && 
                entree.desc_geometrie.colonneXLon!==''&&
                entree.desc_geometrie.colonneYLat!==''
            ){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
    const mandatoryCheck = (entree:EquivalenceCSVCoordPoint|FileDBEquivalence):boolean=>{
        if(entree.mandatory===false){
            return true
        }else{
            return false
        }
    }

    const geomNotPresentCheck=(entree:EquivalenceCSVCoordPoint[]|undefined):boolean=>{
        if (entree === undefined){
            return true
        }else{
            return false
        }
    }

    const basicPropsCheck = (entree:FileDBEquivalence[]):boolean=>{
        if (props.champsARemplir.every(val => 
                    val.file_column !== ''||mandatoryCheck(val) // vérifie que tous les champs obligatoires sont remplis
                ) 
            ){
                return true
            }else{return false}
    }
    const geomPropsCheck = (entree:EquivalenceCSVCoordPoint[]|undefined):boolean=>{
            if (props.champsGeomARemplir){
                if (props.champsGeomARemplir.every(val=> (
                    (// si c'est un ligne je veux toutes les valeurs rentrées
                        lineGeomCheck(val)
                    )||(// si c'est un point je veux que toutes les valeurs soient rentrées
                        pointGeomCheck(val)
                    )||(// sauf si c'est pas obligatoire
                        mandatoryCheck(val)
                    )
                ))){
                    return true
                } else{
                    return false
                }
            }else{
                return true
            }
        }
    
    const overallCheck = ():boolean=>{
        if (basicPropsCheck(props.champsARemplir) && geomPropsCheck(props.champsGeomARemplir)){
        return true
        }else{return false}
    }
    return(<>
        { 
            overallCheck()&&// si toutes les conditions sont remplis (présence de données pour la géométrie et tout le reste)
            <Button variant="outlined" onClick={handleFileInsert}>Importer le fichier dans la BD</Button>
        }
    </>)
}

export default BoutonApprobationVerse