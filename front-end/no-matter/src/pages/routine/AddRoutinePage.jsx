
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'

function AddRoutinePage() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  // const token = sessionStorage.getItem('authToken')

//   const getRoutines = () => {

//     // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

//     axios.get('http://localhost:3001/routines/')
//     .then((response) => {
//       // console.log(response.data)
//       setRoutines(response.data)
//     })

//     // axios.get('http://localhost:8080/api/v1/userhub/list')
//     // .then((response) => {  
//     //   console.log(response.data)
//     //   setHubs(response.data)
//     // })
//   }

//   useEffect(() => {
//     getRoutines()
//   }, [])

  return (
    <div className="page-container container">
      <div className='d-flex justify-content-between mt-5'>
        <h1 className="font-700">Routine 생성</h1>
        <div className="main-backgroud-color px-2 rounded">
          <i className="bi bi-people-fill fs-2 text-white"></i>
        </div>
      </div>
      <hr />

      <Card>
            <div className='d-flex align-items-center justify-content-between' style={{width:"100%", paddingTop:'0'}}>
                <div>
                    <p style={{fontWeight:"bold", fontSize:"17px",margin:"5px 3px 1px 2px"}}>스케줄</p>
                    <p style={{fontSize:"3px", margin:'0'}}>예) 매일 아침 7시인 경우</p>
                </div>
            
                <div>
                    <i className="bi bi-chevron-right"></i>
                </div>
            </div>
        </Card>

        <Card>
            <div className='d-flex align-items-center justify-content-between' style={{width:"100%", paddingTop:'0'}}>
                <div>
                    <p style={{fontWeight:"bold", fontSize:"17px",margin:"5px 3px 1px 2px"}}>날씨</p>
                    <p style={{fontSize:"3px", margin:'0'}}>예) 현재 온도가 28℃ 이상인 경우</p>
                </div>
                <div>
                    <i className="bi bi-chevron-right"></i>
                </div>
            </div>
        </Card>
        
        <Card>
            <div className='d-flex align-items-center justify-content-between' style={{width:"100%", paddingTop:'0'}}>
                <div>
                    <p style={{fontWeight:"bold", fontSize:"17px",margin:"5px 3px 1px 2px"}}>명령어</p>
                    <p style={{fontSize:"3px", margin:'0'}}>예) 거실 티비 켜줘</p>
                </div>           
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div> 
            </div>
        </Card>

    </div> 
  )
}

export default AddRoutinePage