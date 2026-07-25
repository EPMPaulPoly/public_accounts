import type { city_year_combo, municipalite, ProfitAndLossStatement, year } from "@budgets_municipaux/common"
import type { Dispatch, SetStateAction } from "react"


import { useEffect, useState } from 'react'
import ChooseYear from "./ChooseYear"
import ChooseCity from "./ChooseCity"

type Props = {
    ville: municipalite | null,
    defVille: Dispatch<SetStateAction<municipalite | null>>,
    annee: number | null,
    defAnnee: Dispatch<SetStateAction<number | null>>,
    handleGetFinStat: ((of_interest: city_year_combo) => void);
    yearOptions:year[]
    setYearOptions:Dispatch<SetStateAction<year[]>>

}

function ChoixVilleAnnee(
    { ville,
        defVille,
        annee,
        defAnnee,
        handleGetFinStat,
        yearOptions,
        setYearOptions
    }: Props
) {

    useEffect(() => {
        if (ville!==null && annee!==null){
            handleGetFinStat({munic:ville,year:annee})
        }
    }, [annee, ville])



    return (
        <>
            <ChooseCity ville={ville} defVille={defVille} />
            <ChooseYear annee={annee} defAnnee={defAnnee} optionsAnnees={yearOptions} defOptionsAnnees={setYearOptions}/>
        </>
    )
}

export default ChoixVilleAnnee