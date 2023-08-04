import React from 'react';
import './App.scss';
import { isMobile } from 'react-device-detect';

// routes
import routes from './data/routes';
import {
  BrowserRouter as
  Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// components
import NavBar from './components/NavBar';
import PCLanding from './landings/PCLanding'

//landings
import LandingPage from './landings/LandingPage';

//pages/auth
import LoginPage from './pages/auth/LoginPage.jsx'
import Signup from './pages/auth/Signup'


function App() {
  const isSessionValid = () => {
    return !!sessionStorage.getItem('authToken')
  };

  const renderItems = () => {
    if(isMobile) {
      return (
        <Router> 
          <div className='container'>
            <Routes>
              <Route path='/' element={<LandingPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/signup' element={<Signup/>}/>
              {routes.map((route) => {
                return (
                  <Route key={route.path} path={route.path} element={isSessionValid() ? 
                    (route.element) : (<Navigate to='/login' />)} />
                )
              })}
            </Routes>
          </div>
          <NavBar />
        </Router>
      )
    }
    return <PCLanding />
  }

  return(
    <div>
      {renderItems()}
    </div>
  )
}

export default App;
