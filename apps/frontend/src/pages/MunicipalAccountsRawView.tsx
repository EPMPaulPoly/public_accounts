import { useState } from "react";
import { Footer } from "../components/common/Footer";
import MenuBar from "../components/common/MenuBar";
import { CityYearReportControlBar } from "../components/controlBars/CityYearReportControlBar";
import { MunicipalAccountsTable } from "../components/visualisation/MunicipalAccountsTable";
import { useReportRawViewVisualization } from "../hooks/wrappers/MunRawView/useReportRawViewVisualization";
import { useAppContext } from "../context/contextProvider";
import { UserSnackCommunication } from "../components/common/UserSnackCommunication";




export function MunicipalAccountRawView(){
    const viz=useReportRawViewVisualization()

    const {setSnackMessage,setSnackOpen,setSnackSev,snackMessage,snackOpen,snackSev}=useAppContext()

    return(
        <div
            style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
        >
            <MenuBar
                setSnackMessage={setSnackMessage}
                setSnackOpen={setSnackOpen}
                setSnackSev={setSnackSev}
            />

            <div>
                <CityYearReportControlBar
                    selection={{
                        year:viz.selection.year,
                        regionType:viz.selection.region_type,
                        region:viz.selection.region,
                        city:viz.selection.city,
                        reportPage:viz.selection.report_page
                    }}
                    options={{
                        yearOpts:viz.options?.year_opts??[],
                        regionTypeOpts:viz.options?.region_type_opts??[],
                        regionOpts:viz.options?.region_opts??[],
                        cityOpts:viz.options?.city_opts??[],
                        reportPartOpts:viz.options?.report_pages_opts??[]
                    }}
                    onChange={{
                        yearSetter:viz.setYear,
                        regionTypeSetter:viz.setRegType,
                        regionSetter:viz.setReg,
                        citySetter:viz.setCity,
                        reportPageSetter:viz.setReportPart
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

                <MunicipalAccountsTable
                    grid={viz.data??[]}
                />

            </div>
            <UserSnackCommunication
                snackMessage={snackMessage}
                snackSev={snackSev}
                setSnackOpen={setSnackOpen}
                snackOpen={snackOpen}
            />
            <Footer/>
        </div>
    )
}