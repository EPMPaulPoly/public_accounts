import pandas as pd


DATA_FILE = './data/rf-2017-mun.csv'
YEAR = 2017

def run_conversion():
    '''
    # run_conversion
    Runner to take the single occurence csv files from the 
    Donnees Quebec site and convert to a long format rather than wide
    '''
    data = pd.read_csv(DATA_FILE)
    data.drop(columns=[
                    'nom_mun',
                    'cod_mrc',
                    'nom_mrc',
                    'cod_cm',
                    'nom_cm',
                    'no_reg',
                    'desc_reg',
                    'desi_mun'],inplace=True)
    id_col = "cod_geo"
    data = data[pd.to_numeric(data[id_col], errors="coerce").notna()]
    # Numeric columns + id
    df_numeric = data[[id_col]].join(
        data
        .select_dtypes(include="number")
        .drop(columns=[id_col], errors="ignore")
    )

    # Text columns + id
    df_text = data[[id_col]].join(
        data
        .select_dtypes(include=["object", "string"])
        .drop(columns=[id_col], errors="ignore")
    )
    df_num_out = df_numeric.melt(
        id_vars=id_col,
        var_name='prov_rep_id',
        value_name='value'
    ).dropna(subset='value')
    df_num_out["value"] = df_num_out["value"].astype("int64")
    df_text_out = df_text.melt(
        id_vars=id_col,
        var_name='prov_rep_id',
        value_name='value_text'
    ).dropna(subset='value_text')
    data_out = pd.concat([df_num_out,df_text_out])
    mask = data_out["value"].notna() & data_out["value"].ne(0)
    data_out_filt = data_out[mask]
    data_out_filt["value"] = pd.to_numeric(data_out_filt["value"], errors="coerce").astype("Int64")
    data_out_filt['year']=YEAR
    data_out_filt.sort_values(by=[id_col,'prov_rep_id'],inplace=True)
    data_out_filt.to_csv(f'./data/{YEAR}SimpleTraite.csv',index=False)

if __name__=='__main__':
    run_conversion()