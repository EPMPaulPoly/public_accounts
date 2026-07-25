import type { municipalite } from "@budgets_municipaux/common";
import type { VisualizationConfig } from "../../visualisation/types";
import { serviceMunicEnt } from "../../../services/mun/serviceMunicEntites";
import type { municipalitiesViewData, municipalitiesViewOptions, municipalitiesViewSelection } from "./types";

const initialSelection: municipalitiesViewSelection = {
    year: null,
    region_type: 'aucun',
    region: null,
    page: 0,
    rows_per_page: 10
}


export const municipalitiesViewConfig:
    VisualizationConfig<
        municipalitiesViewSelection,
        municipalitiesViewOptions,
        municipalitiesViewData
    > = {
    initialSelection,

    async getOptions(selection: municipalitiesViewSelection) {
        return {
            years: (await serviceMunicEnt.getYears())?.data ?? [],
            region_types: ['aucun', 'cm', 'reg', 'mrc'],
            regions: selection.year && selection.region_type !== 'aucun' ?
                (await serviceMunicEnt
                    .getRegionOptions({
                        region_type: selection.region_type,
                        year: selection.year,
                    }))?.data ?? [] : [],
            rows_per_page_options: [10, 25, 50]
        };
    },


    async getData(selection: municipalitiesViewSelection) {
        const out = await serviceMunicEnt.getMunic({
                year: selection.year,
                region_type: selection.region_type,
                region_id: selection.region!==null?selection.region:undefined,
                limit: selection.rows_per_page,
                offset: selection.rows_per_page * selection.page
            })
        if (out.success&&out.data&&out.total){
            return {municipalities:out.data,totalCount:out.total}
        }else{
            return {municipalities:[],totalCount:0}
        }
    }
};