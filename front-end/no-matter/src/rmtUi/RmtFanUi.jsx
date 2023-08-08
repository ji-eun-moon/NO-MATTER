import React, {useState, useEffect} from 'react'
import GoBack from '../components/GoBack.jsx'
import { ButtonBase, Fab, Box, Modal, Button, InputLabel, MenuItem,
        FormControl, Select } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; // +

  

function RmtFanUi() {
  const [isOn, setIsOn] = useState(false);
  // 공유, 저장, 수정 버튼
  const [btnData, setBtnData] = useState({asdf:'adsf'})
  const [isModify, setIsModify] = useState(false)
  const [isNew, setIsNew] = useState(0)

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

  useEffect(() => {
    let intervalId
    if (isSelect) {
      intervalId = setInterval(() => {
        console.log('on')
        setIsSelect(false)
        btnSetting(btnName)
        setIsModify(true)
      }, 2000)
    } else {
      clearInterval(intervalId)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [isSelect])

  const btnSetting = (btnname) => {
    console.log(btnname)
  }
  // 버튼 꾹 누르면 설정 끝

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
          <div className='d-flex mb-5'>
            <GoBack />
            <h1 className="font-700">선풍기</h1>
          </div>
          <div>
            {
              isNew === 0 ? 
              <button 
                className='mb-3 btn'
                style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
                onClick={remoteSave}
                >저장하기
              </button> : 
              (
                isModify === true ? 
                <button 
                  className='mb-3 btn'
                  style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
                  onClick={remoteModify}
                  >저장하기
                </button> : 
                <button 
                  className='mb-3 btn'
                  style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
                  onClick={remoteShare}
                  >공유하기
                </button>
              )
            }
          </div>
        </div>
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