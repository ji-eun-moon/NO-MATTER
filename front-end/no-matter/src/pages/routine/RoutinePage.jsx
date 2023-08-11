import React from 'react'
import axios from 'axios'
import axiosInstance from '../../config/axios'
import { useState, useEffect } from 'react'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';

function RoutinePage() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  // const token = sessionStorage.getItem('authToken')

  const getRoutines = () => {

    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    axiosInstance({
      method: 'get',
      url: 'http://localhost:3001/routines/'
    })
    .then((response) => {
      // console.log(response.data)
      setRoutines(response.data)
    })

    // axios.get('http://localhost:8080/api/v1/userhub/list')
    // .then((response) => {  
    //   console.log(response.data)
    //   setHubs(response.data)
    // })
  }

  useEffect(() => {
    getRoutines()
  }, [])

  const renderRoutine = (routine) => {
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
            <div className='centered'>
              {/* <i className="bi bi-chevron-right"></i> */}
              <DeleteIcon style={{color:"crimson"}}/>
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
            <div className='centered'>
              {/* <i className="bi bi-chevron-right"></i> */}
              <DeleteIcon style={{color:"crimson"}}/>
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
            <div className='centered'>
              {/* <i className="bi bi-chevron-right"></i> */}
              <DeleteIcon style={{color:"crimson"}}/>
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
            <div className='centered'>
              {/* <i className="bi bi-chevron-right"></i> */}
              <DeleteIcon style={{color:"crimson"}}/>
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
            <div className='centered'>
              {/* <i className="bi bi-chevron-right"></i> */}
              <DeleteIcon style={{color:"crimson"}}/>
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
      {/* {routines.map(routine => {
        return (
          // <Card key={routine.routineId}>
          <Card key={routine.id}>
              <div className='d-flex align-items-center justify-content-between' 
                    onClick={() => navigate(`/routines/${routine.id}`)}
                    style={{width:"100%"}}>
                <div className='card-text'>
                  {routine.kind === "voice"? routine.result : routine.condition+' / '+routine.result}
                  {routine.userRoutineName} 
                </div>
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </div>
          </Card>
        )
      })} */}
      {routines.map(routine => (
        <Card key={routine.id}>
          {renderRoutine(routine)}
        </Card>
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