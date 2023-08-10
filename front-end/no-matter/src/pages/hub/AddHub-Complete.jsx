import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input'; 


const ariaLabel = { 'aria-label': 'description' };

export default function Inputs() {
  return (   
    <div>
      <div className='centered'>
        <h2>허브의 이름을 설정해주세요.</h2>
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
        <Input  placeholder="허브 이름" inputProps={ariaLabel} />
      </Box>

    </div> 
  );
}