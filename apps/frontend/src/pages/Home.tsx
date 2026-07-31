import { useState } from "react"
import MenuBar from "../components/common/MenuBar"
import { Footer } from "../components/common/Footer"
import { UserSnackCommunication } from "../components/common/UserSnackCommunication"
import { useAppContext } from "../context/contextProvider"

function Home () {
    const {snackOpen,snackMessage,snackSev,setSnackMessage,setSnackSev,setSnackOpen}=useAppContext()


    return(
        <>
            <MenuBar
                setSnackMessage={setSnackMessage}
                setSnackOpen={setSnackOpen}
                setSnackSev={setSnackSev}
            />
            <div style={{
                    textAlign: 'justify',
                    padding:'20px',
                    flex:1
            }}>
                <h1>À propos</h1>
                <p style={{justifyContent:'stretch',alignContent:'left'}}>
                    Ce site a pour but d'explorer les données de états financiers de municipalités dans un 
                    navigateur web et de mettre en place des outils de visualisation des données. D'autre part,
                    Un effort est fait pour mettre en place des outils de visualisation qui permettent à
                    l'utilisateur de mieux saisir les contributions relatives des différents postes
                    aux états financiers. Le site reprend sensiblement l'architecture des formulaires codifiés.
                </p>
            </div>
            <UserSnackCommunication
                snackMessage={snackMessage}
                snackSev={snackSev}
                snackOpen={snackOpen}
                setSnackOpen={setSnackOpen}
            />
            <Footer/>
        </>
    )
}

export default Home