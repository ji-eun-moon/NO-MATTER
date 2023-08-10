//pages/hub
import HubPage from '../pages/hub/HubPage.jsx';
import RemotePage from '../pages/hub/RemotePage.jsx';
import HubMemberPage from '../pages/hub/HubMemberPage.jsx';
import AddHubPage from '../pages/hub/AddHubPage.jsx';
import AddRemote from '../pages/hub/AddRemote.jsx';

import RmtTvUi from '../rmtUi/RmtTvUi.jsx';
import RmtFanUi from '../rmtUi/RmtFanUi.jsx';
import RmtCustom from '../rmtUi/RmtCustom.jsx';
import RmtAc from '../rmtUi/RmtAc.jsx';

//pages/board
import BoardPage from '../pages/board/BoardPage.jsx';

//pages/main
import MainPage from '../pages/main/MainPage.jsx';

//pages/routine
import RoutinePage from '../pages/routine/RoutinePage.jsx';
import AddRoutinePage from '../pages/routine/AddRoutinePage.jsx';
import SchedulePage from '../pages/routine/SchedulePage.jsx'
import WeatherPage from '../pages/routine/WeatherPage.jsx'
import VoicePage from '../pages/routine/VoicePage.jsx'
import RoutineResult from '../pages/routine/RoutineResult.jsx';
import SelectTemp from '../pages/routine/SelectTemp.jsx';
import SelectHumid from '../pages/routine/SelectHumid.jsx';
import SelectWeather from '../pages/routine/SelectWeather.jsx';

//pages/setting
import SettingPage from '../pages/setting/SettingPage.jsx';
import UserEditPage from '../pages/setting/UserEditPage.jsx';


const routes = [
  {
    path:'/hubs',
    element: <HubPage />
  },
  {
    path:'/hubs/:id',
    element: <RemotePage />
  },
  {
    path:'/hubs/:id/member',
    element: <HubMemberPage />
  },
  {
    path:'/hubs/addhub',
    element: <AddHubPage /> 
  },
  {
    path:'/hubs/addrmt',
    element: <AddRemote />
  },
  {
    path:'/hubs/board',
    element: <BoardPage />
  },
  {
    path:'/hubs/rmttv',
    element: <RmtTvUi />
  },
  {
    path:'/hubs/rmtfan',
    element: <RmtFanUi />
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
    path:'/hubs/rmtac',
    element: <RmtAc />
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
    path:'/routine/addroutine',
    element: <AddRoutinePage /> 
  },
  {
    path: '/routine/schedule',
    element: <SchedulePage />
  },
  {
    path: '/routine/weather',
    element: <WeatherPage />
  },
  {
    path: '/routine/weather/temp',
    element: <SelectTemp />
  },
  {
    path: '/routine/weather/humid',
    element: <SelectHumid />
  },
  {
    path: '/routine/weather/weather',
    element: <SelectWeather />
  },
  {
    path: '/routine/voice',
    element: <VoicePage />
  },
  {
    path: '/routine/result',
    element: <RoutineResult />
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