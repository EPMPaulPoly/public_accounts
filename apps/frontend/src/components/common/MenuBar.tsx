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
import { Button, Icon } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";

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

function MenuBar() {
    const{isAuthenticated,logout,session,isImpersonating,stopImpersonating}=useAuth()
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const navigate = useNavigate();

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => setAnchorEl(null);

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
                {isAuthenticated ?
                    <Button
                        onClick={logout}
                        color="inherit"
                        variant="outlined"
                    >
                        <Logout
                        /> Logout
                    </Button> : <>
                        <Button
                            onClick={()=>navigate('/login')}
                            color="inherit"
                            variant='outlined'
                        >
                            <Login/>Login
                        </Button>
                    </>}
                {isImpersonating?<div style={{paddingLeft:5}}><Button variant="outlined" color="inherit" onClick={stopImpersonating} >Arreter d'imiter</Button></div>:<></>}

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
                    {session?.user.role==='admin'?<>
                        <StyledListHeader>Admin</StyledListHeader>
                        {adminPages.map((p)=>{return(
                            <MenuItem
                                key={p.path}
                                onClick={() => {
                                    navigate(p.path);
                                    closeMenu();
                                }}
                            >
                                {p.label}
                            </MenuItem>)
                        })}</>:<>
                        </>
                    }
                </Menu>

            </Toolbar>
        </AppBar>
    );
}


export default MenuBar