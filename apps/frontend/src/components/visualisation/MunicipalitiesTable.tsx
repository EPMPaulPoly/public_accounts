import type { municipalite } from "@budgets_municipaux/common"
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from "@mui/material"



interface newProps{
    
    value:{page:number,rows_per_page:number}
    options:{rows_per_page_options:number[]}
    data:{municipalities:municipalite[],totalCount:number}
    onChange:{
        page_changer: (page:number)=>void;
        rows_per_page_changer: (rows_per_page:number)=>void;
    }
}

function MunicipalitiesTable(props: newProps) {

    return (
        <>
            <TableContainer >
                <Table
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Code Municipal
                            </TableCell>
                            <TableCell>
                                Nom Municipalite
                            </TableCell>
                            <TableCell>
                                Communauté métropolitaine
                            </TableCell>
                            <TableCell>
                                MRC
                            </TableCell>
                            <TableCell>
                                Région Adm.
                            </TableCell>
                            <TableCell>
                                Population
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(props.data.municipalities) &&
                            props.data.municipalities.map((row) => (
                                <TableRow key={row.cod_geo}>
                                    <TableCell>
                                        {row.cod_geo}
                                    </TableCell>
                                    <TableCell>
                                        {row.nom_organisme}
                                    </TableCell>
                                    <TableCell>
                                        {row.nom_cm}
                                    </TableCell>
                                    <TableCell>
                                        {row.nom_mrc}
                                    </TableCell>
                                    <TableCell>
                                        {row.desc_reg}
                                    </TableCell>
                                    <TableCell>
                                        {row.population}
                                    </TableCell>
                                </TableRow>

                            )
                            )
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={props.data.totalCount}
                    page={props.value.page}
                    rowsPerPage={props.value.rows_per_page}
                    onPageChange={(e, newPage) => props.onChange.page_changer(newPage)}
                    onRowsPerPageChange={(e) => {
                        props.onChange.rows_per_page_changer(parseInt(e.target.value, 10));
                    }}
                />
            </TableContainer>
        </>
    )
}

export default MunicipalitiesTable