import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from '@mui/material/styles';

import ListSubheader from '@mui/material/ListSubheader';

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import type { Dispatch,SetStateAction } from "react";
import { AccountBox, AdminPanelSettings, Login, Logout } from "@mui/icons-material";

const StyledListHeader = styled(ListSubheader)({
  backgroundImage: 'var(--Paper-overlay)',
});

const commonPages =[
    { label: "Accueil", path: "/" },
]
const municipalPages = [
    { label: 'Municipalités', path:'/munic/cities' },
    { label: 'Format rapport', path:'/munic/format'},
    { label: 'Versement et affectation données ', path:'/munic/report-setup'},
    { label: 'Visualisation États Financiers',path:'/munic/fin-state'},
    { label: "Création d'indicateurs municipaux", path:'/munic/indics-create'},
    { label: "Analyse d'indicateurs", path:'/munic/indics-ana'}
//    { label: "État resultat net", path: "/ern" },
//    { label: "État de la Situtation Financière", path: "/esf" },
//    { label: "Analyse des dépenses", path:"/dep1"    }
]
const adminPages =[
    { label:'Admin', path:'/admin'}
]

interface MenuBarProps{
    setSnackOpen?:Dispatch<SetStateAction<boolean>>
    setSnackMessage?:Dispatch<SetStateAction<string>>
    setSnackSev?: Dispatch<SetStateAction<("success" | "info" | "warning" | "error") | undefined>>
}

function MenuBar(props:MenuBarProps) {
    const{isAuthenticated,logout,session,isImpersonating,stopImpersonating}=useAuth()
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const navigate = useNavigate();

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => setAnchorEl(null);
    async function handleLogout(){
        const {data,error}=await logout()
        if (error===null&&props.setSnackMessage&&props.setSnackOpen&&props.setSnackSev){
            props.setSnackMessage('Succès de logout')
            props.setSnackSev('success')
            props.setSnackOpen(true)
        }else if (props.setSnackMessage&&props.setSnackOpen&&props.setSnackSev){
            props.setSnackMessage(`Erreur de logout: ${error.message}`)
            props.setSnackSev('error')
            props.setSnackOpen(true)
        }
    } 
    return (
        <AppBar position="static">
            <Toolbar>

                <IconButton
                    size="large"
                    color="inherit"
                    onClick={openMenu}
                >
                    <MenuIcon />
                </IconButton>
                
                

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Exploration finances municipales
                </Typography>

                

                {/* mobile menu */}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                    <StyledListHeader>Commun</StyledListHeader>
                    {commonPages.map((p) => (
                        <MenuItem
                            key={p.path}
                            onClick={() => {
                                navigate(p.path);
                                closeMenu();
                            }}
                        >
                            {p.label}
                        </MenuItem>
                    ))}
                    <StyledListHeader>Municipal</StyledListHeader>
                    {municipalPages.map((p) => (
                        <MenuItem
                            key={p.path}
                            onClick={() => {
                                navigate(p.path);
                                closeMenu();
                            }}
                        >
                            {p.label}
                        </MenuItem>
                    ))}
                    <StyledListHeader>Usager</StyledListHeader>

                    {session?.user ? <>
                        <MenuItem
                            key={'/proile'}
                            onClick={() => {
                                navigate('/profil');
                                closeMenu();
                            }}
                        >
                            <AccountBox/>
                            Profil
                        </MenuItem>
                    </> : <></>}
                    
                    {isAuthenticated ?
                        <MenuItem
                            onClick={handleLogout}
                        >
                            <Logout
                            /> Logout
                        </MenuItem> : <>
                            <MenuItem
                                onClick={() => navigate('/login')}
                            >
                                <Login />Login
                            </MenuItem>
                        </>}    
                    {session?.user.role==='admin'?<>
                        <StyledListHeader>Admin</StyledListHeader>

                            <MenuItem
                                key={'/admin'}
                                onClick={() => {
                                    navigate('/admin');
                                    closeMenu();
                                }}
                            >
                                <AdminPanelSettings/>Administrateur
                            </MenuItem>
                        </>:<>
                        </>
                    }
                    {isImpersonating?<MenuItem onClick={stopImpersonating} >Arreter d'imiter</MenuItem>:<></>}

                </Menu>

            </Toolbar>
        </AppBar>
    );
}


export default MenuBar