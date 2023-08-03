//landings
import LandingPage from '../landings/LandingPage';

//pages/auth
import LoginPage from '../pages/auth/LoginPage.jsx'
import Signup from '../pages/auth/Signup'

//pages/hub
import HubPage from '../pages/hub/HubPage';
import RemotePage from '../pages/hub/RemotePage';
import AddHubPage from '../pages/hub/AddHubPage';
import AddRemote from '../pages/hub/AddRemote';

import RmtTvUi from '../rmtUi/RmtTvUi';
import RmtCustom from '../rmtUi/RmtCustom';

//pages/main
import MainPage from '../pages/main/MainPage';

//pages/routine
import RoutinePage from '../pages/routine/RoutinePage';

//pages/setting
import SettingPage from '../pages/setting/SettingPage';
import UserEditPage from '../pages/setting/UserEditPage';


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
    path:'/hubs/addrmt',
    element: <AddRemote />
  },
  {
    path:'/hubs/rmttv/1',
    element: <RmtTvUi />
  },
  {
    path:'/hubs/rmttv/0',
    element: <RmtTvUi />
  },
  {
    path:'/hubs/rmtcustom/1',
    element: <RmtCustom />
  },
  {
    path:'/hubs/rmtcustom/0',
    element: <RmtCustom />
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
  {
    path:'/setting/useredit',
    element: <UserEditPage />
  },
]

export default routes;