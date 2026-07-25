import { useState, type Dispatch, type SetStateAction } from "react"
import { Divider,  } from "@mui/material"
import ColumnDropDownListLine from "./ColumnDropDownListLine"
import ColumnDropDownListPoint from "./ColumnDropDownListPoint"
import type { EquivalenceCSVCoordPoint } from "@budgets_municipaux/common"

interface PropsGeomColumnsDropDown{
    colonnesFichier:string[],
    defColonnesFichier:Dispatch<SetStateAction<string[]>>
    champsgeomARemplir: EquivalenceCSVCoordPoint[]
    defChampsGeomARemplir:Dispatch<SetStateAction<EquivalenceCSVCoordPoint[]>>,
    pageAct:string
}

function ColumnDropDownListGeom(props:PropsGeomColumnsDropDown){
    
    return(<>
        {props.colonnesFichier.length > 0 && <>
        {
            props.champsgeomARemplir.map((champs) => {
                if(champs.page!== undefined  && String(champs.page) ===props.pageAct ){
                    if(champs.desc_geometrie.type ==='Ligne'){
                        return(
                            <>
                                <ColumnDropDownListLine
                                    geometrieActuelle={champs}
                                    colonnesFichier={props.colonnesFichier}
                                    defColonnesFichier={props.defColonnesFichier}
                                    champsGeomARemplir={props.champsgeomARemplir}
                                    defChampsGeomARemplir={props.defChampsGeomARemplir}
                                    pageAct={props.pageAct}
                                />
                            </>
                        )
                    }else if(champs.desc_geometrie.type ==='Point'){
                        return(
                            <>
                                <ColumnDropDownListPoint
                                    geometrieActuelle={champs}
                                    colonnesFichier={props.colonnesFichier}
                                    defColonnesFichier={props.defColonnesFichier}
                                    champsGeomARemplir={props.champsgeomARemplir}
                                    defChampsGeomARemplir={props.defChampsGeomARemplir}
                                    pageAct={props.pageAct}
                                />
                            </>
                        )
                    }else{
                        return(<></>)
                    }
                } else{
                    return (<></>)
                }
            })
        }
        
        <Divider variant="middle" sx={{borderColor:'white'}} />
        </>
        }
    </>)
}

export default ColumnDropDownListGeom