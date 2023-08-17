import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import RmtTvUi from '../../rmtUi/RmtTvUi.jsx';
import RmtFanUi from '../../rmtUi/RmtFanUi.jsx';
import RmtCustom from '../../rmtUi/RmtCustom.jsx';
import RmtAc from '../../rmtUi/RmtAc.jsx';
import axiosInstance from '../../config/axios.jsx'


import io from 'socket.io-client'
const BrokerAddress = 'https://i9c105.p.ssafy.io:8443'

function RemoteDetail() {
  const [topic, setTopic] = useState('')
  const [socket, setSocket] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState('')

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
  
  useEffect(() => {
    newSocket.on('message', (receivedMessage) => {
      console.log(`Received message: ${receivedMessage}`);
      setReceiveMessage(receivedMessage)
    });
  }, [newSocket])

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
          publishMessage={publishMessage} remoteCode={remoteCode} receiveMessage={receiveMessage}/> :
          (
            remoteType.state[0] === 'AC' ? <RmtAc isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
            publishMessage={publishMessage} remoteCode={remoteCode} receiveMessage={receiveMessage}/> :
            (
              remoteType.state[0] === 'Fan' ? <RmtFanUi isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
              publishMessage={publishMessage} remoteCode={remoteCode} receiveMessage={receiveMessage}/> : 
              <RmtCustom isCreate={isCreate} remoteName={remoteType.state[2]} hubId={hubId}
              publishMessage={publishMessage} remoteCode={remoteCode} receiveMessage={receiveMessage}/>
            )
          )
        }
      </div>
  );
}

export default RemoteDetail