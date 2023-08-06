import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoBack from '../../components/GoBack.jsx'

function VoicePage() {
  const [command, setCommand] = useState('');
  const navigate = useNavigate();

  const onSubmit = () => {
    if (command.trim() !== '') {
      navigate('/routine/result', { state: { kind: "voice", condition: command } });
    } else {
      window.alert('등록할 명령어를 입력하세요.');
    }
  }

  return (
    <div className='container'>
      <div className='d-flex mt-5 mb-3'>
        <GoBack />
        <h1 className="font-700">명령어 등록</h1>
      </div>
      <div className='d-flex justify-content-end'>
        <button 
            className='mb-3 btn'
            style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
            onClick={onSubmit}
            >NEXT</button>
      </div>
      <div>
        <textarea 
          className='form-control'
          placeholder='등록할 명령어를 입력하세요.'
          value={command}
          onChange={(event) => {
            setCommand(event.target.value)
          }}
          rows={5}
        />
      </div>
    </div>
  )
}

export default VoicePage