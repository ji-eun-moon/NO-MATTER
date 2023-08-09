import React, { useEffect } from 'react';
import axios from 'axios';

import './App.scss';
import { isMobile } from 'react-device-detect';

// routes
import routes from './data/routes';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';

// components
import NavBar from './components/NavBar';
import PCLanding from './landings/PCLanding';

//landings
import LandingPage from './landings/LandingPage';

//pages/auth
import LoginPage from './pages/auth/LoginPage.jsx'
import Signup from './pages/auth/Signup'

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();
  const navigate = useNavigate()
  const currentPath = location.pathname;

  const isNavBarVisible = isMobile && currentPath !== '/' && currentPath !== '/login' && currentPath !== '/signup';

  const automaticLogin = () => {
    const isValidRefresh = !!localStorage.getItem('refreshToken')
    if (isValidRefresh === true) {
      axios.post('http://localhost:8080/api/v1/user/refreshToken', { refreshToken: localStorage.getItem('refreshToken') })
        .then((response) => {
          sessionStorage.setItem('authToken', response.data[0]);
          localStorage.setItem('refreshToken', response.data[1]);
          navigate('/main')
          return true
        })
        .catch((err) => {
          return false
        })
    }
  }

  useEffect(() => {
    automaticLogin()
  }, [])

  const isSessionValid = () => {
    const isValid = !!sessionStorage.getItem('authToken')
    return isValid
  };

  return (
    <div>
      {isMobile ? (
        <>
          <div>
            <Routes>
              <Route path='/' element={isSessionValid() ? 
                    (<Navigate to='/main' />) : (<LandingPage/>)}/>
              <Route path='/login' element={isSessionValid() ? 
                    (<Navigate to='/main' />) : (<LoginPage/>)}/>
              <Route path='/signup' element={isSessionValid() ? 
                    (<Navigate to='/main' />) : (<Signup/>)}/>
              {routes.map((route) => {
                return (
                  <Route key={route.path} path={route.path} element={isSessionValid() ? 
                    (route.element) : (<Navigate to='/login' />)} />
                )
              })}
            </Routes>
          </div>
          {isNavBarVisible && <NavBar />}
        </>
      ) : (
        <PCLanding />
      )}
    </div>
  );
}

export default App;
