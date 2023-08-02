import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

export default function Inputs() {
  return (   
    <div>
      <span>허브의 이름을 설정해주세요</span>
      <br />

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Input placeholder="허브 이름" inputProps={ariaLabel} />
      </Box>

    </div> 
  );
}