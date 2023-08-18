import React, { useState, useEffect } from 'react'
import axiosInstance from '../../config/axios'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card.jsx';
import GoBack from '../../components/GoBack.jsx'

function AddRoutinePage() {
  const navigate = useNavigate();

  const onSchedule = () => {
    navigate('/routine/schedule')
  }

  const onWeather = () => {
    navigate('/routine/weather')
  }

  const onVoice = () => {
    navigate('/routine/voice')
  }
 
  return (
    <div className="page-container container">
      <div className='d-flex mt-5 mb-3'>
        <GoBack /> 
        <h1 className="font-700">Routine 생성</h1>
      </div>
      <hr />

      <Card>
            <div className='d-flex align-items-center justify-content-between' style={{width:"100%", paddingTop:'0'}}>
                <div>
                  <h5 style={{fontWeight:"bold", margin:"5px 3px 1px 2px"}}>스케줄</h5>
                  <p className="text-secondary" style={{fontSize:"13px", margin:'0'}}>예) 매일 아침 7시인 경우</p>
                </div>
            
                <div>
                    <i className="bi bi-chevron-right" onClick={onSchedule}></i>
                </div>
            </div>
        </Card>

        <Card>
            <div className='d-flex align-items-center justify-content-between' style={{width:"100%", paddingTop:'0'}}>
                <div>
                    <h5 style={{fontWeight:"bold", margin:"5px 3px 1px 2px"}}>날씨</h5>
                    <p className="text-secondary" style={{fontSize:"13px", margin:'0'}}>예) 현재 온도가 28℃ 이상인 경우</p>
                </div>
                <div>
                    <i className="bi bi-chevron-right" onClick={onWeather}></i>
                </div>
            </div>
        </Card>
        
        <Card>
            <div className='d-flex align-items-center justify-content-between' style={{width:"100%", paddingTop:'0'}}>
                <div>
                    <h5 style={{fontWeight:"bold", margin:"5px 3px 1px 2px"}}>명령어</h5>
                    <p className="text-secondary" style={{fontSize:"13px", margin:'0'}}>예) 거실 티비 켜줘</p>
                </div>           
                <div>
                  <i className="bi bi-chevron-right" onClick={onVoice}></i>
                </div> 
            </div>
        </Card>

    </div> 
  )
}

export default AddRoutinePage