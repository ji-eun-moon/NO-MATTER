import React, { useEffect, useState } from 'react';
import './App.scss';
import { isMobile } from 'react-device-detect';

// routes
import routes from './data/routes';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// components
import NavBar from './components/NavBar';
import PCLanding from './landings/PCLanding';

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

  return (
    <div>
      {isMobile ? (
        <>
          <div className='container'>
            <Routes>
              {routes.map((route) => {
                return <Route key={route.path} path={route.path} element={route.element} />;
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
