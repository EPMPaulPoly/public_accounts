import type { AnalysisType, AnalysisView, EquationDef, municipalite, regions, year } from "@budgets_municipaux/common";
import ChooseIndicator from "../selectors/ChooseIndicator";
import { Box } from "@mui/material";
import ChooseAnalysisType from "../selectors/ChooseAnalysisType";
import ChooseAnalysisView from "../selectors/ChooseAnalysisView";
import ChooseYear from "../selectors/ChooseYear";
import { ChooseRegion } from "../selectors/ChooseRegion";
import ChooseCity from "../selectors/ChooseCity";
import ChooseCapitalisation from "../selectors/ChooseCapitalisation";
interface IACBProps{
    values:{
        eq_id:number|null,
        reg_type:'cm'|'aucun'|'mrc'|'reg'
        reg_code:string|null
        cod_geo:number|null,
        ana_type:'trans'|'long',
        ana_view:'chart'|'table',
        year:number|null,
        capitalize:boolean
    },
    options:{
        indicOpts:EquationDef[],
        ana_type_opts:AnalysisType<'trans'|'long'>[],
        ana_view_opts:AnalysisView<'chart'|'table'>[],
        year_opts:year[],
        region_type_opts:('cm'|'aucun'|'mrc'|'reg')[],
        region_id_opts:regions[]
        city_opts:municipalite[]
    }
    onChange:{
        setIndicator:(newEqId:number|null)=>void,
        setAnaType:(newAnaType:'trans'|'long')=>void
        setAnaView:(newAnaView:'chart'|'table')=>void
        setYear:(year:number|null)=>void,
        setRegionType:(newRegionType:'cm'|'mrc'|'reg'|'aucun')=>void
        setRegionId:(newRegionId:string|null)=>void
        setCity:(newCityCode:number|null)=> void
        setCapitalize:(newCapitalize:boolean)=>void
    }
}   

export default function IndicatorsAnalysisControlBar(props:IACBProps){
    return(
        <Box sx={{
                    display: 'flex',
                    alignItems: 'center', // Vertical alignment
                    gap: 2,               // Spacing between components
                    justifyContent: 'center', // Horizontal center
                    padding:'10px'
                }}>
            <ChooseAnalysisType
                value={props.values.ana_type}
                options={props.options.ana_type_opts}
                onChange={props.onChange.setAnaType}
            />
            <ChooseAnalysisView
                value={props.values.ana_view}
                options={props.options.ana_view_opts}
                onChange={props.onChange.setAnaView}
            />
            <ChooseIndicator
                value={props.values?.eq_id??null}
                options={props.options.indicOpts}
                onChange={props.onChange.setIndicator}
            />
            {props.values.ana_type==='trans'?
                <>
                    <ChooseYear
                        value={props.values.year}
                        options={props.options.year_opts}
                        onChange={props.onChange.setYear}
                    />
                </>:<></>
            }
            <ChooseRegion
                value={{region_type:props.values.reg_type,region:props.values.reg_code}}
                onChange={{
                    reg_changer:props.onChange.setRegionId,
                    reg_type_changer:props.onChange.setRegionType
                }}
                options={{
                    region_options:props.options.region_id_opts,
                    region_types:props.options.region_type_opts
                }}
            />
            <ChooseCity
                value={props.values.cod_geo}
                options={props.options.city_opts}
                onChange={props.onChange.setCity}
            />
            <ChooseCapitalisation
                value={props.values.capitalize}
                onChange={props.onChange.setCapitalize}
            />
        </Box>
    )
}