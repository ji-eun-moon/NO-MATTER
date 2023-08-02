import React from 'react';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded'; // 전원
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'; // 위 방향
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'; // 아래 방향
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'; // 음소거
import AddIcon from '@mui/icons-material/Add'; // +
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'; // -

import './RmtTvUi.scss'

function RmtTvUi() {
  return(
    <div className="RmtTvUi">
      <button className="ten-key-button" style={{borderRadius: '50px', paddingBottom:'17px'}}><PowerSettingsNewRoundedIcon/></button>
      <div></div>
      <div></div>
      <button className="ten-key-button">1</button>
      <button className="ten-key-button">2</button>
      <button className="ten-key-button">3</button>
      <button className="ten-key-button">4</button>
      <button className="ten-key-button">5</button>
      <button className="ten-key-button">6</button>
      <button className="ten-key-button">7</button>
      <button className="ten-key-button">8</button>
      <button className="ten-key-button">9</button>
      <button className="ten-key-button">-</button>
      <button className="ten-key-button">0</button>
      <button className="ten-key-button" style={{paddingTop:'0', paddingBottom:'0'}}>이전<br/>채널</button>
      
      <div className="button-box">
        <button className="func-button"><AddIcon/></button>
        <button className="func-button">음량</button>
        <button className="func-button"><HorizontalRuleIcon/></button>
      </div>
      <div className="button-box-center">
        <div className="func-button"></div>
        <button className="func-button"><VolumeOffRoundedIcon/></button>
        <div className="func-button"></div>
      </div>
      <div className="button-box">
        <button className="func-button"><ExpandLessRoundedIcon/></button>
        <button className="func-button">채널</button>
        <button className="func-button"><ExpandMoreRoundedIcon/></button>
      </div>
    </div>
  )
}

export default RmtTvUi;
