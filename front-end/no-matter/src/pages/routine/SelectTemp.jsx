import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoBack from '../../components/GoBack.jsx'

import './Routine.scss'

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function SelectTemp() {
  const navigate = useNavigate();

  const [temperature, setTemperature] = useState(0);
  const [condition, setCondition] = useState('down'); // 선택한 기온 조건
  
  const handleChange = (event, newValue) => {
    setTemperature(newValue); // 슬라이더 값 변경 시 기온 업데이트
  };

  const handleConditionChange = (selectedCondition) => {
    setCondition(selectedCondition);
    // console.log(selectedCondition); 
  };

  const onSubmit = () => {
    navigate('/routine/result', { state: { kind: "temp", condition: { temperature : temperature, updown: condition } } });
  }

  return (
    <div className='container page-container'>
      <div className='d-flex mt-5 mb-3'>
        <GoBack />
        <h1 className="font-700">기온 선택</h1>
      </div>
      <div className='d-flex justify-content-end container'>
        <button 
              className='mb-3 btn'
              style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
              onClick={onSubmit}
              >NEXT</button>
      </div>

    <div className='container weather-container'>
      <div className='mb-5 mt-3 centered'>
        <div onClick={() => handleConditionChange('down')}
             className={`temp-btn down ${condition === 'down' ? 'selected' : ''}`} 
             style={{width:"50%"}}>
          미만
        </div>
        <div onClick={() => handleConditionChange('up')}
             className={`temp-btn up ${condition === 'up' ? 'selected' : ''}`}
            style={{width:"50%"}}>
          초과
        </div>
      </div>

      <div className='flex-column centered'>
        <div className='d-flex'>
          <h1 className='me-2 font-700'>{temperature}</h1>
          <h1 className='text-secondary'>°C</h1>
        </div>
        <Box width={300} mt={2}>
          <Slider
            value={temperature}
            min={-40} // 최소 기온
            max={40} // 최대 기온
            step={1} // 기온 변경 단위
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="temperature-slider"
          />
        </Box>
        <div className='d-flex justify-content-between' style={{width:"100%"}}>
          <p className='text-secondary'>-40°C</p>
          <p className='text-secondary'>40°C</p>
        </div>
      </div>
    </div>

    </div>
  )
}

export default SelectTemp