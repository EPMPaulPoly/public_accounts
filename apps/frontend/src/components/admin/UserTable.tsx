import { Delete, Edit } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material"
import type { UserWithRole } from "better-auth/plugins"
import { useState, type Dispatch, type SetStateAction } from "react"

interface UTProps{
    values:{
        users:(UserWithRole&{username?:string,displayUsername?:string})[],
        total:number,
        page:number,
        rowsPerPage:number,
        currentUserId:string|null
    },
    onChange:{
        setPage:Dispatch<SetStateAction<number>>
        setRowsPerPage:Dispatch<SetStateAction<number>>
    },
    onClick:{
        setEditModalOpen:Dispatch<SetStateAction<boolean>>
        setUserEdit: Dispatch<SetStateAction<string|null>>
        deleteUser:(userId:string)=>Promise<boolean>
    }
}

function UserTable(props:UTProps){
    const [deleteDialogOpen,setDeleteDialogOpen] = useState<boolean>(false)
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        props.onChange.setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        props.onChange.setRowsPerPage(parseInt(event.target.value, 10));
        props.onChange.setPage(0);
    };
    function handleUserEdit(id:string){
        props.onClick.setUserEdit(id)
        props.onClick.setEditModalOpen(true)
    }
    function handleDeleteIntiate(id:string){
        props.onClick.setUserEdit(id)
        setDeleteDialogOpen(true)
    }

    async function completeDeletion(){
        if (props.values.currentUserId!==null){
            const success = await props.onClick.deleteUser(props.values.currentUserId)
            if (success){
                props.onClick.setUserEdit(null)
                setDeleteDialogOpen(false)
            }
        }
    }
    return(<>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>
                             Name
                    </TableCell>
                    <TableCell>
                        Nom d'usager
                    </TableCell>
                    <TableCell>
                        Courriel
                    </TableCell>
                    <TableCell>
                        Date création
                    </TableCell>
                    <TableCell>
                        Rôle
                    </TableCell>
                    <TableCell>
                        Est Révoqué?
                    </TableCell>
                    <TableCell>
                        Raison révocation
                    </TableCell>
                    <TableCell>
                        Révocation expire
                    </TableCell>
                    <TableCell
                        sx={{
                            width:'10px'
                        }}
                    >
                    </TableCell>
                    <TableCell
                        sx={{
                            width:'10px'
                        }}
                    >
                    </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {props.values.users.map((u)=>
                        <TableRow
                            key={u.id}
                        >
                            <TableCell>
                                {u.name}
                            </TableCell>
                            <TableCell>
                                {u.displayUsername}
                            </TableCell>
                            <TableCell>
                                {u.email}
                            </TableCell>
                            <TableCell>
                                {u.createdAt.toDateString()}
                            </TableCell>
                            <TableCell>
                                {u.role}
                            </TableCell>
                            <TableCell>
                                {u.banned}
                            </TableCell>
                            <TableCell>
                                {u.banReason}
                            </TableCell>
                            <TableCell>
                                {u.banExpires?.toDateString()}
                            </TableCell>

                            <TableCell>
                                <IconButton
                                    onClick={()=>handleUserEdit(u.id)}
                                >
                                    <Edit/>
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={()=>{handleDeleteIntiate(u.id)}}
                                >
                                    <Delete
                                        sx={{color:'red'}}
                                    />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPage={props.values.rowsPerPage}
                            count={props.values.total??0}
                            page={props.values.page}
                            rowsPerPageOptions={[5,10,25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            onPageChange={handleChangePage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        <Dialog
            open={deleteDialogOpen}
            onClose={()=>setDeleteDialogOpen(false)}
        >
            <DialogTitle>
                Êtes vous sur de vouloir supprimer cet usager?
            </DialogTitle>
            <DialogContent>
                Cette suppression sera permanente et ne pourra être révoquée
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{backgroundColor:'red'}}
                    onClick={completeDeletion}
                >
                    Supprimer usager
                </Button>
            </DialogActions>
        </Dialog>
    </>)
}

export default UserTable