import MainPage from '../pages/MainPage';
import HubPage from '../pages/HubPage';
import RoutinePage from '../pages/RoutinePage';
import SettingPage from '../pages/SettingPage';
import LandingPage from '../landings/LandingPage';
import Signup from '../pages/Signup'

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
    path:'/hub',
    element: <HubPage />
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
    path: '/signup',
    element: <Signup />
  }
]

export default routes;