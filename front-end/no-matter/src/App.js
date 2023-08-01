import React from 'react';
import './App.scss';
import { isMobile } from 'react-device-detect';

// routes
import routes from './data/routes';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

// components
import NavBar from './components/NavBar';
import PCLanding from './landings/PCLanding'
import LoginPage from './pages/auth/LoginPage.jsx'
import Signup from './pages/Signup'
import MainPage from './pages/MainPage'

function App() {
  const renderItems = () => {
    if(isMobile) {
      return (
        <BrowserRouter> 
          <div className='container'>
            <Routes>
              {routes.map((route) => {
                return <Route key={route.path} path={route.path} element={route.element} />
              })}
              <Route path="/login" element={ <LoginPage/> } />
              <Route path="/main" element={ <MainPage/> }/>
              <Route path = "/signup" element = {<Signup />} />
            </Routes>
          </div>
          <NavBar />
        </BrowserRouter>
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
