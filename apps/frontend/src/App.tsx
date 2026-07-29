import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from './pages/Home' 
import './App.css'
import EtatResultatNet from './pages/old/EtatResultatsNet'
import EtatSituationFinanciere from './pages/old/EtatSituationFinanciere';
import { CityYearProvider } from './context/contextProvider';
import { AnalyseDesDepenses } from './pages/old/AnalyseDesDepenses';
import MunicipalitiesOverview  from './pages/MunicipalitiesOverview';
import MunRepTemplateAndData from './pages/MunRepTemplateAndData';
import ReportSetup from './pages/MunRepAssignIds';
import { MunicipalAccountRawView } from './pages/MunicipalAccountsRawView';
import MunicIndicatorsCreation from './pages/MunicIndicatorsCreation';
import MunicIndicatorsAnalysis from './pages/MunicIndicatorsAnalysis';
import LoginPage from './pages/Login';
import { AuthProvider } from './context/authProvider';
import AdminProtectedRoute from './utils/AdminProtectedRoute';
import AdminPage from './pages/Admin';
import UserProtectedRoute from './utils/UserProtectedRoute';
import UserProfile from './pages/UserProfile';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e1e1e", // navbar color
    },
  },
});

function App() {

	return (
		<>
		<AuthProvider>
		<CityYearProvider>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path='/login' element={<LoginPage/>}/>
					<Route path='/munic/cities' element={<MunicipalitiesOverview/>}/>
					<Route path='/munic/format' element={<MunRepTemplateAndData/>}/>
					<Route path='/munic/report-setup' element={<ReportSetup/>}/>
					<Route path='/munic/fin-state' element={<MunicipalAccountRawView/>}/>
					<Route path='/munic/indics-create' element={<MunicIndicatorsCreation/>}/>
					<Route path='/munic/indics-ana' element={<MunicIndicatorsAnalysis/>}/>
					<Route path="/ern" element={<EtatResultatNet/>}/>
					<Route path="/esf" element={<EtatSituationFinanciere/>}/>
					<Route path='/dep1' element={<AnalyseDesDepenses/>}/>
					<Route element={<UserProtectedRoute/>}>
						<Route path='/profil' element={<UserProfile/>}/>
					</Route>
					<Route element={<AdminProtectedRoute/>}>
						<Route path='/admin' element={<AdminPage/>}/>
					</Route>

          			<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
		</CityYearProvider>
		</AuthProvider>
		</>
	)
}

export default App
