import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import RmtTvUi from '../../rmtUi/RmtTvUi.jsx';
import RmtFanUi from '../../rmtUi/RmtFanUi.jsx';
import RmtCustom from '../../rmtUi/RmtCustom.jsx';
import RmtAc from '../../rmtUi/RmtAc.jsx';

import mqtt from 'mqtt'

// mosquitto_pub -h i9c105.p.ssafy.io -p 1883 -t {허브고유id(uuid)}/{유저id}
//  -m "{동작}/{리모컨이름}/{버튼이름}"

function RemoteDetail() {
  
  const remoteType = useLocation()
  const isCreate = remoteType.state[1]
  console.log(isCreate)
  const [msg, setMsg] = useState(<em>...</em>);

  useEffect(() => {
    const client = mqtt.connect(
      "mqtt://i9c105.p.ssafy.io:1883"
    );

    client.subscribe("publishtopic");
    console.log("Client subscribed ");

    const handleMessage = (topic, message) => {
      const note = message.toString();
      setMsg(note);
      console.log(note);
      client.end();
    };

    client.on("message", handleMessage);

    return () => {
      client.removeListener("message", handleMessage);
    };
  }, []);


  return (
      <div className="container page-container">
        <div>{msg}</div>
        {
          remoteType.state[0] === 'TV' ? <RmtTvUi isCreate={isCreate}/> :
          (
            remoteType.state[0] === 'AC' ? <RmtAc isCreate={isCreate}/> :
            (
              remoteType.state[0] === 'Fan' ? <RmtFanUi isCreate={isCreate}/> : 
              <RmtCustom isCreate={isCreate}/>
            )
          )
        }
      </div>
  );
}

export default RemoteDetail