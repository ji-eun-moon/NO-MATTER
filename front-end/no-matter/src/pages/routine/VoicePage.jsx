import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoBack from '../../components/GoBack.jsx'

function VoicePage() {
  const [command, setCommand] = useState('');
  const [inputCount, setInputCount] = useState(0);
  const navigate = useNavigate();

  const onSubmit = () => {
    if (command.trim() !== '') {
      navigate('/routine/result', { state: { kind: "voice", condition: command, editing: false} });
    } else {
      window.alert('등록할 명령어를 입력하세요.');
    }
  }

  const onInputHandler = (e) => {
    setInputCount(e.target.value.length);
    setCommand(e.target.value)
  };

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
          placeholder='등록할 명령어를 입력하세요. (15자 내외)'
          value={command}
          maxLength="20"
          onChange={onInputHandler}
          rows={5}
        />
      </div>
      <p className='text-secondary d-flex justify-content-end'>
        <span>{inputCount}</span>
        <span>/20 자</span>
      </p>
    </div>
  )
}

export default VoicePage