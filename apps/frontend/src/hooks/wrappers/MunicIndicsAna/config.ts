import type { 
    backend_response, 
    EquationCalcResult, 
    EquationDef,  
    municipalite,  
    regions, 
    year 
} from "@budgets_municipaux/common";
import { 
    serviceIndicatorEquation 
} from "../../../services/mun/serviceMunicIndicators";
import type { 
    VisualizationConfig 
} from "../../visualisation/types";
import type { 
    indicatorEquationAnalyseSelection,
    indicatorEquationsAnalyseViewData, 
    indicatorEquationsAnalyseViewOptions, 
} from "./types";
import { serviceMunicEnt } from "../../../services/mun/serviceMunicEntites";

const initialSelection: indicatorEquationAnalyseSelection = {
    eq_id:null,
    reg_type:'aucun',
    reg_id:null,
    year:null,
    ana_type:'trans',
    ana_view:'table',
    cod_geo:null,
    capitation:false
}


export const municIndicCreateVizConfig:
    VisualizationConfig<
        indicatorEquationAnalyseSelection,
        indicatorEquationsAnalyseViewOptions,  
        indicatorEquationsAnalyseViewData
    > = {
    initialSelection,

    async getOptions(selection: indicatorEquationAnalyseSelection) {
        const [eqs,years]:[
            backend_response<EquationDef[]>,
            backend_response<year[]>,
        ] = await Promise.all([
            serviceIndicatorEquation.getEquations(),
            serviceMunicEnt.getYears()
        ])
        let regions:backend_response<regions[]>={success:false};
        let city_opt:backend_response<municipalite[]>={success:false}
        if (selection.reg_type !== null&&selection.year!==null) {
            [regions] = await Promise.all([
                serviceMunicEnt.getRegionOptions({region_type:selection.reg_type,year:selection.year}), 
            ])
        }
        if (selection.reg_id!==null&&selection.reg_type!==null&&selection.year!==null){
            city_opt= await serviceMunicEnt.getMunic({year:selection.year,region_id:selection.reg_id,region_type:selection.reg_type})
        }
        return {
            eq_opts: eqs.data ?? [] as EquationDef[],
            reg_opts:regions.data??[]as regions[],
            reg_type_opts:['aucun','cm','mrc','reg'],
            ana_type_opts:[{code:'long',display:'Longitudinale'},{code:'trans',display:'Transversale'}],
            ana_view_opts:[{code:'chart',display:'Graphique'},{code:'table',display:'Tableau'}],
            year_opts:years.data??[] as year[],
            city_opts:city_opt.data??[] as municipalite[]
        } as indicatorEquationsAnalyseViewOptions;

    },


    async getData(selection: indicatorEquationAnalyseSelection) {
        let resp: backend_response<EquationCalcResult[]>
        if (
            selection.eq_id && 
            selection.reg_type !== 'aucun'&&
            selection.reg_id!==null&&
            selection.ana_type ==='trans'
        ) {
            [resp] = await Promise.all([
                serviceIndicatorEquation.getResults({
                    eq_id:selection.eq_id,
                    jur_id:selection.reg_id,
                    jur_type:selection.reg_type,
                    cod_geo:selection.cod_geo,
                    year:selection.year,
                    capitation:selection.capitation
                }),
            ]) 
            if (resp.success === true && resp.data) {
                return {
                    eq_results: resp.data
                }
            }
        }
        if (selection.eq_id && selection.reg_type !== 'aucun'&&selection.reg_id!==null&&selection.ana_type ==='long') {
            [resp] = await Promise.all([
                serviceIndicatorEquation.getResults({
                    eq_id:selection.eq_id,
                    jur_id:selection.reg_id,
                    jur_type:selection.reg_type,
                    cod_geo:selection.cod_geo,
                    capitation:selection.capitation
                }),
            ]) 
            if (resp.success === true && resp.data) {
                return {
                    eq_results: resp.data
                }
            }
        }
        return {
            eq_results: null,
        }

    }
};