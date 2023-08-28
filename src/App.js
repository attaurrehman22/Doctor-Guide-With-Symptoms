import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import _Login from './components/_Login';
import Signup from './components/Signup';
import Adminpannel from './components/Adminpannel'
import Selectingparts from './components/Selectingparts'
import Selectsymptoms from './components/Selectsymptoms'
import Addbodyparts from './components/Addbodyparts'
import Doctorlist from './components/Doctorlist'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' Component={_Login}/>
    <Route path='Signup' Component={Signup}/>
    <Route path='Adminpan' Component={Adminpannel}/>
    <Route path='Selectbodyparts' Component={Selectingparts}/>
    {/* <Route path="Selectsymptoms" component={Selectsymptoms} /> */}
    <Route path='Selectsymptoms' Component={Selectsymptoms}/>
    <Route path='Addbodyparts' Component={Addbodyparts}/>
    <Route path='Doctorlist' Component={Doctorlist}/>

    </Routes>
    
    </BrowserRouter>
    
    </>
  );
}

export default App;
