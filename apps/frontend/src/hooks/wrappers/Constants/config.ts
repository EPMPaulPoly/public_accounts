import type { 
    VisualizationConfig 
} from "../../visualisation/types";
import type { 
    constantsSelection,
    constantsOptions, 
    constantsData, 
} from "./types";
import { serviceConstants } from "../../../services/common/serviceConstants";

const initialSelection: constantsSelection = {
    const_id:null
}


export const constantCreateVizConfig:
    VisualizationConfig<
        constantsSelection,
        constantsOptions,  
        constantsData
    > = {
    initialSelection,

    async getOptions(selection: constantsSelection) {
        const data = await serviceConstants.getConstants({})
        return {constOptions:data.data}
    },


    async getData(selection: constantsSelection) {
        if (selection.const_id!==null ){
            const data = await serviceConstants.getConstants({const_id:selection.const_id})
            if (data.success===true){
                return{
                    constToMod:data.data[0]
                }
            }
            return {constToMod:null}
        }
        return {
            constToMod: null,
        }

    }
};

