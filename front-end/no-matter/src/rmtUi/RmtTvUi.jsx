import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import GoBack from '../components/GoBack.jsx'
import axiosInstance from '../config/axios'

import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded'; // 전원
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'; // 위 방향
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'; // 아래 방향
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'; // 음소거
import AddIcon from '@mui/icons-material/Add'; // +
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'; // -

import './RmtTvUi.css'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function RmtTvUi(props) {
  const navigate = useNavigate();
  const isCreate = props.isCreate

  const [open, setOpen] = React.useState(false);

  // 공유, 저장, 수정 버튼
  const [isModify, setIsModify] = useState(false)
  const [notSave, setNotSave] = useState(false)
  const [rmtName, setRmtName] = useState(props.remoteName)
  const [saveRmtName, setSaveRmtName] = useState('')
  const [isNameSet, setIsNameSet] = useState(false)

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = 30000 / 100; 
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        return oldProgress + 1;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);


  
  useEffect(() => {
    if (props.remoteName === '') {
      setIsNameSet(true)
    } else (
      setSaveRmtName(props.remoteName)
    )
  }, [])

  const hubId = props.hubId

  const remoteSave = () => {
    setNotSave(false)

    setTimeout(() => {
      axiosInstance({
        method : 'POST',
        url : '/remote/register',
        data: {
            "hubId" : hubId,
            "controllerName" : saveRmtName,
            "remoteType" : "TV",
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
      
    }, 30000);
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
      props.publishMessage(`${saveRmtName}/${e}`)
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

  const tenkey = [1, 2, 3, 4, 5, 6, 7, 8, 9, '-', 0]

  return(
    // <div className='page-container container'>
    <>
    {!notSave ? 
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
            {/* <LinearProgress variant="determinate" value={progress} /> */}
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </Box>
        </div>
      </div>    
      
      :      

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
              </button> : 
              null
            }
          </div>
        </div>
      <hr />
      <div className="RmtTvUi">
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
      
      <button className="ten-key-button" onClick={() => {handleClick('on/off')}} style={{borderRadius: '50px', paddingBottom:'17px'}}><PowerSettingsNewRoundedIcon/></button>
      <div></div>
      <div></div>

      {
        tenkey.map((i, key) => {
          return (
            <button key={key} className="ten-key-button" 
            onClick={() => {handleClick(i)}}>{i}</button>
          )
        })
      }

      <button className="ten-key-button" 
      onClick={() => {handleClick('channelback')}}
      style={{paddingTop:'0', paddingBottom:'0'}}>이전<br/>채널</button>
      
      <div className="button-box">
        <button className="func-button" 
        onClick={() => {handleClick("soundup")}}><AddIcon/></button>

        <button className="text-button">음량</button>

        <button className="func-button" 
        onClick={() => {handleClick('sounddown')}}><HorizontalRuleIcon/></button>

      </div>
      <div className="button-box-center">
        <div className="blank-button"></div>
        <button className="mute-button" 
        onClick={() => {handleClick('mute')}}><VolumeOffRoundedIcon/></button>
        <div className="blank-button"></div>
      </div>
      <div className="button-box">

        <button className="func-button" 
        onClick={() => {handleClick('channelup')}}><ExpandLessRoundedIcon/></button>

        <button className="text-button">채널</button>

        <button className="func-button" 
        onClick={() => {handleClick('channeldown')}}><ExpandMoreRoundedIcon/></button>
      </div>
    </div>
    </div>
  // </div>
    }
    </>
  )
}

export default RmtTvUi;
