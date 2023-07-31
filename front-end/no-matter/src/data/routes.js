import MainPage from '../pages/main/MainPage';
import HubPage from '../pages/hub/HubPage';
import RoutinePage from '../pages/routine/RoutinePage';
import SettingPage from '../pages/setting/SettingPage';
import LandingPage from '../landings/LandingPage';
import RemotePage from '../pages/hub/RemotePage';

const routes = [
  {
    path:'/',
    element: <LandingPage />
  },
  {
    path:'/main',
    element: <MainPage />
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
    path:'/routine',
    element: <RoutinePage />
  },
  {
    path:'/setting',
    element: <SettingPage />
  },
]

export default routes;