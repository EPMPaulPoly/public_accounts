import { createContext, useContext, useState } from "react";
import type { Dispatch,SetStateAction } from "react";
import type { municipalite } from "@budgets_municipaux/common";

type CityYearContextType = {
    municipality: municipalite | null;
    year: number | null;
    setMunicipality: Dispatch<SetStateAction<municipalite | null>>;
    setYear: Dispatch<SetStateAction<number | null>>;
};

const CityYearContext = createContext<CityYearContextType | undefined>(
    undefined
);

export function CityYearProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [municipality, setMunicipality] = useState<municipalite | null>(null);
    const [year, setYear] = useState<number | null>(null);
    const value_out = {municipality,year,setMunicipality,setYear}
    return (
        <CityYearContext.Provider value={value_out}>
            {children}
        </CityYearContext.Provider>
    );
}

export function useCityYear() {
    const context = useContext(CityYearContext);

    if (!context) {
        throw new Error("useCityYear must be used within CityYearProvider");
    }

    return context;
}