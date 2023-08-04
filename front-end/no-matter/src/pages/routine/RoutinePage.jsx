
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'

function RoutinePage() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  // const token = sessionStorage.getItem('authToken')

  const getRoutines = () => {

    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    axios.get('http://localhost:3001/routines/')
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

  return (
    <div className="page-container container">
      <div className='d-flex justify-content-between mt-5'>
        <h1 className="font-700">My Routine</h1>
        <div className="main-backgroud-color px-2 rounded">
          <i className="bi bi-people-fill fs-2 text-white"></i>
        </div>
      </div>
      <hr />
      {routines.map(routine => {
        return (
          // <Card key={routine.routineId}>
          <Card key={routine.id}>
              <div className='d-flex align-items-center justify-content-between' 
                    onClick={() => navigate(`/routines/${routine.id}`)}
                    style={{width:"100%"}}>
                <div className='card-text'>
                  {routine.kind === "voice"? routine.result : routine.condition+' / '+routine.result}
                  {/* {routine.userRoutineName}  */}
                </div>
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </div>
          </Card>
        )
      })}
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