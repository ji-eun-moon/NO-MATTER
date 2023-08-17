import React, { useCallback, useState, useEffect } from 'react';
import { Box, Modal, Button, TextField } from '@mui/material';
import axiosInstance from '../../config/axios'
import RssFeedIcon from '@mui/icons-material/RssFeed';

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

export default function NestedModal({ onWifi, characteristic, onHubUuId, gattServer }) {
  const [open, setOpen] = React.useState(true);
  const [success, setSuccess] = useState(false)
  const [isConnected, setIsConnected] = useState(false) // 와이파이 연결 여부
  const [isConnecting, setIsConnecting] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [characteristicValue, setCharacteristicValue] = useState('');

    const onNameChange = useCallback((event) => {
      setName(event.currentTarget.value)
      console.log(event.currentTarget.value)
    }, [])
    const onPwdChange = useCallback((event) => {
      setPassword(event.currentTarget.value)
      console.log(event.currentTarget.value)

    }, [])

    const handleWriteValue = useCallback((e) => {
      if (characteristic) {
        const data = new TextEncoder().encode(e);
        characteristic.writeValue(data)
          .catch(() => {
            console.log('연결중')
          })

        console.log('연결중')
        setTimeout(function () {
          characteristic.readValue()
            .then((value) => {
              const decodedValue = new TextDecoder().decode(value);
              console.log('Data written successfully:', decodedValue);
              setCharacteristicValue(decodedValue);
              onWifi(characteristicValue)
              if (decodedValue !== 'fail') {
                onHubUuId(decodedValue)
                setIsConnecting(false)
                setIsConnected(true)
                setSuccess(true)
              }
              else {
                console.log('wifi 이름과 비밀번호를 다시 입력해주세요')
                setIsConnecting(false)
                setIsConnected(false)
                handleOpen()
              }
            })
            .catch((error) => {
              console.log('Error writing data:', error);
            });
        }, 50000);
      }
    }, [characteristic, characteristicValue]);

    useEffect(() => {
      if (success) {        
        const data = new TextEncoder().encode('end');
        characteristic.writeValue(data)
          .catch(() => {
            setIsConnecting(true)
            setIsConnected(true)
          })
        setTimeout(function () {
          disconnectFromDevice()
        }, 5000);
      }
    }, [success]);

    const disconnectFromDevice = async () => {
      if (gattServer) {
        try {
          await gattServer.disconnect();

        }
        catch (error) {
          console.log(error)
        }
        handleClose()
      }
    };

    const send = () => {
      handleClose()
      axiosInstance({
        method: 'Get',
        url: '/user/view'
      })
        .then((response) => {
          const combinedValue = 'a' + '/' + name + '/' + password;
          setIsConnecting(true)
          setIsConnected(false)
          handleWriteValue(combinedValue);
        })
        .catch((error) => {
          console.log(error)
        })
    }

  return (
    <div>

    {(!isConnecting && !isConnected) ?          
    // 와이파이 정보 입력
      <div>
          <div className='flex-column centered mb-4'>
            <h3 style={{ marginLeft: "10px", fontWeight: "500" }}>Wi-Fi 정보 입력</h3>
            <br />
            <span style={{ marginLeft: "10px", fontWeight: "500" }}>허브에 연결할 Wi-Fi 정보를 입력하세요.</span>
          </div>
          <div className='centered'>
            <Button variant="contained" onClick={handleOpen} style={{ backgroundColor: "#0097B2" }}><RssFeedIcon className='me-2' />Wi-Fi</Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 300, position: "relative" }} style={{ borderRadius: "10px" }}>
              <i className="bi bi-x-lg" onClick={handleClose} style={{ position: 'absolute', top: 20, right: 20 }}></i>
              <br />
              <div className='d-flex align-items-center'>
                <img src='/images/WifiGif.gif' alt='wifi gif' style={{ width: "30px", height: "30px", marginRight: "10px" }}></img>
                <div>
                  <span>연결할 와이파이 이름과</span><br />
                  <span>비밀번호를 입력해주세요</span>
                </div>
              </div>
              <br />
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
                  variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' } }}
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

            </Box>
          </Modal>    
        </div>

        :
        ((isConnecting && isConnected) ?
            // 연결완료
            <div className='centered'>
              <div className='d-flex flex-column justify-content-center align-items-center'>
                <img src='/images/WifiPng.png' alt='wifi gif' style={{ width: "200px", height: "200px", marginTop: "50px", marginBottom: "10px"}}></img>
                <span style={{fontWeight:"bold", fontSize:"30px"}}>연결 완료</span>
              </div>
            </div>
          :
          // 연결 중
          <div className='centered'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <img src='/images/WifiGif.gif' alt='wifi gif' style={{ width: "200px", height: "200px", marginTop: "50px", marginBottom: "10px"}}></img>
              <span style={{fontWeight:"bold", fontSize:"30px"}}>연결 중</span>
            </div>
          </div>          
        )
      }
  </div> 
  );   

}

