import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axios.jsx'
import GoBack from '../../components/GoBack.jsx'
import Card from '../../components/Card.jsx';
import { Box } from "@mui/material";
import { useLocation } from 'react-router-dom'; // 이 부분을 추가하세요.

import io from 'socket.io-client'
const protocol = window.location.protocol
let BrokerAddress = ''
if (protocol === 'https:') {
  BrokerAddress = 'wss://i9c105.p.ssafy.io:3002'
} else {
  BrokerAddress = 'ws://i9c105.p.ssafy.io:3002'
}

function AddRemotePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hubId = location.state;
  // console.log('진짜?', hubId)

  const [topic, setTopic] = useState('')
  const [socket, setSocket] = useState(null)
  const [hubStatusChange, setHubStatusChange] = useState(false)
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // 30초 동안 100번 progress를 증가시키려면 300ms 간격으로 증가시켜야 합니다.
    const intervalTime = 300;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          oldProgress = 0
          return 100;
        }
        return oldProgress + 1;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getUuid = () => {
    axiosInstance({
      method :'GET',
      url: `/hub/view/${hubId}`,
    }).then((response) => {
      const hubuuid = response.data.hubUuid
      setTopic(`${hubuuid}/IR/`)
    })
  }
  
  useEffect(() => {
    const newSocket = io(BrokerAddress, {
      cors: { origin: '*' }
    });
    getUuid()
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the broker.');
    });

    if (newSocket && topic) {
      newSocket.emit('subscribe', topic);
      console.log(`Subscribed to topic: ${topic}`);
    }

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const publishMessage = (message) => {
    if (socket && topic && message) {
      socket.emit('publish', { topic, message });
      console.log(`Published message "${message}" to topic: ${topic}`);
    }
  };

  const goRmtList = () => {
    publishMessage('TRANSMIT')
    setHubStatusChange(true)
    setTimeout(() => {
      setHubStatusChange(false)
      navigate(-1)
    }, 30000)
  }

  return (
    <>
    {hubStatusChange ? 
      <div className="container page-container">
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div style={{
            width: "500px",
            height: "500px",
            backgroundImage: `url("/images/logoGif.gif")`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            color: "black", // 텍스트 색상 설정,
            fontSize: "30px",
            fontWeight: "bold"
          }}>
            30초 정도 소요됩니다...
          </div>
          <Box sx={{ width: '100%' }}>
            {/* <LinearProgress variant="determinate" value={progress} /> */}
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </Box>
        </div>
      </div>    
      
      :      
    <div className='container'>
      <div className='d-flex mt-5 mb-3'>
        <div onClick={() => goRmtList()}>
          <i className="bi bi-chevron-left fs-2 me-3"></i>
        </div>
        <h1 className="font-700">리모컨 추가</h1>
      </div>
      <hr />
      <Card>
        <div className="d-flex align-items-center justify-content-between" 
        onClick={() => navigate('/hubs/rmtdetail', {state: ['TV', true, '', hubId]})} style={{width:"100%"}}>
          <div className="text-secondary card-text">TV</div>          
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className="d-flex align-items-center justify-content-between" 
        onClick={() => navigate('/hubs/rmtdetail', {state: ['AC', true, '', hubId]})} style={{width:"100%"}}>
          <div className="text-secondary card-text">에어컨</div>          
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className="d-flex align-items-center justify-content-between" 
        onClick={() => navigate('/hubs/rmtdetail', {state: ['Fan', true, '', hubId]})} style={{width:"100%"}}>
          <div className="text-secondary card-text">선풍기</div>          
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className="d-flex align-items-center justify-content-between" 
        onClick={() => navigate('/hubs/board', {state: hubId})} style={{width:"100%"}}>
          <div className="text-secondary card-text">리모컨 다운로드</div>          
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
    </div>
    }
    </>
  )
}

export default AddRemotePage