import { type backend_response, type FinStateSection, type FinStateValueGrid, type municipalite, type regions } from "@budgets_municipaux/common"
import { Button, FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { serviceMunicEnt } from "../../services/mun/serviceMunicEntites"
import { useAppContext } from "../../context/contextProvider"
import { serviceReportData } from "../../services/mun/serviceData"
interface props{
    municipalities:municipalite[]
    setMunicipalities:Dispatch<SetStateAction<municipalite[]>>
    rowsPerPage?:number,
    page?:number
    setTotalCount?:Dispatch<SetStateAction<number>>
    admLev:'aucun'|'mrc'|'reg'|'cm'
    setAdmLev:Dispatch<SetStateAction<'aucun'|'mrc'|'reg'|'cm'>>
    regionOptions:regions[]
    setRegionOptions:Dispatch<SetStateAction<regions[]>>
    subRegion:regions|null
    setSubRegion: Dispatch<SetStateAction<regions|null>>
    setPage?:Dispatch<SetStateAction<number>>
    munList?:boolean
    reportPart?:FinStateSection|null
    valGrid?:FinStateValueGrid[]
    setValGrid?:Dispatch<SetStateAction<FinStateValueGrid[]>>
}


export function SelectionMunicipalites(props:props){
    
    const{year,municipality,setMunicipality,setSnackMessage,setSnackSev,setSnackOpen} = useAppContext()
    useEffect(()=>{
        const fetchData = async()=>{
            if ((props.admLev==='cm'||props.admLev==='mrc'||props.admLev==='reg')&&(year!==null)){

                const data= await serviceMunicEnt.getRegionOptions({region_type:props.admLev,year:year})
                if (data.success===true&& data.data!==undefined){
                    props.setRegionOptions(data.data)
                    props.setSubRegion(null)
                    if (props.setPage){
                        props.setPage(0)
                    }
                }else{
                    setSnackMessage('erreur en récupérant régions')
                    setSnackSev('error')
                    setSnackOpen(true)
                }
            }
        }
        fetchData()
    },[year])

    async function handleChangeRegionType(newVal:'aucun'|'mrc'|'reg'|'cm'){
        props.setAdmLev(newVal)
        if ((newVal==='cm'||newVal==='mrc'||newVal==='reg')&&(year!==null)){

            const data= await serviceMunicEnt.getRegionOptions({region_type:newVal,year:year})
            if (data.success===true&& data.data){
                props.setRegionOptions(data.data)
                props.setSubRegion(null)
            }else{
                setSnackMessage('erreur en récupérant régions')
                setSnackSev('error')
                setSnackOpen(true)
            }


        }
    }

    async function handleChangeRegion(newVal:string){
        const newSub = props.regionOptions.find((reg)=> reg.reg_code===newVal)
        if (newSub && props.admLev!=='aucun'){
            props.setSubRegion(newSub)
            let municipalitiesIn:backend_response<municipalite[]>
            if (props.page&&props.rowsPerPage){
                municipalitiesIn = await serviceMunicEnt.getMunic(
                    {
                        region_type:props.admLev,
                        region_id:newVal,
                        year:year,
                        limit:props.rowsPerPage,
                        offset:props.page *props.rowsPerPage
                    })
            }else{
                    municipalitiesIn = await serviceMunicEnt.getMunic(
                {
                    region_type:props.admLev,
                    region_id:newVal,
                    year:year,
                })
            }
            if (municipalitiesIn.success===true && municipalitiesIn.data){
                props.setMunicipalities(municipalitiesIn.data)
                 if( municipalitiesIn.total&&props.setTotalCount&&props.setPage){
                    props.setTotalCount(municipalitiesIn.total)
                    props.setPage(0)
                }
            }
        }
    }
    async function handleCityChange(cod_mun:number){
        const newMun= props.municipalities.find((m)=>m.cod_geo===cod_mun)
        if(newMun){
            setMunicipality(newMun)
            if (year!==null && props.reportPart&&props.setValGrid&&municipality!==null&&props.setValGrid){
                const newData = await serviceReportData.getGridData(cod_mun,year,props.reportPart.part_id)
                props.setValGrid(newData.data)
            }
        }
    }
    return(
        <>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-outlined-label">Type de région</InputLabel>
                <Select
                    labelId="demo-simple-selectcode-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.admLev}
                    onChange={(e: any) =>
                        handleChangeRegionType(e.target.value)
                    } 
                    label="Type de région"
                >
                    <MenuItem value={'aucun'}>
                        Aucun - Sélectionnez une option
                    </MenuItem>
                    <MenuItem value={'mrc'}>
                        MRC
                    </MenuItem>
                    <MenuItem value={'reg'}>
                        Région administrative
                    </MenuItem>
                    <MenuItem value={'cm'}>
                        Communauté métropolitaine
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-outlined-label">Région</InputLabel>
                <Select
                    labelId="demo-simple-selectcode-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.subRegion?.reg_code??'aucun'}
                    onChange={(e: any) =>
                        handleChangeRegion(e.target.value)
                    } 
                    label="region"
                >
                    <MenuItem value={'aucun'}>
                        Aucun
                    </MenuItem>
                    {props.regionOptions.map((reg)=>{return(
                        <MenuItem value={reg.reg_code}>
                            {reg.reg_name}
                        </MenuItem>
                    )})}
                </Select>
            </FormControl>
            {props.munList?<FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id='pick-munic-label'>Ville choisie</InputLabel>
                <Select
                    id='pick-muni'
                    labelId="pick-munic-label"
                    value={municipality?.cod_geo??''}
                    onChange={(e)=>handleCityChange(Number(e.target.value))}
                    label='Ville Choisie'
                >
                    <MenuItem
                        key={''}
                        value={''}
                    >
                    </MenuItem>
                    {props.municipalities.map((m)=>
                        <MenuItem
                            key={m.cod_geo}
                            value={m.cod_geo}
                        >
                            {m.nom_organisme}
                        </MenuItem>
                    )
                    }
                </Select>
            </FormControl>:<></>}
        </>
    )
}