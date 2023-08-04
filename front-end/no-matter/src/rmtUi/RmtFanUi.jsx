import React from 'react'
import { ButtonBase, Fab, Box, Modal, Button, InputLabel, MenuItem,
        FormControl, Select } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; // +
  

function RmtTvUi() {
  return (
    <div>
      <ButtonBase
      // key={test}
      component={Fab}
      color="primary"
      style={{ borderRadius: "50%" }}
      onClick={console.log(1)}
      >
        <AddIcon />
      </ButtonBase>
    </div>
  )
}

export default RmtTvUi