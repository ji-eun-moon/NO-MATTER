import React from 'react';
import './App.css';
import { isMobile } from 'react-device-detect';

// routes
import routes from './routes';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

// components
import NavBar from './components/NavBar';
import PCLanding from './landings/PCLanding'

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
            </Routes>
          </div>
          <NavBar/>
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
