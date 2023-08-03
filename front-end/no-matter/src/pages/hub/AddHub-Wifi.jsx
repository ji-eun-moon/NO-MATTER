import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Wifi } from '@mui/icons-material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 5,
  px: 4,
  pb: 3,
};

function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="filled-basic" label="Wifi 이름" variant="filled" sx={{
    '& .MuiFilledInput-input': {
      backgroundColor: 'white'
    },
    '& .MuiFilledInput-root:hover .MuiFilledInput-input': {
      backgroundColor: 'white'
    },
    '& .MuiFilledInput-root.Mui-focused .MuiFilledInput-input': {
      backgroundColor: 'white'
    }
  }}/>
      <TextField id="filled-basic" label="Wifi 비밀번호" variant="filled" />
    </Box>
  );
}

function Send(){
  const WifiSubmit = () => {
    axios({

    })
    .then({

    })
    .catch({

    })
  }
  return(
    <Button onClick={WifiSubmit}>Send</Button>
  )
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Wifi 정보 입력하기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <img src='images/WifiGif.gif' alt='wifi gif' style={{width:"20px", height:"20px"}}></img>
          &nbsp;<span>연결할 와이파이 이름과 <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호를 입력해주세요</span>
          <br />
          <BasicTextFields />
          <div className="d-flex " style={{float:'right', marginTop:'10px'}}>
            <Send />
            <Button onClick={handleClose}>CLOSE</Button>
          </div>

        </Box>
      </Modal>
    </div>
  );
}


