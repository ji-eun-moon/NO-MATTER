import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from '../../components/GoBack.jsx'
import SelectResult from './SelectResult.jsx';
import axiosInstance from '../../config/axios'
import './Routine.scss'
import Form from 'react-bootstrap/Form';

import io from 'socket.io-client'
const BrokerAddress = 'https://i9c105.p.ssafy.io:8443'

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

const activeStyle = {
  border: "2px solid #CCD1D1",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "10px",
}

function RoutineResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const editing = location.state.editing
  const [kind, setKind] = useState('')
  const [condition, setCondition] = useState('')
  const [showModal, setShowModal] = useState(false)

  const [selectedHub, setSelectedHub] = useState(null);
  const [selectedRemote, setSelectedRemote] = useState(null);
  const [selectedRemoteAction, setSelectedRemoteAction] = useState(null); // 통신용
  const [selectedRemoteButton, setSelectedRemoteButton] = useState(null); // 출력용
  const [active, setActive] = useState(false)
  const [routineId, SetRoutineId] = useState(null);

  const [topic, setTopic] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(BrokerAddress, {
      cors: {origin: '*'}
    });

    newSocket.on('connect', () => {
      console.log('Connected to the broker.');
    });
   
    newSocket.on('message', (receivedMessage) => {
      console.log(`Received message: ${receivedMessage}`);
    });
    
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const subscribeToTopic = () => {
    if (socket && topic) {
      socket.emit('subscribe', topic);
      console.log(`Subscribed to topic: ${topic}`);
    }
  };

  const publishMessage = (message) => {
    if (socket && topic && message) {
      socket.emit('publish', { topic, message });
      console.log(`Published message "${message}" to topic: ${topic}`);
    }
  };

  const handleSelection = (hub, remote, action, button) => {
    setSelectedHub(hub);
    setSelectedRemote(remote);
    setSelectedRemoteAction(action);
    setSelectedRemoteButton(button);
    // 선택한 허브 정보 받아와서 topic 저장
    axiosInstance({
      method :'GET',
      url: `/hub/view/${hub.hubId}`,
    }).then((response) => {
      const hubUuId = response.data.hubUuid
      setTopic(hubUuId + '/ROUTINE/')
    })
  };
  
  useEffect(() => {
    setKind(location.state.kind)
    setCondition(location.state.condition)
    if (editing) {
      setSelectedHub(location.state.selectedHub)
      setSelectedRemote(location.state.selectedRemote)
      setSelectedRemoteButton(location.state.selectedRemoteButton)
      setActive(location.state.active)
      SetRoutineId(location.state.routineId)
      // 선택한 허브 정보 받아와서 topic 저장
      axiosInstance({
        method :'GET',
        url: `/hub/view/${location.state.selectedHub.hubId}`,
      }).then((response) => {
        const hubUuId = response.data.hubUuid
        setTopic(hubUuId + '/ROUTINE/')
      })
    }
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
    if (selectedHub && selectedRemote && selectedRemoteButton) {
      return (
        <div className='mt-4'>
          <div className='d-flex align-items-center mb-2'>
            <h4 className='result-item text-secondary me-2'>허브</h4>
            <i className="bi bi-caret-right-fill fs-3 text-secondary"></i>
            <p className='select-item fs-4'>{selectedHub.userHubName}</p>
          </div>
          <div className='d-flex align-items-center mb-2'>
            <h4 className='result-item text-secondary me-2'>리모컨</h4>
            <i className="bi bi-caret-right-fill fs-3 text-secondary"></i>
            <p className='select-item fs-4'>{selectedRemote.controllerName}</p>
          </div>
          <div className='d-flex align-items-center mb-2'>
            <h4 className='result-item text-secondary me-2'>동작</h4>
            <i className="bi bi-caret-right-fill fs-3 text-secondary"></i>
            <p className='select-item fs-4'>{selectedRemoteButton}</p>
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
    
    const routineData = {
      kind: kind,
      condition: condition,
      selectedHub: selectedHub,
      selectedRemote: selectedRemote,
      selectedRemoteAction: selectedRemoteAction,
      selectedRemoteButton: selectedRemoteButton,
      active: active
    };

    if (editing) {
      // 루틴 수정
      axiosInstance({
        method: 'POST',
        url: '/routine/update',
        data: { 
          routineId: routineId,
          hubId : selectedHub.hubId, 
          attributes : JSON.stringify(routineData)
        }
      })
      .then (() => {
        // 등록 이후 루틴 전체 리스트 불러오기
        axiosInstance({
          method :'GET',
          url: `/routine/list`,
        }).then((response) => {
          // const result = "[" + response.data.map(item => item[3]).join(", ") + "]"
          // publishMessage(`${result}`)
          const result = [];
          for (const item of response.data) {
            if (item[0] === selectedHub.hubId) {
              result.push(item[3]);
            }
          }
          publishMessage(JSON.stringify(result));
          console.log(result)
          navigate('/routine')
        })
      })
    } else {
      // 루틴 등록
      axiosInstance({
        method: 'POST',
        url: '/routine/register',
        data: { 
          hubId : selectedHub.hubId, 
          attributes : JSON.stringify(routineData)
        }
      })
      .then (() => {
        // 등록 이후 루틴 전체 리스트 불러오기
        axiosInstance({
          method :'GET',
          url: `/routine/list`,
        }).then((response) => {
          // const result = "[" + response.data.map(item => item[3]).join(", ") + "]"
          // publishMessage(`${result}`)
          const result = [];
          for (const item of response.data) {
            if (item[0] === selectedHub.hubId) {
              result.push(item[3]);
            }
          }
          publishMessage(JSON.stringify(result));
          console.log(result)
          navigate('/routine')
        })
      })
    }
  }

  return (
    <div className='container page-container'>
      <div className='d-flex mt-5 mb-3'>
        <GoBack />
        { editing ? <h1 className="font-700">루틴 수정</h1> :
        <h1 className="font-700">루틴 등록</h1> }
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
      <div className='d-flex justify-content-between align-items-center' style={activeStyle}>
        <div>
          <h3 className='font-700'>루틴 활성화</h3>
        </div>
        <Form>
          <Form.Check
              type="switch"
              id="custom-switch"
              label={active ? 'ON' : 'OFF'}
              checked={active}
              style={{ fontSize: '1.2rem' }}
              onChange={() => setActive(!active)}
            />
        </Form>
      </div>
      <div className='centered'>
        <button className='btn mt-2'
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