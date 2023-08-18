import React, {useState} from 'react'
import './Routine.scss'

function SelectButton({remoteType, selectRemoteButton}) {

    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (label, buttonName) => {
      selectRemoteButton(label, buttonName);
      setSelectedButton(label);
    };

    const tvButtons = [
        { label: '전원 ON/OFF', buttonName: 'KEY_POWER' },
        { label: '1', buttonName: 'KEY_1' },
        { label: '2', buttonName: 'KEY_2' },
        { label: '3', buttonName: 'KEY_3' },
        { label: '4', buttonName: 'KEY_4' },
        { label: '5', buttonName: 'KEY_5' },
        { label: '6', buttonName: 'KEY_6' },
        { label: '7', buttonName: 'KEY_7' },
        { label: '8', buttonName: 'KEY_8' },
        { label: '9', buttonName: 'KEY_9' },
        { label: '-', buttonName: '-' },
        { label: '0', buttonName: 'KEY_0' },
        { label: '채널 뒤로', buttonName: 'channelback' },
        { label: '음량 +', buttonName: 'KEY_UP' },
        { label: '음량 -', buttonName: 'sounddown' },
        { label: '음소거', buttonName: 'mute' },
        { label: '채널 +', buttonName: 'channelup' },
        { label: '채널 -', buttonName: 'channeldown' },
    ];

    const acButtons = [
        { label: '전원 ON', buttonName: 'TurnOn' },
        { label: '전원 OFF', buttonName: 'TurnOff' },
        { label: '온도 +', buttonName: 'increaseTemperature' },
        { label: '온도 -', buttonName: 'decreaseTemperature' },
        { label: '바람 +', buttonName: 'increaseWindSpeed' },
        { label: '바람 -', buttonName: 'decreaseWindSpeed' },
        { label: 'Mode 1', buttonName: 'mode1' },
        { label: 'Mode 2', buttonName: 'mode2' },
        { label: 'Mode 3', buttonName: 'mode3' },
    ];

    const fanButtons = [
        { label: '바람 세기', buttonName: 'WindSpeed' },
        { label: '타이머', buttonName: 'Timer' },
        { label: 'Mode', buttonName: 'Mode' },
        { label: '회전', buttonName: 'RotateFan' },
        { label: '전원 OFF', buttonName: 'TurnOff' },
        { label: '전원 ON', buttonName: 'TurnOn' },
    ]

    const renderRemoteButtonList = () => {
      let buttons = [];
      if (remoteType === 'AC') {
        buttons = acButtons;
      } else if (remoteType === 'Fan') {
        buttons = fanButtons;
      } else if (remoteType === 'TV') {
        buttons = tvButtons;
      }
  
      return buttons.map((button, index) => (
        <div
          key={index}
          className={`remote-card ${selectedButton === button.label ? 'selected' : ''}`}
          onClick={() => handleButtonClick(button.label, button.buttonName)}
        >
          {button.label}
        </div>
      ));
    };
  
    return <div className="remote-card-container">{renderRemoteButtonList()}</div>;
  }
  
  export default SelectButton;