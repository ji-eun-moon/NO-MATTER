import React, { useState, useEffect } from 'react'
import axiosInstance from '../../config/axios'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'
import SwipeCard from '../../components/SwipeCard.jsx';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import io from 'socket.io-client'
const protocol = window.location.protocol
let BrokerAddress = ''
if (protocol === 'https:') {
  BrokerAddress = 'wss://i9c105.p.ssafy.io:3002'
} else {
  BrokerAddress = 'ws://i9c105.p.ssafy.io:3002'
}

function RoutinePage() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([])
  const getRoutines = () => {
    axiosInstance({
      method: 'Get',
      url: '/routine/list',
    })
    .then((response) => {  
      setRoutines(response.data);
    });
  };

  useEffect(() => {
    getRoutines();
  }, []);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(BrokerAddress, {
      cors: {origin: '*'}
    });

    newSocket.on('connect', () => {
      console.log('Connected to the broker.');
    });
   
    // 새로운 메시지를 수신할 때 실행될 이벤트 핸들러
    newSocket.on('message', (receivedMessage) => {
      console.log(`Received message: ${receivedMessage}`);
    });
    
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const publishMessage = (topic, message) => {
    if (socket && topic && message) {
      socket.emit('publish', { topic, message });
      console.log(`Published message "${message}" to topic: ${topic}`);
    }
  };


  const deleteRoutine = async (routineId, hubId) => {
    try {
      const hubResponse = await axiosInstance({
        method: 'GET',
        url: `/hub/view/${hubId}`,
      });
  
      const hubUuId = hubResponse.data.hubUuid;
      const newTopic = hubUuId + '/ROUTINE/';
  
      const deleteResponse = await axiosInstance({
        method: 'DELETE',
        url: `routine/delete/${routineId}`,
      });
  
      const routineListResponse = await axiosInstance({
        method: 'GET',
        url: `/routine/list/${hubId}`,
      });
  
      const result = "[" + routineListResponse.data.map(item => item[3]).join(", ") + "]";
      await publishMessage(newTopic, `${result}`);
      window.location.reload()
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const renderRoutine = (routineInfo) => {
    
    const routine = JSON.parse(routineInfo[3])

    if (routine.kind === 'voice') {
      return (
        <div className='centered' style={{width :"100%"}}>
          <div className='d-flex justify-content-between' style={{width :"100%"}}>
            <div className='d-flex flex-column'>
              <p style={{marginBottom:"0px", fontSize:"18px"}}>{routine.condition}</p>
              <div className='d-flex text-secondary'>
                <p className='me-1' style={{marginBottom:"0px"}}>{routineInfo[2]}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteButton}</p>
              </div>
            </div>
            <div className='centered'>
              { routine.active ? 
              <i className="bi bi-bell-fill fs-1 text-warning"></i>
              : <i className="bi bi-bell-slash-fill fs-1 text-secondary"></i>
              }
            </div>
          </div>
        </div>
      )
    }
    if (routine.kind === 'schedule') {
      return (
        <div className='centered' style={{width :"100%"}}>
          <div className='d-flex justify-content-between' style={{width :"100%"}}>
            <div className='d-flex flex-column'>
              <div className='d-flex'>
               {
                routine.condition.day.length === 7
                  ? <p className="me-1" style={{ marginBottom: "0px", fontSize:"18px" }}>매일</p>
                  : <div className='d-flex me-1'>{routine.condition.day.map((day, index) => (
                      <React.Fragment key={index}>
                        <p style={{ marginBottom: "0px", fontSize:"18px", fontSize:"18px" }}>{day}</p>
                        {index !== routine.condition.day.length - 1 && <span>,&nbsp;</span>}
                      </React.Fragment>
                    ))}
                    </div>
               }
                <p style={{marginBottom:"0px", fontSize:"18px"}} className='me-1'>{routine.condition.ampm === 'am' ? '오전' : '오후'}</p>
                <p style={{marginBottom:"0px", fontSize:"18px"}} className='me-1'>{routine.condition.hour}시</p>
                <p style={{marginBottom:"0px", fontSize:"18px"}} className='me-1'>{routine.condition.minute}분</p>
              </div>
              <div className='d-flex text-secondary'>
                <p className='me-1' style={{marginBottom:"0px"}}>{routineInfo[2]}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteButton}</p>
              </div>
            </div>
            <div className='centered'>
              { routine.active ? 
              <i className="bi bi-bell-fill fs-1 text-warning"></i>
              : <i className="bi bi-bell-slash-fill fs-1 text-secondary"></i>
              }
            </div>
          </div>
        </div>
      )
    }
    if (routine.kind === 'temp') {
      return (
        <div className='centered' style={{width :"100%"}}>
          <div className='d-flex justify-content-between' style={{width :"100%"}}>
            <div className='d-flex flex-column'>
              <div className='d-flex'>
                <p className="me-1" style={{marginBottom:"0px", fontSize:"18px"}}>{routine.condition.temperature} °C</p>
                <p className="me-2" style={{marginBottom:"0px", fontSize:"18px"}}>{routine.condition.updown === 'up' ? '초과' : '미만'}</p>
              </div>
              <div className='d-flex text-secondary'>
                <p className='me-1' style={{marginBottom:"0px"}}>{routineInfo[2]}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteButton}</p>
              </div>
            </div>
            <div className='centered'>
              { routine.active ? 
              <i className="bi bi-bell-fill fs-1 text-warning"></i>
              : <i className="bi bi-bell-slash-fill fs-1 text-secondary"></i>
              }
            </div>
          </div>
        </div>
      )
    }

    if (routine.kind === 'humidity') {
      return (
        <div className='centered' style={{width :"100%"}}>
          <div className='d-flex justify-content-between' style={{width :"100%"}}>
            <div className='d-flex flex-column'>
              <div className='d-flex'>
                <p style={{marginBottom:"0px", fontSize:"18px"}}>{routine.condition.label}</p>
                <p style={{marginBottom:"0px", fontSize:"18px"}} className='me-2'>할 때</p>
              </div>
              <div className='d-flex text-secondary'>
                <p className='me-1' style={{marginBottom:"0px"}}>{routineInfo[2]}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteButton}</p>
              </div>
            </div>
            <div className='centered'>
              { routine.active ? 
              <i className="bi bi-bell-fill fs-1 text-warning"></i>
              : <i className="bi bi-bell-slash-fill fs-1 text-secondary"></i>
              }
            </div>
          </div>
        </div>
      )
    }

    if (routine.kind === 'weather') {
      return (
        <div className='centered' style={{width :"100%"}}>
          <div className='d-flex justify-content-between' style={{width :"100%"}}>
            <div className='d-flex flex-column'>
              <div className='d-flex'>
                <p className='me-1' style={{marginBottom:"0px", fontSize:"18px"}}>{routine.condition.label}</p>
                <p style={{marginBottom:"0px", fontSize:"18px"}}>일 때</p>
              </div>
              <div className='d-flex text-secondary'>
                <p className='me-1' style={{marginBottom:"0px"}}>{routineInfo[2]}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteButton}</p>
              </div>
            </div>
            <div className='centered'>
              { routine.active ? 
              <i className="bi bi-bell-fill fs-1 text-warning"></i>
              : <i className="bi bi-bell-slash-fill fs-1 text-secondary"></i>
              }
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="page-container container">
      <div className='d-flex justify-content-between mt-5 container'>
        <h1 className="font-700">My Routine</h1>
      </div>
      <hr />
      { routines.length === 0 ?
      <div className='m-5 centered'>
        등록된 루틴이 없습니다.
      </div>
      : 
      routines.map((routineInfo, index) => (
        <div key={index} className='card mb-3' style={{height:'80px', padding:'0', border:'0px', overflow: 'hidden'}}>
          <SwipeCard>
            {renderRoutine(routineInfo)}
          </SwipeCard>
         
          <div className='card-body mb-3 d-flex justify-content-between' style={{position:'absolute', padding:'0', width:'100%'}}>
            {/* 루틴 수정 */}
            <div className="card mb-3 bg-primary" style={{height:'79px', width:'79px', marginLeft: '1px'}}
                 onClick={() => navigate('/routine/result', 
                 { state: { kind: JSON.parse(routineInfo[3]).kind, 
                           condition: JSON.parse(routineInfo[3]).condition, 
                           editing: true, 
                           selectedHub:  JSON.parse(routineInfo[3]).selectedHub,
                           selectedRemote:  JSON.parse(routineInfo[3]).selectedRemote,
                           selectedRemoteAction:  JSON.parse(routineInfo[3]).selectedRemoteAction,
                           selectedRemoteButton:  JSON.parse(routineInfo[3]).selectedRemoteButton,
                           active: JSON.parse(routineInfo[3]).active,
                           routineId: routineInfo[1]
                           }})}>
              <div className="card-body centered">
                <SettingsOutlinedIcon fontSize='large' style={{color:'white'}} />
              </div>
            </div>

             {/* 루틴 삭제 */}
            <div className="card mb-3 bg-danger" style={{height:'79px', width:'79px', marginRight:'1px'}}
                onClick={() => deleteRoutine(routineInfo[1], routineInfo[0])}>
                <div className="card-body centered">
                  <RemoveCircleOutlineOutlinedIcon fontSize='large' style={{color:'white'}} />
                </div>
            </div>
          </div>
        </div>
      ))}

      <Card>
        <div className="centered" style={{width:"100%"}}
            onClick={() => navigate('/routine/addroutine')}>
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
          <div className="text-secondary" >루틴 추가하기</div>
        </div>
      </Card>
    </div>
  )
}

export default RoutinePage