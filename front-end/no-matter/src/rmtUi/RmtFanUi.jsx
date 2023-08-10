import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import GoBack from '../components/GoBack.jsx'
import { Box, Modal, Button } from "@mui/material";

  
function RmtFanUi() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const [isAdd, setIsAdd] = useState(false)
  const [isOn, setIsOn] = useState(false);
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
    console.log('mod', btnname)
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

  const handleTurnOn = () => {
    // 선풍기 켜는 API
    setIsOn(true);
    console.log('on');
  };

  const handleTurnOff = () => {
    // 선풍기 끄는 API
    console.log('off');
    setIsOn(false);
  };

  const filledFanImages = Array.from(() => (
    <img src='/images/fan-filled.png' style={{ width: '30px' }} className='fan-image me-1' />
  ));

  return (
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
            <h1 className="font-700">선풍기</h1>
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
        <div style={{borderWidth:'1px', borderRadius:'50px', borderStyle:'solid', borderColor:'hwb(0 58% 42%)', backgroundColor:'#FCFCFC', padding:'30px'}}>
          <div className='mt-3 mb-5 d-flex justify-content-between'>
            {isOn ? (
              <div onClick={handleTurnOff} className='flex-column centered'
              onTouchStart={()=>{onTouchStart('turnoff')}}
              onTouchEnd={()=>{onTouchEnd()}}>
                <img src='/images/turnon.png' style={{width:"80px"}}/>
              </div>
              ) : (
              <div onClick={handleTurnOn} className='flex-column centered'
              onTouchStart={()=>{onTouchStart('turnon')}}
              onTouchEnd={()=>{onTouchEnd()}}>
                <img src='/images/turnoff.png' style={{width:"80px"}}/>
              </div>
            )}
            <div className='flex-column centered'
              onTouchStart={()=>{onTouchStart('windspeed')}}
              onTouchEnd={()=>{onTouchEnd()}}
              style={{width: '80px', height:'80px', borderWidth:'3px', borderRadius:'50px', borderStyle:'solid', borderColor:'hwb(0 58% 42%)', backgroundColor:'#FCFCFC'}}>
              <img src='/images/fan.png' style={{ width: '80%', marginBottom:'8px' }}/>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <div className='flex-column centered'
              onTouchStart={()=>{onTouchStart('timer')}}
              onTouchEnd={()=>{onTouchEnd()}}
              style={{width: '80px', height:'80px', borderWidth:'3px', borderRadius:'50px', borderStyle:'solid', borderColor:'hwb(0 58% 42%)', backgroundColor:'#FCFCFC'}}>
              <img src='/images/timers.png' style={{ width: '80%', marginRight: '8px' }}/>
            </div>
            <div className='flex-column centered'
              onTouchStart={()=>{onTouchStart('mode')}}
              onTouchEnd={()=>{onTouchEnd()}}
              style={{width: '80px', height:'80px', borderWidth:'3px', borderRadius:'50px', borderStyle:'solid', borderColor:'hwb(0 58% 42%)', backgroundColor:'#FCFCFC'}}>
              <img src='/images/shuffle-arrows.png' style={{ width: '80%' }}/>
            </div>
            <div className='flex-column centered'
              onTouchStart={()=>{onTouchStart('rotatefan')}}
              onTouchEnd={()=>{onTouchEnd()}}
              style={{width: '80px', height:'80px', borderWidth:'3px', borderRadius:'50px', borderStyle:'solid', borderColor:'hwb(0 58% 42%)', backgroundColor:'#FCFCFC'}}>
              <img src='/images/rotatefan.png' style={{ width: '80%' }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RmtFanUi