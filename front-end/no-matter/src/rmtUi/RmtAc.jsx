import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './RmtAc.scss'
import axiosInstance from '../config/axios'

import GoBack from '../components/GoBack.jsx'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function RmtAc(props) {
  const navigate = useNavigate();
  const isCreate = props.isCreate

  const [open, setOpen] = React.useState(false);

  const [isOn, setIsOn] = useState(false);
  const [temperature, setTemperature] = useState(25);
  const [windSpeed, setWindSpeed] = useState(1);

  // 공유, 저장, 수정 버튼
  const [isModify, setIsModify] = useState(false)
  const [notSave, setNotSave] = useState(false)

  const [rmtName, setRmtName] = useState('')
  const [saveRmtName, setSaveRmtName] = useState('')
  const [isNameSet, setIsNameSet] = useState(false)

  const [progress, setProgress] = React.useState(0);


  useEffect(() => {
    if (props.remoteName === '') {
      setIsNameSet(true)
    } else (
      setSaveRmtName(props.remoteName)
    )
  }, [])

  // React.useEffect(() => {
  //   const interval = 30000 / 100; 
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         clearInterval(timer);
  //         return 100;
  //       }
  //       return oldProgress + 1;
  //     });
  //   }, interval);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const hubId = props.hubId

  const remoteSave = () => {
    console.log('Save');
    setNotSave(false);

    // setTimeout(() => {
      axiosInstance({
        method : 'POST',
        url : '/remote/register',
        data: {
            "hubId" : hubId,
            "controllerName" : saveRmtName,
            "remoteType" : "AC",
            "remoteCode" : "A1B2C3D4"
        }
      })
      .then((res) => {
        console.log(res)
        navigate(-2)
      })
      .catch((err) => {
        console.log(err)
      })      
    // }, 30000);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    if (isCreate) {
      setOpen(true)
      setIsModify(true)
      props.publishMessage(`${saveRmtName}/${e}`)
    } else {
        if(isOn){
          props.publishMessage(`${saveRmtName}/${e}`)
        }
    }
  }

  const onNameChange = useCallback((event) => {
    setRmtName(event.currentTarget.value)
    // console.log(event.currentTarget.value)
  }, [])

  const settingRmtName = () => {
    if (rmtName !== '') {
      setSaveRmtName(rmtName)
      setIsNameSet(false)
    }
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',  
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const increaseTemperature = () => {
    if (isCreate) {
      setOpen(true)
      setIsModify(true)
      props.publishMessage(`${saveRmtName}/increaseTemperature`)
    } else {
        if(isOn){
          setTemperature((prevTemperature) => prevTemperature + 1);
          props.publishMessage(`${saveRmtName}/increaseTemperature`)
        }
    }
  };

  const decreaseTemperature = () => {
    if (isCreate) {
      setOpen(true)
      setIsModify(true)
      props.publishMessage(`${saveRmtName}/decreaseTemperature`)
    } else {
        if(isOn){
          setTemperature((prevTemperature) => prevTemperature - 1);
          props.publishMessage(`${saveRmtName}/decreaseTemperature`)
        }
    }
  };

  const increaseWindSpeed = () => {
    if (isCreate) {
      setOpen(true)
      setIsModify(true)
      props.publishMessage(`${saveRmtName}/increaseWindSpeed`)
    } else {
        if(isOn){
          setWindSpeed((prevWindSpeed) => (prevWindSpeed < 4 ? prevWindSpeed + 1 : prevWindSpeed));
          props.publishMessage(`${saveRmtName}/increaseWindSpeed`)
        }
    }
  };
  

  const decreaseWindSpeed = () => {
    if (isCreate) {
      setOpen(true)
      setIsModify(true)
      props.publishMessage(`${saveRmtName}/decreaseWindSpeed`)
    } else {
        if(isOn){
          setWindSpeed((prevWindSpeed) => (prevWindSpeed > 1 ? prevWindSpeed - 1 : prevWindSpeed));
          props.publishMessage(`${saveRmtName}/decreaseWindSpeed`)
        }
    }
  };

  const handleTurnOn = () => {
    if (isCreate) {
      setOpen(true)
      setIsModify(true)
      props.publishMessage(`${saveRmtName}/TurnOn`)
    } else {
      setIsOn(true);
      props.publishMessage(`${saveRmtName}/TurnOn`)
    }
  };

  const handleTurnOff = () => {
    if (isCreate) {
      setOpen(true)
      setIsModify(true)
      props.publishMessage(`${saveRmtName}/TurnOff`)
    } else {
      setIsOn(false);
      props.publishMessage(`${saveRmtName}/TurnOff`)
    }
  };

  const filledFanImages = Array.from({ length: windSpeed }, (_, index) => (
    <img key={index} src='/images/fan-filled.png' style={{ width: '30px' }} className='fan-image me-1' />
  ));

  const emptyFanImages = Array.from({ length: 4 - windSpeed }, (_, index) => (
    <img key={index} src='/images/fan.png' style={{ width: '30px' }} className='fan-image me-1' />
  ));

  return (
    // <div className='page-container container'>
    <>
    {/* {!notSave ? 
      <div className="container page-container">
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div style={{
            width: "500px",
            height: "500px",
            backgroundImage: `url("/images/logoGif.gif")`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            color: "black", // 텍스트 색상 설정,
            fontSize: "30px",
            fontWeight: "bold"
          }}>
            30초 정도 소요됩니다...
          </div>
          <Box sx={{ width: '100%' }}>
             <LinearProgress variant="determinate" value={progress} /> 
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </Box>
        </div>
      </div>    
      
      :       */}

      <div className='d-flex flex-column mt-5'>

        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            {
              isModify === true ?
              <div onClick={() => setNotSave(true)}>
                <i className="bi bi-chevron-left fs-2 me-3"></i>
              </div> : <GoBack/>
            }
            <h1 className="font-700">{saveRmtName}</h1>
          </div>
          <div>
            {
              isCreate === true ? 
              <button 
                className='btn'
                style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
                onClick={remoteSave}
                >저장하기
              </button> 
              : 
              null
            }
          </div>
        </div>
      <hr />
        { isCreate === true ?
          <Modal
          open={notSave}
          onClose={() => setNotSave(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          >
            <Box sx={{ ...modalStyle, width: 300 }}>
              <h2 id="child-modal-title">리모컨 선택화면으로 돌아갑니다</h2>
              <p id="child-modal-description">
                변경사항이 저장되지 않을수도 있습니다
              </p>
              <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <Button onClick={() => (navigate(-1))}>확인</Button>
                <Button onClick={() => setNotSave(false)}>취소</Button>
              </div>
            </Box>
          </Modal> : null
        }
        { isCreate === true ?
          <Modal
          open={isNameSet}
          onClose={() => setIsNameSet(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          >
            <Box sx={{ ...modalStyle, width: 300 }}>
              <h2 id="child-modal-title">리모컨의 이름을 입력해주세요</h2>
              {
                rmtName.length <= 5 ? 
                <div>
                  <TextField
                  id="filled-basic"
                  label="리모컨 이름"
                  variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' } }}
                  value={rmtName}
                  onChange={onNameChange}
                  autoFocus
                />
                <div style={{display: 'flex', justifyContent:'flex-end'}}>
                  <Button onClick={() => settingRmtName()}>확인</Button>
                  <Button onClick={() => navigate(-1)}>취소</Button>
                </div>
              </div> : 
              <div>
                <TextField
                  id="filled-basic"
                  label="리모컨 이름"
                  variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' } }}
                  value={rmtName}
                  onChange={onNameChange}
                  error={true}
                  helperText={'5글자 이하로 적어주세요'}
                  autoFocus
                />
                <div style={{display: 'flex', justifyContent:'flex-end'}}>
                  <Button onClick={() => navigate(-1)}>취소</Button>
                </div>
              </div>
              }
            </Box>
          </Modal> : null
        }
        {
          isCreate ? <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...modalStyle, width: 300 }}>
            <h2 id="child-modal-title">버튼을 등록합니다</h2>
            <p id="child-modal-description">
              허브를 향해<br/>리모컨 버튼을 눌러주세요
            </p>
            <div style={{display: 'flex', justifyContent:'flex-end'}}>
              <Button onClick={handleClose}>취소</Button>
            </div>
          </Box>
        </Modal> : null
        }

        <div style={{borderWidth:'1px', borderRadius:'50px', borderStyle:'solid', borderColor:'hwb(0 58% 42%)', backgroundColor:'#FCFCFC', padding:'30px'}}>
          <div>
            {isOn? (
              <div style={{backgroundColor:"#DCDBDB", borderRadius:"20px"}} className='py-4 flex-column centered'>
                <p style={{ fontSize:"50px", color:"black", fontWeight:"700"}}>{temperature}°C</p>
                {/* <p className='ac-wind-speed'>바람 세기: {windSpeed}</p>
                <img src='/images/fan.png' style={{width:"30px"}} className='fan-image'/> */}
                <div className='d-flex'>
                  {filledFanImages}
                  {emptyFanImages}
                </div>
              </div>
            ) : (
              <div style={{backgroundColor:"#DCDBDB", borderRadius:"20px"}} className='py-4 flex-column centered'>
                <p style={{ fontSize:"50px", color:"white", fontWeight:"700"}}>OFF</p>
              </div>
            )}
          </div>

          <div className='my-3'>
            {isOn ? (
              <div onClick={handleTurnOff} className='flex-column centered'>
                <img src='/images/turnon.png' style={{width:"80px"}}/>
                {/* <p style={{fontSize:"30px", fontWeight:"500"}}>OFF</p> */}
              </div>
              ) : (
              <div onClick={handleTurnOn} className='flex-column centered'>
                <img src='/images/turnoff.png' style={{width:"80px"}}/>
                {/* <p style={{fontSize:"30px", fontWeight:"500"}}>ON</p> */}
              </div>
            )}
          </div>
          
          <div className='d-flex justify-content-around'>
            <div className='d-flex flex-column centered'>
                <div onClick={() => {increaseTemperature()}} className='control-button-up centered'>
                  <i className="bi bi-chevron-up fs-1"></i>
                </div>
              <p style={{fontSize:"25px", fontWeight:"700", margin:"16px 0px"}}>온도</p>
                <div onClick={() => {decreaseTemperature()}} className='control-button-down centered'>
                  <i className="bi bi-chevron-down fs-1"></i>
                </div>
            </div>

            <div className='d-flex flex-column centered'>
              <div onClick={() => {increaseWindSpeed()}} className='control-button-up centered'>
                <i className="bi bi-chevron-up fs-1"></i>
              </div>
                <p style={{fontSize:"25px", fontWeight:"700", margin:"16px 0px"}}>바람</p>
              <div onClick={() => {decreaseWindSpeed()}} className='control-button-down centered'>
                <i className="bi bi-chevron-down fs-1"></i>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-around mt-4'>
            <button className='btn mode-btn btn-lg'
            onClick={() => {handleClick('mode1')}}>mode 1</button>
            <button className='btn mode-btn btn-lg'
            onClick={() => {handleClick('mode2')}}>mode 2</button>
            <button className='btn mode-btn btn-lg'
            onClick={() => {handleClick('mode3')}}>mode 3</button>
          </div>


        </div>
      </div>
    {/* // </div> 
    // */}
    </>
  );
}

export default RmtAc