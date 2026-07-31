import { type regions, type FinStateSection, type FinStateValueGrid, type municipalite, type year } from "@budgets_municipaux/common"
import { Box } from "@mui/material"
import { useState, type Dispatch, type SetStateAction } from "react"
import ChooseYear from "../selectors/ChooseYear"
import ChooseReportSection from "../selectors/ChooseReportSection"
import { useAppContext } from "../../context/contextProvider"
import ChooseCity from "../selectors/ChooseCity"
import { SelectionMunicipalites } from "../selectors/SelectionMunicipalites"
import { ChooseRegion } from "../selectors/ChooseRegion"


interface props{
    selection:{
        year:number|null,
        regionType:'cm'|'reg'|'mrc'|'aucun',
        region:string|null,
        city:number|null,
        reportPage:number|null
    }
    options:{
        yearOpts:year[],
        regionTypeOpts:('cm'|'reg'|'mrc'|'aucun')[]
        regionOpts:regions[]
        reportPartOpts:FinStateSection[]
        cityOpts:municipalite[]
    }
    onChange:{
        yearSetter:(newYear:number|null)=>void
        regionTypeSetter:(newRegionType:'cm'|'mrc'|'reg'|'aucun')=>void
        regionSetter:(newRegion:string|null)=>void
        reportPageSetter:(newReportPage:number|null)=>void
        citySetter:(newCity:number|null)=>void
    }
}


export function CityYearReportControlBar(props:props){
    return(<>
        <Box>
            <ChooseYear
                value={props.selection.year}
                onChange={props.onChange.yearSetter}
                options={props.options.yearOpts}
            />
            <ChooseRegion
            
                value={{region:props.selection.region,region_type:props.selection.regionType}}
                options={{region_options:props.options.regionOpts,region_types:props.options.regionTypeOpts}}
                onChange={{
                    reg_type_changer:props.onChange.regionTypeSetter,
                    reg_changer:props.onChange.regionSetter
                }}
            />
            <ChooseCity
                value={props.selection.city}
                options={props.options.cityOpts}
                onChange={props.onChange.citySetter}
            />
            <ChooseReportSection
                value={props.selection.reportPage}
                options={props.options.reportPartOpts}
                onChange={props.onChange.reportPageSetter}
            />
        </Box>
    
    </>)
}