import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext'
import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home';
import UserInput from './pages/UserInput';
import AddPart from './pages/AddPart';
import ReportPage from './pages/ReportPage';
import LotReportPage from './pages/LotReportPage';


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
            </Routes>
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
