import React, {useState, useEffect} from 'react';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded'; // 전원
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'; // 위 방향
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'; // 아래 방향
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'; // 음소거
import AddIcon from '@mui/icons-material/Add'; // +
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'; // -

import './RmtTvUi.css'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { useLocation } from 'react-router-dom';

function RmtTvUi() {
  const [open, setOpen] = React.useState(false);

  const location = useLocation()
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    const lastCharacter = location.pathname.slice(-1);
    setIsAdd(lastCharacter === "1");
  }, [location.pathname]);

  const selectButton = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    selectButton()
    console.log(e)
    // 신호를 입출력할 함수 필요
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',  
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const tenkey = [1, 2, 3, 4, 5, 6, 7, 8, 9, '-', 0]

  return(
    <div className="RmtTvUi">
      {
        isAdd ? <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 300 }}>
          <h2 id="child-modal-title">버튼을 등록합니다</h2>
          <p id="child-modal-description">
            허브를 향해<br/>리모컨 버튼을 눌러주세요
          </p>
          <div style={{display: 'flex', justifyContent:'flex-end'}}>
            <Button onClick={handleClose}>취소</Button>
          </div>
        </Box>
      </Modal> : null
      }
      
      <button className="ten-key-button" onClick={() => {handleClick('on/off')}} style={{borderRadius: '50px', paddingBottom:'17px'}}><PowerSettingsNewRoundedIcon/></button>
      <div></div>
      <div></div>

      {
        tenkey.map((i, key) => {
          return (
            <button key={key} className="ten-key-button" onClick={() => {handleClick(i)}}>{i}</button>
          )
        })
      }

      <button className="ten-key-button" onClick={() => {handleClick('channelback')}} style={{paddingTop:'0', paddingBottom:'0'}}>이전<br/>채널</button>
      
      <div className="button-box">
        <button className="func-button" onClick={() => {handleClick("soundup")}}><AddIcon/></button>
        <button className="text-button">음량</button>
        <button className="func-button" onClick={() => {handleClick('sounddown')}}><HorizontalRuleIcon/></button>
      </div>
      <div className="button-box-center">
        <div className="blank-button"></div>
        <button className="mute-button" onClick={() => {handleClick('mute')}}><VolumeOffRoundedIcon/></button>
        <div className="blank-button"></div>
      </div>
      <div className="button-box">
        <button className="func-button" onClick={() => {handleClick('channelup')}}><ExpandLessRoundedIcon/></button>
        <button className="text-button">채널</button>
        <button className="func-button" onClick={() => {handleClick('channeldown')}}><ExpandMoreRoundedIcon/></button>
      </div>
    </div>
  )
}

export default RmtTvUi;
