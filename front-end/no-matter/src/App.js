import React from 'react';

import './App.scss';
import { isMobile } from 'react-device-detect';

// firebase
import './firebase-messaging-sw.js'

// routes
import routes from './data/routes';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
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
  const currentPath = location.pathname;

  const isNavBarVisible = isMobile && currentPath !== '/' && currentPath !== '/login' && currentPath !== '/signup';

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
