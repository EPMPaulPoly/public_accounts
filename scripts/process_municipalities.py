import pandas as pd
from pathlib import Path

YEAR=2022
FILE_TO_PROCESS='data/rf-2022-mun.csv'
OPT_POPULATION_FILE='data/LIS_municipalites_population_2022.xlsx'
def process_file_for_municipalities():
    my_file = Path(FILE_TO_PROCESS)
    abs =my_file.absolute()
    if my_file.is_file():
        df=pd.read_csv(FILE_TO_PROCESS)
        if my_file.name.startswith('rf'):
            df_pop = pd.read_excel(OPT_POPULATION_FILE)
            df_pop = df_pop[['cod_geo','population']]
            df_mun_info = df[[
                'cod_geo',
                'nom_mun',
                'desi_mun',
                'cod_mrc',
                'nom_mrc',
                'cod_cm',
                'nom_cm',
                'no_reg',
                'desc_reg',
                ]]
            id_col = "cod_geo"
            df_pop = df_pop[pd.to_numeric(df_pop[id_col], errors="coerce").notna()]
            df_pop[id_col]=df_pop[id_col].astype(int)
            data = df_mun_info[pd.to_numeric(df_mun_info[id_col], errors="coerce").notna()]
            data[id_col]=data[id_col].astype(int)
            data = data.merge(df_pop,on='cod_geo',how='left')
            
            data["population"]= pd.to_numeric(data["population"], errors="coerce").astype("Int64")
        else:
            df_mun_info = df[[
                'cod_geo',
                'nom_organisme',
                'desi_org',
                'cod_mrc',
                'nom_mrc',
                'cod_cm',
                'nom_cm',
                'no_reg',
                'desc_reg',
                'type_org',
                'population'
                ]]
            df_mun_info.rename(columns={'desi_mun':'desi_org'},inplace=True)
            id_col = "cod_geo"
            data = df_mun_info[pd.to_numeric(df_mun_info[id_col], errors="coerce").notna()]
            data["population"]= pd.to_numeric(data["population"], errors="coerce").astype("Int64")
        
        data["no_reg"] = pd.to_numeric(data["no_reg"], errors="coerce").astype("Int64")
        data.to_csv(f'./data/{YEAR}ListeMunicipalite.csv',index=False)

if __name__=='__main__':
    process_file_for_municipalities()