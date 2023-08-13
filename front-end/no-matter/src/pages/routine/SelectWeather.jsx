import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/GoBack.jsx';
import './Routine.scss';
import Card from '../../components/Card.jsx';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function SelectWeather() {

  const navigate = useNavigate();
  const [selectedWeather, setSelectedWeather] = useState('0');

  const weathers = [
    {
      label: '맑은 날',
      condition: '0',
    },
    {
      label: '비 오는 날',
      condition: '1',
    },
    {
      label: '비/눈 오는 날',
      condition: '2',
    },
    {
      label: '눈 오는 날',
      condition: '3',
    },
  ];

  const handleChange = (event) => {
    setSelectedWeather(event.target.value);
    console.log(event.target.value)
  };

  const onSubmit = () => {
    const selectedCondition = weathers.find((item) => item.condition === selectedWeather)
    console.log(selectedCondition)
    navigate('/routine/result', { state: { kind: 'weather', condition: selectedCondition, editing: false} });
  };

  return (
    <div className='container page-container'>

      <div className='d-flex mt-5 mb-3'>
        <GoBack />
        <h1 className='font-700'>날씨 선택</h1>
      </div>
      <div className='d-flex justify-content-end container'>
        <button
          className='mb-3 btn'
          style={{ backgroundColor: '#0097B2', color: '#FCFCFC' }}
          onClick={onSubmit}
        >
          NEXT
        </button>
      </div>

      <div className='d-flex mb-5 mt-3 container' >
        <FormControl component='fieldset' style={{width:"100%"}}>
          {/* <FormLabel component='legend'>습도 레벨</FormLabel> */}
          <RadioGroup
            aria-label='weathers-level'
            name='weathers-level'
            value={selectedWeather}
            onChange={handleChange}
          >
            {weathers.map((item) => (
              <Card key={item.condition}>
                <div className='d-flex flex-column' style={{width:"100%"}}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center'>
                        <p style={{marginBottom:"0px", fontSize:"20px", fontWeight:"600"}}>{item.label}</p>
                      </div>
                      <FormControlLabel
                        key={item.condition}
                        value={item.condition}
                        control={<Radio />}
                        labelPlacement='start'
                      />
                    </div>
                </div>
              </Card>
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      

    </div>
  )
}

export default SelectWeather