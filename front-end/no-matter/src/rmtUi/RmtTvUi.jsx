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

import { Box, Modal, Button, TextField } from '@mui/material';

function RmtTvUi(props) {
  const navigate = useNavigate();
  const isCreate = props.isCreate

  const [open, setOpen] = React.useState(false);

  // 공유, 저장, 수정 버튼
  const [isModify, setIsModify] = useState(false)
  const [notSave, setNotSave] = useState(false)
  const [rmtName, setRmtName] = useState(props.remoteName)
  const [rmtCode, setRmtCode] = useState('')
  const [saveRmtName, setSaveRmtName] = useState('')
  const [saveRmtCode, setSaveRmtCode] = useState('')
  const [isNameSet, setIsNameSet] = useState(false)
  const [handleBtn, setHandleBtn] = useState('')
  const [isAddComplete, setIsAddComplete] = useState(false)
  const [isAddCompleteModal, setIsAddCompleteModal] = useState(false)


  useEffect(() => {
    if (props.remoteName === '') {
      setIsNameSet(true)
    } else {
      setSaveRmtName(props.remoteName)
      setSaveRmtCode(props.remoteCode)
    }
  }, [])

  const hubId = props.hubId

  const remoteSave = () => {
    setNotSave(false)
      axiosInstance({
        method : 'POST',
        url : '/remote/register',
        data: {
            "hubId" : hubId,
            "controllerName" : saveRmtName,
            "remoteType" : "TV",
            "remoteCode" : saveRmtCode
        }
      })
      .then(() => {
        navigate(-1)
      })
  }

  const handleClose = () => {
    setOpen(false);
    setIsAddCompleteModal(false)
  };

  const handleClick = (e) => {
    if (isCreate) {
      setOpen(true)
      setIsModify(true)
      setHandleBtn(e)
      props.publishMessage(`${saveRmtCode}/${e}`)
    } else {
      props.publishMessage(`${saveRmtCode}/${e}`)
    }
  }

  useEffect(() => {
    if (isCreate) {
      let msg = props.receiveMessage
      let msgSlice = msg.split('/')
      let msglength = msgSlice.length
      let receivedMessage = msgSlice[msglength - 1]
      if (receivedMessage === '#TRUE') {
        setIsAddComplete(true)
        setOpen(false)
        setIsAddCompleteModal(true)
      } else if (receivedMessage === '#FALSE') {
        setIsAddComplete(false)
        setOpen(false)
        setIsAddCompleteModal(true)
      }
    }
  }, [props.receiveMessage])

  const onNameChange = useCallback((event) => {
    setRmtName(event.currentTarget.value)
  }, [])

  const onCodeChange = useCallback((event) => {
    setRmtCode(event.currentTarget.value)
  }, [])

  const settingRmtName = () => {
    if (rmtCode !== '' && rmtName !== '') {
      setSaveRmtName(rmtName)
      setSaveRmtCode(rmtCode)
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
  const tenkeyButtonName = ['KEY_1', 'KEY_2', 'KEY_3', 'KEY_4', 'KEY_5', 'KEY_6'
  , 'KEY_7', 'KEY_8', 'KEY_9', '-', 'KEY_0']

  return(
    <div className='page-container container'>
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
              <h2 id="child-modal-title">리모컨의 이름과 제품코드를 입력해주세요</h2>
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
                  <TextField
                  id="filled-basic"
                  label="리모컨 제품코드"
                  variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' } }}
                  value={rmtCode}
                  onChange={onCodeChange}
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
                <TextField
                  id="filled-basic"
                  label="리모컨 제품코드"
                  variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' } }}
                  value={rmtCode}
                  onChange={onCodeChange}
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
              허브를 향해<br/>리모컨 버튼을 3번 눌러주세요
            </p>
            <div style={{display: 'flex', justifyContent:'flex-end'}}>
              <Button onClick={handleClose}>취소</Button>
            </div>
          </Box>
        </Modal> : null
        }
        {
          isAddComplete ? 
          <Modal
            open={isAddCompleteModal}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...modalStyle, width: 300 }}>
              <h2 id="child-modal-title">버튼을 등록을 완료했습니다</h2>
              <p id="child-modal-description">
                확인을 눌러주세요
              </p>
              <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <Button onClick={handleClose}>확인</Button>
              </div>
            </Box>
          </Modal> : 
          <Modal
            open={isAddCompleteModal}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...modalStyle, width: 300 }}>
              <h2 id="child-modal-title">버튼 등록에 실패했습니다</h2>
              <p id="child-modal-description">
                다시 시도해 주세요
              </p>
              <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <Button onClick={handleClose}>확인</Button>
              </div>
            </Box>
          </Modal>
          }
      
      <button className="ten-key-button" onClick={() => {handleClick('KEY_POWER')}} style={{borderRadius: '50px', paddingBottom:'17px'}}><PowerSettingsNewRoundedIcon/></button>
      <div></div>
      <div></div>

      {
        tenkey.map((i, key) => {
          return (
            <button key={key} className="ten-key-button" 
            onClick={() => {handleClick(tenkeyButtonName[key])}}>{i}</button>
          )
        })
      }

      <button className="ten-key-button" 
      onClick={() => {handleClick('channelback')}}
      style={{paddingTop:'0', paddingBottom:'0'}}>이전<br/>채널</button>
      
      <div className="button-box">
        <button className="func-button" 
        onClick={() => {handleClick("KEY_UP")}}><AddIcon/></button>

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
    </div>
  )
}

export default RmtTvUi;
