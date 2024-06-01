import React, { useEffect } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import AdminPage from './Components/AdminPage';
import Login from './Components/Login';
import LoginPage from './Components/LoginPage';
import StrucureAndDetails from './Components/StrucureAndDetails';
import GetQuote from './Components/GetQuote';
import FilldetailsPage from './Components/FilldetailsPage';
import PaymentPage from './Components/PaymentComponent/PaymentPage';
import {gapi} from 'gapi-script';
import Profile from './Components/Profile';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './Components/ErrorPage';

const clientId = "246541673533-e90kj0pumgndrmt51j27v853d3pkon00.apps.googleusercontent.com";

function App() {


  useEffect(() => {
    function start() {
    gapi.client.init({
    clientid: clientId,
    scope: ""
    })
  };
   
    gapi.load('client:auth2', start);
});


  return (
    <div >
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
              <Route exact path="/property" element={<StrucureAndDetails/>}/>
              <Route path="/getQuote" element={<GetQuote/>}/>
              <Route path="/*" element={<ErrorPage/>}/>

            <Route element={<ProtectedRoutes/>}>
              <Route exact path="/login" element={<LoginPage/>}/>
              <Route path="/admin" element={<AdminPage/>}/>
              <Route path="/fill" element={<FilldetailsPage/>}/>
              <Route path="/payment" element={<PaymentPage/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
    <ToastContainer autoClose={5000} />
    </div>
  )
}

export default App

