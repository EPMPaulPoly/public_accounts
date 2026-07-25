import { useState } from "react";
import MenuBar from "../components/common/MenuBar";
import {type ExpenseAnalysis } from "@budgets_municipaux/common/types/accounting.js";



export function ComparaisonMunicipalites(){
    const [villeGauche,defVilleGauche]=useState<ExpenseAnalysis|null>(null);
    const [villeDroite,defVilleDroite]=useState<ExpenseAnalysis|null>(null)
    const [anneeGauche,defAnneeGauche]=useState<number|null>(null)
    const [anneeDroite,defAnneeDroite]=useState<number|null>(null)
    return (
        <>
            <MenuBar/>

            <div>

            </div>

                    
        </>
    )
}