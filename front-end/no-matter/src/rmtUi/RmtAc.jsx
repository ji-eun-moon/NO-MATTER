import React, { useState, useEffect } from 'react';
import './RmtAc.scss'
import GoBack from '../components/GoBack.jsx'

function RmtAc() {
  const [isOn, setIsOn] = useState(false);
  const [temperature, setTemperature] = useState(25);
  const [windSpeed, setWindSpeed] = useState(1);

  // 공유, 저장, 수정 버튼
  const [btnData, setBtnData] = useState({asdf:'adsf'})
  const [isModify, setIsModify] = useState(false)
  const [isNew, setIsNew] = useState(0)

  const getBtnData = () => {
    // axios 추가 필요
    setIsNew(Object.keys(btnData).length)
  }

  useEffect(() => {
    console.log(1)
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


  const increaseTemperature = () => {
    setTemperature((prevTemperature) => prevTemperature + 1);
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemperature) => prevTemperature - 1);
  };

  const increaseWindSpeed = () => {
    setWindSpeed((prevWindSpeed) => (prevWindSpeed < 4 ? prevWindSpeed + 1 : prevWindSpeed));
  };
  

  const decreaseWindSpeed = () => {
    setWindSpeed((prevWindSpeed) => (prevWindSpeed > 1 ? prevWindSpeed - 1 : prevWindSpeed));
  };

  const handleTurnOn = () => {
    // 에어컨 켜는 API
    setIsOn(true);
    console.log('에어컨을 켭니다.');
  };

  const handleTurnOff = () => {
    // 에어컨 끄는 API
    console.log('에어컨을 끕니다.');
    setIsOn(false);
  };

  const filledFanImages = Array.from({ length: windSpeed }, (_, index) => (
    <img key={index} src='/images/fan-filled.png' style={{ width: '30px' }} className='fan-image me-1' />
  ));

  const emptyFanImages = Array.from({ length: 4 - windSpeed }, (_, index) => (
    <img key={index} src='/images/fan.png' style={{ width: '30px' }} className='fan-image me-1' />
  ));

  return (
    <div className='page-container container'>
      <div className='d-flex flex-column mt-5'>

        <div className='d-flex justify-content-between'>
          <div className='d-flex mb-5'>
            <GoBack />
            <h1 className="font-700">에어컨</h1>
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
      
      <div className='ac-body' style={{width:"100%"}}>
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
            <div onClick={handleTurnOff} className='flex-column centered'
            onTouchStart={()=>{onTouchStart('turnoff')}}
            onTouchEnd={()=>{onTouchEnd()}}>
              <img src='/images/turnon.png' style={{width:"80px"}}/>
              {/* <p style={{fontSize:"30px", fontWeight:"500"}}>OFF</p> */}
            </div>
            ) : (
            <div onClick={handleTurnOn} className='flex-column centered'
            onTouchStart={()=>{onTouchStart('turnon')}}
            onTouchEnd={()=>{onTouchEnd()}}>
              <img src='/images/turnoff.png' style={{width:"80px"}}/>
              {/* <p style={{fontSize:"30px", fontWeight:"500"}}>ON</p> */}
            </div>
          )}
        </div>
        
        <div className='d-flex justify-content-around'>
          <div className='d-flex flex-column centered'>
              <div onClick={increaseTemperature} className='control-button-up centered'
              onTouchStart={()=>{onTouchStart('tempup')}}
              onTouchEnd={()=>{onTouchEnd()}}>
                <i class="bi bi-chevron-up fs-1"></i>
              </div>
            <p style={{fontSize:"25px", fontWeight:"700", margin:"16px 0px"}}>온도</p>
              <div onClick={decreaseTemperature} className='control-button-down centered'
              onTouchStart={()=>{onTouchStart('tempdown')}}
              onTouchEnd={()=>{onTouchEnd()}}>
                <i class="bi bi-chevron-down fs-1"></i>
              </div>
          </div>

          <div className='d-flex flex-column centered'>
            <div onClick={increaseWindSpeed} className='control-button-up centered'
            onTouchStart={()=>{onTouchStart('windup')}}
            onTouchEnd={()=>{onTouchEnd()}}>
              <i class="bi bi-chevron-up fs-1"></i>
            </div>
              <p style={{fontSize:"25px", fontWeight:"700", margin:"16px 0px"}}>바람</p>
            <div onClick={decreaseWindSpeed} className='control-button-down centered'
            onTouchStart={()=>{onTouchStart('winddown')}}
            onTouchEnd={()=>{onTouchEnd()}}>
              <i class="bi bi-chevron-down fs-1"></i>
            </div>
          </div>
        </div>

        <div className='d-flex justify-content-around mt-4'>
          <button className='btn mode-btn btn-lg'
          onTouchStart={()=>{onTouchStart('mode1')}}
          onTouchEnd={()=>{onTouchEnd()}}>mode 1</button>
          <button className='btn mode-btn btn-lg'
          onTouchStart={()=>{onTouchStart('mode2')}}
          onTouchEnd={()=>{onTouchEnd()}}>mode 2</button>
          <button className='btn mode-btn btn-lg'
          onTouchStart={()=>{onTouchStart('mode3')}}
          onTouchEnd={()=>{onTouchEnd()}}>mode 3</button>
        </div>

      </div>
      </div>
    </div>
  );
}

export default RmtAc