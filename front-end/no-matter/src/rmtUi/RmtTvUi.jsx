import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import GoBack from '../components/GoBack.jsx'

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


function RmtTvUi() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const [isAdd, setIsAdd] = useState(false)

  // 공유, 저장, 수정 버튼
  const [btnData, setBtnData] = useState({asdf:'adsf'})
  const [isModify, setIsModify] = useState(false)
  const [isNew, setIsNew] = useState(0)

  const [justBack, setJustBack] = useState(false)

  const getBtnData = () => {
    // axios 추가 필요
    setIsNew(Object.keys(btnData).length)
  }

  useEffect(() => {
    getBtnData()
  }, [])

  const remoteShare = () => {
    console.log('share')
  }

  const remoteSave = () => {
    console.log('Save')
  }

  const remoteModify = () => {
    console.log('modify')
  }
  // 공유, 저장, 수정 버튼 끝


  // 버튼 꾹 누르면 설정
  const [isSelect, setIsSelect] = useState(false)
  const [btnName, setBtnName] = useState('')

  const onTouchStart = (btnname) => {
    setIsSelect(true)
    setBtnName(btnname)
  }

  const onTouchEnd = () => {
    setIsSelect(false)
    setBtnName('')
  }
 
  let intervalId
  useEffect(() => {
    if (isSelect) {
      intervalId = setInterval(() => {
        if (isAdd === false) {
          setIsAdd(true)
        }
        setOpen(!open);
      }, 2000)
    } else {
      clearInterval(intervalId)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [isSelect])

  useEffect(() => {
    if (open) {
      console.log(open)
      btnSetting(btnName)
      setIsModify(true)
    }
  }, [open])
 
  const btnSetting = (btnname) => {
    console.log('mod',btnname)
  }
  // 버튼 꾹 누르면 설정 끝

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    console.log(e)
    // 신호를 입출력할 함수 필요
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',  
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const tenkey = [1, 2, 3, 4, 5, 6, 7, 8, 9, '-', 0]

  return(
    <div className='page-container container'>
      <div className='d-flex flex-column mt-5'>

        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            {
              isModify ? 
              <div onClick={() => setJustBack(true)}>
                <i className="bi bi-chevron-left fs-2 me-3"></i>
              </div> : <GoBack/>
            }
            <h1 className="font-700">TV</h1>
          </div>
          <div>
            {
              isNew === 0 ? 
              <button 
                className='btn'
                style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
                onClick={remoteSave}
                >저장하기
              </button> : 
              (
                isModify === true ? 
                <button 
                  className='btn'
                  style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
                  onClick={remoteModify}
                  >저장하기
                </button> : 
                <button 
                  className='btn'
                  style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
                  onClick={remoteShare}
                  >공유하기
                </button>
              )
            }
          </div>
        </div>
      <hr />
      <div className="RmtTvUi">
        <Modal
          open={justBack}
          onClose={() => setJustBack(false)}
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
              <Button onClick={() => setJustBack(false)}>취소</Button>
            </div>
          </Box>
        </Modal>
        {
          isAdd ? <Modal
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
            onClick={() => {handleClick(i)}}
            onTouchStart={()=>{onTouchStart(i)}}
            onTouchEnd={()=>{onTouchEnd()}}>{i}</button>
          )
        })
      }

      <button className="ten-key-button" 
      onClick={() => {handleClick('channelback')}}
      onTouchStart={()=>{onTouchStart('channelback')}}
      onTouchEnd={()=>{onTouchEnd()}}
      style={{paddingTop:'0', paddingBottom:'0'}}>이전<br/>채널</button>
      
      <div className="button-box">
        <button className="func-button" 
        onClick={() => {handleClick("soundup")}}
        onTouchStart={()=>{onTouchStart('soundup')}}
        onTouchEnd={()=>{onTouchEnd()}}><AddIcon/></button>

        <button className="text-button">음량</button>

        <button className="func-button" 
        onClick={() => {handleClick('sounddown')}}
        onTouchStart={()=>{onTouchStart('sounddown')}}
        onTouchEnd={()=>{onTouchEnd()}}><HorizontalRuleIcon/></button>

      </div>
      <div className="button-box-center">
        <div className="blank-button"></div>
        <button className="mute-button" 
        onClick={() => {handleClick('mute')}}
        onTouchStart={()=>{onTouchStart('mute')}}
        onTouchEnd={()=>{onTouchEnd()}}><VolumeOffRoundedIcon/></button>
        <div className="blank-button"></div>
      </div>
      <div className="button-box">

        <button className="func-button" 
        onClick={() => {handleClick('channelup')}}
        onTouchStart={()=>{onTouchStart('channelup')}}
        onTouchEnd={()=>{onTouchEnd()}}><ExpandLessRoundedIcon/></button>

        <button className="text-button">채널</button>

        <button className="func-button" 
        onClick={() => {handleClick('channeldown')}}
        onTouchStart={()=>{onTouchStart('channeldown')}}
        onTouchEnd={()=>{onTouchEnd()}}><ExpandMoreRoundedIcon/></button>
      </div>
    </div>
    </div>
  </div>
  )
}

export default RmtTvUi;
