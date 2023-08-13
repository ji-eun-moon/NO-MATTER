import React from 'react'
import axiosInstance from '../../config/axios'
import { useState, useEffect } from 'react'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'
import SwipeCard from '../../components/SwipeCard.jsx';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function RoutinePage() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([])
  const [hubs, setHubs] = useState([])


  const getRoutinesForHub = (hubId) => {
    return axiosInstance({
      method: 'get',
      url: `http://localhost:5000/api/v1/routine/list/${hubId}`,
    })
    .then((response) => {
      return response.data;
    });
  };

  const getHubs = () => {
    axiosInstance({
      method: 'Get',
      url: '/userhub/list',
      headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` },
    })
    .then((response) => {  
      setHubs(response.data);
    });
  };

  useEffect(() => {
    getHubs();
  }, []);

  useEffect(() => {
    // Fetch routines for all hubs
    const fetchRoutinesForAllHubs = async () => {
      const routinesForHubs = await Promise.all(
        hubs.map(async (hub) => {
          return getRoutinesForHub(hub.hubId);
        })
      );
      const combinedRoutines = routinesForHubs.flat();
      setRoutines(combinedRoutines);
      console.log('Combined routines:', combinedRoutines);
    };

    if (hubs.length > 0) {
      fetchRoutinesForAllHubs();
    }
  }, [hubs]);


  // const getRoutines = () => {

  //   // json-server test
  //   // axiosInstance({
  //   //   method: 'get',
  //   //   url: 'http://localhost:3001/routines/'
  //   // })
  //   // .then((response) => {
  //   //   // console.log(response.data)
  //   //   setRoutines(response.data)
  //   // })
  // }

  // useEffect(() => {
  //   getRoutines()
  // }, [])

  const renderRoutine = (routineInfo) => {
    const routine = JSON.parse(routineInfo.attributes)
    if (routine.kind === 'voice') {
      return (
        <div className='centered' style={{width :"100%"}}>
          <div className='d-flex justify-content-between' style={{width :"100%"}}>
            <div className='d-flex flex-column'>
              <p style={{marginBottom:"0px", fontSize:"18px"}}>{routine.condition}</p>
              <div className='d-flex text-secondary'>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedHub.userHubName}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteAction}</p>
              </div>
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
                    {/* <p style={{marginBottom:"0px", fontSize:"18px"}} className='me-1'>요일</p> */}
                    </div>
               }
                <p style={{marginBottom:"0px", fontSize:"18px"}} className='me-1'>{routine.condition.ampm === 'am' ? '오전' : '오후'}</p>
                <p style={{marginBottom:"0px", fontSize:"18px"}} className='me-1'>{routine.condition.hour}시</p>
                <p style={{marginBottom:"0px", fontSize:"18px"}} className='me-1'>{routine.condition.minute}분</p>
              </div>
              <div className='d-flex text-secondary'>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedHub.userHubName}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteAction}</p>
              </div>
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
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedHub.userHubName}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteAction}</p>
              </div>
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
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedHub.userHubName}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteAction}</p>
              </div>
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
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedHub.userHubName}</p>
                <p className='me-1' style={{marginBottom:"0px"}}>{routine.selectedRemote.controllerName}</p>
                <p style={{marginBottom:"0px"}}>{routine.selectedRemoteAction}</p>
              </div>
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
      {routines.map((routineInfo, index) => (
        <div key={index} className='card mb-3' style={{height:'80px', padding:'0', border:'0px', overflow: 'hidden'}}>
          <SwipeCard>
            {renderRoutine(routineInfo)}
          </SwipeCard>

         
          <div className='card-body mb-3 d-flex justify-content-between' style={{position:'absolute', padding:'0', width:'100%'}}>
            {/* 루틴 수정 */}
            <div className="card mb-3 bg-primary" style={{height:'79px', width:'79px', marginLeft: '1px'}}>
              <div className="card-body centered">
                <SettingsOutlinedIcon fontSize='large' style={{color:'white'}} onClick={() => navigate('/routine/result', 
                { state: { kind: JSON.parse(routineInfo.attributes).kind, 
                          condition: JSON.parse(routineInfo.attributes).condition, 
                          editing: true, 
                          selectedHub:  JSON.parse(routineInfo.attributes).selectedHub,
                          selectedRemote:  JSON.parse(routineInfo.attributes).selectedRemote,
                          selectedRemoteAction:  JSON.parse(routineInfo.attributes).selectedRemoteAction,
                          active: JSON.parse(routineInfo.attributes).active
                          }})}/>
              </div>
            </div>

             {/* 루틴 삭제 */}
            <div className="card mb-3 bg-danger" style={{height:'79px', width:'79px', marginRight:'1px'}}>
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