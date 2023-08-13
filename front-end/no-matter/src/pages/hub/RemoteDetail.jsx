import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import RmtTvUi from '../../rmtUi/RmtTvUi.jsx';
import RmtFanUi from '../../rmtUi/RmtFanUi.jsx';
import RmtCustom from '../../rmtUi/RmtCustom.jsx';
import RmtAc from '../../rmtUi/RmtAc.jsx';

import io from 'socket.io-client'
const BrokerAddress = 'i9c105.p.ssafy.io:3002'


function RemoteDetail() {
  const topic = 'ssafy' 
  const [socket, setSocket] = useState(null)

  const remoteType = useLocation()
  const isCreate = remoteType.state[1]
  const hubId = remoteType.state[3]

  
  const newSocket = io(BrokerAddress, {
    cors: { origin: '*' }
  });
  
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
  }, []);
  
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
          publishMessage={publishMessage}/> :
          (
            remoteType.state[0] === 'AC' ? <RmtAc isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
            publishMessage={publishMessage}/> :
            (
              remoteType.state[0] === 'Fan' ? <RmtFanUi isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
              publishMessage={publishMessage}/> : 
              <RmtCustom isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
              publishMessage={publishMessage}/>
            )
          )
        }
      </div>
  );
}

export default RemoteDetail