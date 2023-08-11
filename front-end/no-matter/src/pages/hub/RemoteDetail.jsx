import React, { useState, useRef } from 'react';
import { useLocation } from "react-router";
import RmtTvUi from '../../rmtUi/RmtTvUi.jsx';
import RmtFanUi from '../../rmtUi/RmtFanUi.jsx';
import RmtCustom from '../../rmtUi/RmtCustom.jsx';
import RmtAc from '../../rmtUi/RmtAc.jsx';

function RemoteDetail() {
  const remoteType = useLocation()
  const isCreate = remoteType.state[1]
  console.log(isCreate)

  return (
      <div className="container page-container">
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