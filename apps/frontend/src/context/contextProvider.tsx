import { createContext, useContext, useState } from "react";
import type { Dispatch,SetStateAction } from "react";
import type { municipalite } from "@budgets_municipaux/common";

type AppContextType = {
    municipality: municipalite | null;
    year: number | null;
    snackOpen:boolean,
    snackMessage:string,
    snackSev:("success" | "info" | "warning" | "error") | undefined,
    setMunicipality: Dispatch<SetStateAction<municipalite | null>>;
    setYear: Dispatch<SetStateAction<number | null>>;
    setSnackOpen:Dispatch<SetStateAction<boolean>>
    setSnackMessage:Dispatch<SetStateAction<string>>
    setSnackSev:Dispatch<SetStateAction<("success" | "info" | "warning" | "error") | undefined>>
};

const AppContext = createContext<AppContextType | undefined>(
    undefined
);

export function AppContextProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [municipality, setMunicipality] = useState<municipalite | null>(null);
    const [year, setYear] = useState<number | null>(null);

    const [snackOpen,setSnackOpen] = useState<boolean>(false)
    const [snackMessage,setSnackMessage] = useState<string>('')
    const [snackSev,setSnackSev] = useState<("success" | "info" | "warning" | "error") | undefined>(undefined)

    const value_out = {
        municipality,
        year,
        snackOpen,
        snackMessage,
        snackSev,
        setMunicipality,
        setYear,
        setSnackMessage,
        setSnackOpen,
        setSnackSev
    }
    return (
        <AppContext.Provider value={value_out}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useCityYear must be used within CityYearProvider");
    }

    return context;
}