// import React, {useCallback, useState} from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';
// // import Bluetooth from './Bluetooth';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 300,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   pt: 5,
//   px: 4,
//   pb: 3,
// };

// // const {name, setName} = useState("")
// // const {password, setPassword} = useState("")

//   const handleWriteValue = (value) => {
//     if (characteristic) {
//       const data = new TextEncoder().encode(value);
//       characteristic.writeValue(data)
//         .then(() => {
//           console.log('Data written successfully:', value);
//           setCharacteristicValue(value);
//         })
//         .catch((error) => {
//           console.error('Error writing data:', error);
//         });
//     }
//   };

//   const handleSend = () => {
//     // 두 입력값을 합쳐서 하나의 값으로 보내는 경우
//     const combinedValue = name + '/' + password;
//     handleWriteValue(combinedValue);
//   };



// function BasicTextFields() {
//   const {name, setName} = useState("")
//   const {password, setPassword} = useState("")

//   const onNameChange  = useCallback((event) => {
//     setName(event.currentTarget.value)
//   },[name])
//   const onPwdChange  = useCallback((event) => {
//     setPassword(event.currentTarget.value)
//   },[password])

//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField 
//         id="filled-basic" 
//         label="Wifi 이름" 
//         variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' }}}
//         value={name}
//         onChange={onNameChange}
//         required
//         autoFocus
//       />
//       <TextField 
//         id="filled-basic" 
//         label="Wifi 비밀번호" 
//         variant="filled" 
//         value={password}
//         onChange={onPwdChange}
//         required
//       />
//     </Box>
//   );
// }


// export default function NestedModal() {
//   const [open, setOpen] = React.useState(true);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const send = () => {
//     axios({

//     })
//     .then({

//     })
//     .catch({

//     })
//   }

//   return (
//     <div>
//       <Button onClick={handleOpen}>Wifi 정보 입력하기</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box sx={{ ...style, width: 300 }}>
//           <img src='images/WifiGif.gif' alt='wifi gif' style={{width:"20px", height:"20px"}}></img>
//           &nbsp;<span>연결할 와이파이 이름과 <br />
//           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호를 입력해주세요</span>
//           <br />
//           <BasicTextFields />
//           {/* <div className="d-flex " style={{float:'right', marginTop:'10px'}}>
//             <Button onClick={send}>SEND</Button>
//             <Button onClick={handleClose}>CLOSE</Button>
//           </div> */}

//         </Box>
//       </Modal>
//     </div>
//   );
// }












import React, {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axiosInstance from '../../config/axios'
import { useSelector, useDispatch } from 'react-redux'

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

export default function NestedModal({onWifi, characteristic}) {  
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function BasicTextFields() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [characteristicValue, setCharacteristicValue] = useState('');
    // const [characteristic, setCharacteristic] = useState(null);
    const onNameChange  = useCallback((event) => {
      setName(event.currentTarget.value)
      console.log(event.currentTarget.value)
    },[])
    const onPwdChange  = useCallback((event) => {
      setPassword(event.currentTarget.value)
      console.log(event.currentTarget.value)

    },[])

    const handleWriteValue = useCallback((value) => {
      console.log('char', characteristic)
      if (characteristic) {
        const data = new TextEncoder().encode(value);
        characteristic.writeValue(data)
          .then(() => {
            console.log('Data written successfully:', value);
            setCharacteristicValue(value);
            onWifi(characteristicValue)
          })
          .then((characteristic) => {
            if(characteristic.readValue()==='success'){
              handleClose()
            }
            else{
              console.log('wifi 이름과 비밀번호를 다시 입력해주세요')
            }
          }
          )
          .catch((error) => {
            console.error('Error writing data:', error);
          });
      }
    }, [characteristic, characteristicValue]);

    const send = () => {
      axiosInstance({
        method : 'Get',
        url : 'http://localhost:8080/api/v1/user/view'
      })
      .then((response)=>{

        const str = response.data
        let startBracket = str.indexOf('(');
        let endBracket = str.indexOf(')');
        let properties = str.slice(startBracket + 1, endBracket).split(', ');

        let memberIdProperty = properties.find(property => property.startsWith('memberId'));
        let memberId = memberIdProperty.split('=')[1];
        const combinedValue = memberId + '/' + name + '/' + password;

        console.log('mem',combinedValue)
        handleWriteValue(combinedValue);
      })
      .catch((error) => {
        console.log(error)
      })
    }

    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          id="filled-basic" 
          label="Wifi 이름" 
          variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' }}}
          value={name}
          onChange={onNameChange}
          required
          autoFocus
        />
        <TextField 
          id="filled-basic" 
          label="Wifi 비밀번호" 
          variant="filled" 
          value={password}
          onChange={onPwdChange}
          required
        />      
        <Button onClick={send}>SEND</Button>
      </Box>      
    );
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
        <Box sx={{ ...style, width: 300, position:"relative" }}>
          <i className="bi bi-x-lg" onClick={handleClose} style={{ position: 'absolute', top: 20, right: 20 }}></i>
          <br />
          <div className='d-flex align-items-center'>
            <img src='/images/WifiGif.gif' alt='wifi gif' style={{width:"30px", height:"30px", marginRight:"10px"}}></img>
            <div>
              <span>연결할 와이파이 이름과</span><br />
              <span>비밀번호를 입력해주세요</span>
            </div>
          </div>
          <br />
          <BasicTextFields />
        </Box>
      </Modal>
    </div>
  );
}


