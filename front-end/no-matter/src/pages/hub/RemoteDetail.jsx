import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import RmtTvUi from '../../rmtUi/RmtTvUi.jsx';
import RmtFanUi from '../../rmtUi/RmtFanUi.jsx';
import RmtCustom from '../../rmtUi/RmtCustom.jsx';
import RmtAc from '../../rmtUi/RmtAc.jsx';
import axiosInstance from '../../config/axios.jsx'


import io from 'socket.io-client'
const protocol = window.location.protocol
let BrokerAddress = ''
if (protocol === 'https:') {
  BrokerAddress = 'wss://i9c105.p.ssafy.io:3002'
} else {
  BrokerAddress = 'ws://i9c105.p.ssafy.io:3002'
}


function RemoteDetail() {
  const [topic, setTopic] = useState('')
  const [socket, setSocket] = useState(null)

  const remoteType = useLocation()
  const isCreate = remoteType.state[1]
  const hubId = remoteType.state[3]
  const remoteCode = remoteType.state[4]

  const newSocket = io(BrokerAddress, {
    cors: { origin: '*' }
  });
  

  const getUuid = () => {
    axiosInstance({
      method :'GET',
      url: `/hub/view/${hubId}`,
    }).then((response) => {
      const hubuuid = response.data.hubUuid
      if (isCreate === true) {
        setTopic(`${hubuuid}/RC/ADD/`)
      } else if (isCreate === false) {
        setTopic(`${hubuuid}/RC/CONTROLL/`)
      }
    })
  }

  getUuid()
  useEffect(() => {
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
  }, [topic]);
  
  // 새로운 메시지를 수신할 때 실행될 이벤트 핸들러
  useEffect(() => {
    newSocket.on('message', (receivedMessage) => {
      console.log(`Received message: ${receivedMessage}`);
    });
  }, [newSocket])

  // const subscribeToTopic = () => {
  //   if (socket && topic) {
  //     socket.emit('subscribe', topic);
  //     console.log(`Subscribed to topic: ${topic}`);
  //   }
  // };

  const publishMessage = (message) => {
    if (socket && topic && message) {
      socket.emit('publish', { topic, message });
      console.log(`Published message "${message}" to topic: ${topic}`);
    }
  };
  
  return (
      <div className="container page-container">
        {
          remoteType.state[0] === 'TV' ? <RmtTvUi isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
          publishMessage={publishMessage} remoteCode={remoteCode}/> :
          (
            remoteType.state[0] === 'AC' ? <RmtAc isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
            publishMessage={publishMessage} remoteCode={remoteCode}/> :
            (
              remoteType.state[0] === 'Fan' ? <RmtFanUi isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
              publishMessage={publishMessage} remoteCode={remoteCode}/> : 
              <RmtCustom isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
              publishMessage={publishMessage} remoteCode={remoteCode}/>
            )
          )
        }
      </div>
  );
}

export default RemoteDetail