import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/GoBack.jsx';
import './Routine.scss';
import Card from '../../components/Card.jsx';

import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

function SelectHumid() {
  const navigate = useNavigate();
  const [selectedHumidity, setSelectedHumidity] = useState('low');

  const humidity = [
    {
      label: '건조',
      detail: '0% ~ 40%',
      condition: 'low',
    },
    {
      label: '쾌적',
      detail: '40% ~ 70%',
      condition: 'middle',
    },
    {
      label: '고습',
      detail: '70% ~ 100%',
      condition: 'high',
    },
  ];

  const handleChange = (event) => {
    setSelectedHumidity(event.target.value);
  };

  const onSubmit = () => {
    const selectedCondition = humidity.find((item) => item.condition === selectedHumidity)
    navigate('/routine/result', { state: { kind: 'humidity', condition: selectedCondition, editing: false  } });
  };

  return (
    <div className='container page-container'>
      <div className='d-flex mt-5 mb-3'>
        <GoBack />
        <h1 className='font-700'>습도 선택</h1>
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
            aria-label='humidity-level'
            name='humidity-level'
            value={selectedHumidity}
            onChange={handleChange}
          >
            {humidity.map((item) => (
              <Card key={item.condition}>
                <div className='d-flex flex-column' style={{width:"100%"}}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center'>
                        <p style={{marginBottom:"0px", fontSize:"20px", fontWeight:"600"}}>{item.label}</p>
                        <p style={{marginBottom:"0px"}} className='text-secondary ms-2'>{item.detail}</p>
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
  );
}

export default SelectHumid;
