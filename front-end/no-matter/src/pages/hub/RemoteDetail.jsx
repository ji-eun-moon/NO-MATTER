import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import RmtTvUi from '../../rmtUi/RmtTvUi.jsx';
import RmtFanUi from '../../rmtUi/RmtFanUi.jsx';
import RmtCustom from '../../rmtUi/RmtCustom.jsx';
import RmtAc from '../../rmtUi/RmtAc.jsx';

import io from 'socket.io-client'
const BrokerAddress = 'http://i9c105.p.ssafy.io:3002'


function RemoteDetail() {
  const topic = 'ssafy' 
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)

  const remoteType = useLocation()
  const isCreate = remoteType.state[1]
  const hubId = remoteType.state[3]

  useEffect(() => {
    const newSocket = io(BrokerAddress, {
      cors: { origin: '*' }
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the broker.');
    });

    setTimeout(() => {
      if (socket && topic) {
        socket.emit('subscribe', topic);
        console.log(`Subscribed to topic: ${topic}`);
      }
    }, 500)

    // 새로운 메시지를 수신할 때 실행될 이벤트 핸들러
    newSocket.on('message', (receivedMessage) => {
      console.log(`Received message: ${receivedMessage}`);
    });


    return () => {
      newSocket.disconnect();
    };
  }, []);

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
      setMessage('');
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