import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoBack from '../../components/GoBack.jsx'
import Card from '../../components/Card.jsx';
import { useLocation } from 'react-router-dom'; // 이 부분을 추가하세요.

function AddRemotePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hub = location.state;

  console.log('hub check : ', hub)

  return (
    <div className='container'>
      <div className='d-flex mt-5 mb-3'>
        <GoBack />
        <h1 className="font-700">리모컨 추가</h1>
      </div>
      <hr />
      <Card>
        <div className="d-flex align-items-center justify-content-between" 
        onClick={() => navigate('/hubs/rmtdetail', {state: ['TV', true, '', hub[1]]})} style={{width:"100%"}}>
          <div className="text-secondary card-text">TV</div>          
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className="d-flex align-items-center justify-content-between" 
        onClick={() => navigate('/hubs/rmtdetail', {state: ['AC', true, '', hub[1]]})} style={{width:"100%"}}>
          <div className="text-secondary card-text">에어컨</div>          
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className="d-flex align-items-center justify-content-between" 
        onClick={() => navigate('/hubs/rmtdetail', {state: ['Fan', true, '', hub[1]]})} style={{width:"100%"}}>
          <div className="text-secondary card-text">선풍기</div>          
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className="d-flex align-items-center justify-content-between" 
        onClick={() => navigate('/hubs/rmtdetail', {state: ['Custom', true, '', hub[1]]})} style={{width:"100%"}}>
          <div className="text-secondary card-text">커스텀 리모컨</div>          
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className="d-flex align-items-center justify-content-between" 
        onClick={() => navigate('/hubs/board', {state:  hub.hubId})} style={{width:"100%"}}>
          <div className="text-secondary card-text">리모컨 다운로드</div>          
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AddRemotePage