//landings
import LandingPage from '../landings/LandingPage';

//pages/auth
import LoginPage from '../pages/auth/LoginPage.jsx'
import Signup from '../pages/auth/Signup'

//pages/hub
import HubPage from '../pages/hub/HubPage';
import RemotePage from '../pages/hub/RemotePage';
import AddHubPage from '../pages/hub/AddHubPage';

//pages/main
import MainPage from '../pages/main/MainPage';

//pages/routine
import RoutinePage from '../pages/routine/RoutinePage';

//pages/setting
import SettingPage from '../pages/setting/SettingPage';


const routes = [
  {
    path:'/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path:'/hubs',
    element: <HubPage />
  },
  {
    path:'/hubs/:id',
    element: <RemotePage />
  },
  {
    path:'/addhub',
    element: <AddHubPage /> 
  },
  {
    path:'/main',
    element: <MainPage />
  },
  {
    path:'/routine',
    element: <RoutinePage />
  },
  {
    path:'/setting',
    element: <SettingPage />
  },
]

export default routes;