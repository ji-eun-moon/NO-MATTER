import React, {useState} from 'react';
import Box from '@mui/material/Box';
// import Input from '@mui/material/Input'; 
import TextField from '@mui/material/TextField';


const ariaLabel = { 'aria-label': 'description' };

export default function Inputs({onHubName}) {
  const [ hubName, setHubName ] = useState('')
  const HubNameHandler = (event) => {
    if(event.target.value.length <= 5){
      console.log(event.target.value)
      setHubName(event.target.value)
    }
  }
  console.log('hubName : ', hubName)
  onHubName(hubName)
  return (   
    <div>
      <div className='centered'>
        <h2 className='font-700'>허브의 이름을 설정해주세요.</h2>
      </div>
      <br />

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        style={{margin:"40px 20px 20px 5px"}}
        className='centered'
      >
      <TextField id="standard-basic" label="허브 이름(5자 이내)" variant="standard" value={hubName} onChange={HubNameHandler} />

        {/* <Input  placeholder="허브 이름(5자 이내)" inputProps={{ ...ariaLabel, maxLength: 5 }} /> */}
      </Box>

    </div> 
  );
}