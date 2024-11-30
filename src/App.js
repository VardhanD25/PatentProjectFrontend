import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext'
import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home';
import UserInput from './pages/UserInput';
import AddPart from './pages/AddPart';
import ReportPage from './pages/ReportPage';
import LotReportPage from './pages/LotReportPage';
import FirstEntry from './components/FirstEntry';
import SecondEntry from './components/SecondEntry';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PartsManagement from './pages/PartsManagement';
import AddStandardAlloy from './pages/AddStandardAlloy';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/userinput" element={<UserInput/>}/>
              <Route path="/reportpage" element={<ReportPage/>}/>
              <Route path="/addpart" element={<AddPart/>}/>
              <Route path="/lotreportpage" element={<LotReportPage/>}/>
              <Route path="/first-entry" element={<FirstEntry />} />
              <Route path="/second-entry" element={<SecondEntry />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/parts-management" element={<PartsManagement />} />
              <Route path="/add-standard-alloy" element={<AddStandardAlloy />} />
            </Routes>
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
