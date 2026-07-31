import { Footer } from "../components/common/Footer";
import MenuBar from "../components/common/MenuBar";
import IndicatorsAnalysisControlBar from "../components/controlBars/IndicatorsAnalysisControlBar";
import IndicatorsLongChartVisualisation from "../components/visualisation/IndicatorsLongChartVisualisation";
import IndicatorsLongTableVisualisation from "../components/visualisation/IndicatorsLongTableVisualisation";
import IndicatorsTransChartVisualisation from "../components/visualisation/IndicatorsTransChartVisualisation";
import IndicatorsTransTableVisualisation from "../components/visualisation/IndicatorsTransTableVisualisation";
import { useMunicIndicatorsAnalysisVisualization } from "../hooks/wrappers/MunicIndicsAna/useMunicIndicatorsAnalyseVisualisation";
import { useAppContext } from "../context/contextProvider";
import { UserSnackCommunication } from "../components/common/UserSnackCommunication";


export default function MunicIndicatorsAnalysis(){
    const viz=useMunicIndicatorsAnalysisVisualization()
    const {setSnackMessage,setSnackOpen,setSnackSev,snackMessage,snackOpen,snackSev}=useAppContext()
    function returnCorrectVis(){
        if(viz.selection.ana_type==='trans'&&viz.selection.ana_view==='table'){
            return(<>
                <IndicatorsTransTableVisualisation

                    equation={
                        viz.options?.eq_opts.find(
                            (e)=>e.eq_id===viz.selection.eq_id
                        )??{
                            eq_expression:'',
                            eq_id:0,
                            eq_name:''
                        }
                    }
                    data={viz.data?.eq_results??[]}
                    capitation={viz.selection.capitation}
                />
            </>)
        }else if(viz.selection.ana_type==='trans'&&viz.selection.ana_view==='chart'){
            return(<>
                <IndicatorsTransChartVisualisation
                    equation={
                        viz.options?.eq_opts.find(
                            (e)=>e.eq_id===viz.selection.eq_id
                        )??{
                            eq_expression:'',
                            eq_id:0,
                            eq_name:''
                        }
                    }
                    data={viz.data?.eq_results??[]}
                    capitation={viz.selection.capitation}
                />
            </>)
        }else if(viz.selection.ana_type==='long'&&viz.selection.ana_view==='table'){
            return(<>
                <IndicatorsLongTableVisualisation
                    equation={
                        viz.options?.eq_opts.find(
                            (e)=>e.eq_id===viz.selection.eq_id
                        )??{
                            eq_expression:'',
                            eq_id:0,
                            eq_name:''
                        }
                    }
                    data={viz.data?.eq_results??[]}
                    capitation={viz.selection.capitation}
                />
            </>)
        }else if(viz.selection.ana_type==='long'&&viz.selection.ana_view==='chart'){
            return(<>
                <IndicatorsLongChartVisualisation
                    equation={viz.options?.eq_opts.find((e)=>e.eq_id===viz.selection.eq_id)??{eq_expression:'',eq_id:0,eq_name:''}}
                    data={viz.data?.eq_results??[]}
                    capitation={viz.selection.capitation}
                />
            </>)
        }else{
            return(<></>)
        }
    }
    return(
    <div
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
        <div>
            <MenuBar
                setSnackMessage={setSnackMessage}
                setSnackOpen={setSnackOpen}
                setSnackSev={setSnackSev}
            />
        </div>
        <div>
            <IndicatorsAnalysisControlBar
                values={{
                    eq_id:viz.selection.eq_id,
                    reg_type:viz.selection.reg_type,
                    reg_code:viz.selection.reg_id,
                    cod_geo:viz.selection.cod_geo,
                    ana_type:viz.selection.ana_type,
                    ana_view:viz.selection.ana_view,
                    year:viz.selection.year,
                    capitalize:viz.selection.capitation
                }}
                options={{
                    indicOpts:viz.options?.eq_opts??[],
                    ana_type_opts:viz.options?.ana_type_opts??[],
                    ana_view_opts:viz.options?.ana_view_opts??[],
                    year_opts:viz.options?.year_opts??[],
                    region_id_opts:viz.options?.reg_opts??[],
                    region_type_opts:viz.options?.reg_type_opts??[],
                    city_opts:viz.options?.city_opts??[]
                }}
                onChange={{
                    setIndicator:viz.setSelectedEquation,
                    setAnaType:viz.setAnaType,
                    setAnaView:viz.setAnaView,
                    setYear:viz.setYear,
                    setRegionId:viz.setRegionId,
                    setRegionType:viz.setRegionType,
                    setCity:viz.setCity,
                    setCapitalize:viz.setCapitation
                }}
            />
        </div>
        <div
            style={{ 
                    flex: 1, 
                    overflow: 'auto' , 
                    width:'100%',
                    minWidth: 0,
                    minHeight: 0,
                }}
        >
            
            {returnCorrectVis()}
        </div>
        <UserSnackCommunication
            snackMessage={snackMessage}
            snackSev={snackSev}
            setSnackOpen={setSnackOpen}
            snackOpen={snackOpen}
        />
        <Footer/>
    </div>)
}