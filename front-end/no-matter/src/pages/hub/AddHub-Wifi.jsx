import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Wifi } from '@mui/icons-material';
import axios from 'axios';
// import Bluetooth from './Bluetooth';

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

// const {name, setName} = useState("")
// const {password, setPassword} = useState("")

  // const handleWriteValue = (value) => {
  //   if (characteristic) {
  //     const data = new TextEncoder().encode(value);
  //     characteristic.writeValue(data)
  //       .then(() => {
  //         console.log('Data written successfully:', value);
  //         setCharacteristicValue(value);
  //       })
  //       .catch((error) => {
  //         console.error('Error writing data:', error);
  //       });
  //   }
  // };

  // const handleSend = () => {
  //   // 두 입력값을 합쳐서 하나의 값으로 보내는 경우
  //   const combinedValue = name + '/' + password;
  //   handleWriteValue(combinedValue);
  // };

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


export default function NestedModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const send = () => {
    axios({

    })
    .then({

    })
    .catch({

    })
  }

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
            <Button onClick={send}>SEND</Button>
            <Button onClick={handleClose}>CLOSE</Button>
          </div>

        </Box>
      </Modal>
    </div>
  );
}


