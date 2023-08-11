import React, {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";
import GoBack from '../../components/GoBack.jsx'
import SelectResult from './SelectResult.jsx';
import axios from 'axios'
import axiosInstance from '../../config/axios'
import './Routine.scss'
import { useNavigate } from 'react-router-dom'

function RoutineResult() {
  const location = useLocation();
  const navigate = useNavigate();
  // const kind = location.state.kind // 루틴 종류 - 스케줄/날씨/음성명령
  // const condition = location.state.condition  // 루틴 조건

  // console.log(location.state.kind)
  // console.log(location.state.condition)

  const [kind, setKind] = useState('')
  const [condition, setCondition] = useState('')
  const [showModal, setShowModal] = useState(false)

  const [selectedHub, setSelectedHub] = useState(null);
  const [selectedRemote, setSelectedRemote] = useState(null);
  const [selectedRemoteAction, setSelectedRemoteAction] = useState(null);

  const handleSelection = (hub, remote, action) => {
    setSelectedHub(hub);
    setSelectedRemote(remote);
    setSelectedRemoteAction(action);
  };

  const conditionStyle = {
    border: "2px solid #0097B2",
    borderRadius: "10px",
    padding: "20px"
  }

  const resultStyle = {
    border: "2px solid #CCD1D1",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "10px",
    height: "250px"
  }
  
  useEffect(() => {
    setKind(location.state.kind)
    setCondition(location.state.condition)
  }, [])


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderCondition = () => {
    if (kind === 'voice') {
      return (
        <div style={conditionStyle}>
          <h1 className='font-700' style={{color : "#0097B2"}}>조건</h1>
          <p className='text-secondary' style={{marginBottom:"10px"}}>입력된 명령어</p>
          <h5 style={{marginBottom:"0px"}}>{condition}</h5>
        </div>
      )
    }
    if (kind === 'temp') {
      return (
        <div style={conditionStyle}>
          <h1 className='font-700' style={{color : "#0097B2"}}>조건</h1>
          <p className='text-secondary' style={{marginBottom:"10px"}}>날씨</p>
          <div className='d-flex'>
            <h5 className="me-2" style={{marginBottom:"0px"}}>{condition.temperature} °C</h5>
            <h5 className="me-2" style={{marginBottom:"0px"}}>{condition.updown === 'up' ? '초과' : '미만'}</h5>
            <h5 style={{marginBottom:"0px"}}>일 때</h5>
          </div>
        </div>
      )
    }
    if (kind === 'humidity') {
      return (
        <div style={conditionStyle}>
          <h1 className='font-700' style={{color : "#0097B2"}}>조건</h1>
          <p className='text-secondary' style={{marginBottom:"10px"}}>날씨</p>
          <div className='d-flex'>
            <h5 style={{marginBottom:"0px"}}>{condition.label}</h5>
            <h5 style={{marginBottom:"0px"}} className='me-2'>할 때</h5>
            <p className="me-2 text-secondary" style={{marginBottom:"0px"}}>(습도 {condition.detail})</p>
          </div>
        </div>
      )
    }
    if (kind === 'weather') {
      return (
        <div style={conditionStyle}>
          <h1 className='font-700' style={{color : "#0097B2"}}>조건</h1>
          <p className='text-secondary' style={{marginBottom:"10px"}}>날씨</p>
          <div className='d-flex'>
            <h5 className='me-1' style={{marginBottom:"0px"}}>{condition.label}</h5>
            <h5 style={{marginBottom:"0px"}}>일 때</h5>
          </div>
        </div>
      )
    }
    if (kind === 'schedule') {
      return (
        <div style={conditionStyle}>
          <h1 className='font-700' style={{color : "#0097B2"}}>조건</h1>
          <div className='d-flex'>
            <p className='text-secondary me-3' style={{marginBottom:"10px"}}>스케줄</p>
            {/* 반복 요일 */}
            {condition.day.map((day, index) => (
            <React.Fragment key={index}>
              <p>{day}</p>
              {index !== condition.day.length - 1 && <span>,&nbsp;</span>}
            </React.Fragment>
            ))}
            <p>요일</p>
          </div>
          <div className='d-flex'>
            <h5 style={{marginBottom:"0px"}} className='me-1'>{condition.ampm === 'am' ? '오전' : '오후'}</h5>
            <h5 style={{marginBottom:"0px"}} className='me-1'>{condition.hour}시</h5>
            <h5 style={{marginBottom:"0px"}} className='me-1'>{condition.minute}분</h5>
            <h5 style={{marginBottom:"0px"}} className='me-1'>마다</h5>
          </div>
        </div>
      )
    }
  }

  const renderSelectedInfo = () => {
    if (selectedHub && selectedRemote && selectedRemoteAction) {
      return (
        <div className='mt-4'>
          <div className='d-flex align-items-center mb-2'>
            <h5 className='result-item text-secondary'>허브</h5>
            <i className="bi bi-caret-right-fill fs-4 text-secondary"></i>
            <p className='select-item'>{selectedHub.userHubName}</p>
          </div>
          <div className='d-flex align-items-center mb-2'>
            <h5 className='result-item text-secondary'>리모컨</h5>
            <i className="bi bi-caret-right-fill fs-4 text-secondary"></i>
            <p className='select-item'>{selectedRemote.controllerName}</p>
          </div>
          <div className='d-flex align-items-center mb-2'>
            <h5 className='result-item text-secondary'>동작</h5>
            <i className="bi bi-caret-right-fill fs-4 text-secondary"></i>
            <p className='select-item'>{selectedRemoteAction}</p>
          </div>
          
        </div>
      );
    } else {
      return (
        <div className='mt-5 centered'>
          <p className='text-secondary'>실행할 결과를 선택하세요.</p>
        </div>
      );
    }
  };

  // 루틴 등록
  const routineSubmit = () => {
    // json-server test
    axios.post('http://docker_test_back:3001/routines', {
      kind: kind,
      condition: condition,
      selectedHub: selectedHub,
      selectedRemote: selectedRemote,
      selectedRemoteAction: selectedRemoteAction
    }).then (
      navigate('/routine')
    )
  }

  return (
    <div className='container'>
      <div className='d-flex mt-5 mb-3'>
        <GoBack />
        <h1 className="font-700">루틴 등록</h1>
      </div>
      <div>
        {renderCondition()}
      </div>

      <div style={resultStyle} className='d-flex flex-column container'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className='font-700' style={{marginBottom:"0px"}}>결과</h1>
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary" onClick={openModal}></i></div>
        </div>
        {renderSelectedInfo()}
      </div>
      <div className='centered'>
        <button className='btn mt-3'
                onClick={routineSubmit} 
                style={{backgroundColor:"#0097B2", color:"#FCFCFC", fontWeight:"700", width:"100%", height:"45px"}}>
          저장하기</button>
      </div>

      {/* 결과 등록 모달 */}
      {showModal && 
          <SelectResult setShowModal={setShowModal} handleSelection={handleSelection}/>}
    </div>
  )
}

export default RoutineResult