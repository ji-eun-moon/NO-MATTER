// import React, {useState} from 'react';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';

// export default function DigitalClockBasic() {

//     const {time, setTime} = useState("")
//     const [hours, setHours] = useState(0)
//     const [minutes, setMinutes] = useState(0)
//     const onTimeChange = (newTime) => {
//         setHours(newTime.hours);
//         setMinutes(newTime.minutes);
//     }
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DigitalClock', 'MultiSectionDigitalClock']}>
//         <DemoItem label="Multi section digital clock">
//           <MultiSectionDigitalClock 
//           value={time}
//           onChange={onTimeChange}
//           sections={
//             [{ value: hours, step: 1, type: 'hours' },
//               { value: minutes, step: 1, type: 'minutes'}]
//           }/>
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



export default function VerticalTabs() {
  const [hour, setHour] = React.useState(0);
  const [minute, setMinute] = React.useState(0);
  const [ampm, setAmPm] = React.useState(0);

  const onHourChange = (event, hour) => {
    setHour(hour);
  };
  const onMinuteChange = (event, minute) => {
    setMinute(minute);
  };
  const onAmPmChange = (event, ampm) => {
    setAmPm(ampm);
  };

  return (
    <div>
        <p>스케줄</p>

   
        <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={hour}
            onChange={onHourChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
            <Tab label="1" />
            <Tab label="2" />
            <Tab label="3" />
            <Tab label="4" />
            <Tab label="5" />
            <Tab label="6" />
            <Tab label="7" />
            <Tab label="8" />
            <Tab label="9" />
            <Tab label="10"  />
            <Tab label="11"  />        
            <Tab label="12" />
        </Tabs>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={minute}
            onChange={onMinuteChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
            <Tab label="00" />
            <Tab label="05" />
            <Tab label="10" />
            <Tab label="15" />
            <Tab label="10" />
            <Tab label="25" />
            <Tab label="30" />
            <Tab label="35" />
            <Tab label="40" />
            <Tab label="45" />
            <Tab label="50"  />
            <Tab label="55"  />
        </Tabs>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={ampm}
            onChange={onAmPmChange}
            // sx={{ borderRight: 1, borderColor: 'divider' }}
        >
            <Tab label="AM" />
            <Tab label="PM" />
        </Tabs>
        </Box> 
    </div>
  );
}