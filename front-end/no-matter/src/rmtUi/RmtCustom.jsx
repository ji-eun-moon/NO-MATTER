import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add'; // +
import Fab from '@mui/material/Fab';

const RmtCustom = () => {
  const [active, setActive] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  const [customButton, setCustomButton] = useState({cusBtn1:[{active:false, currentX:0, currentY:150}],
                                                  cusBtn2:[{active:false, currentX:50, currentY:150}]})

  const addButton = () => {
    let cntBtn = Object.keys(customButton).length
    const baseData = [{active:false, currentX:50, currentY:150}]
    let copy = {...customButton}
    copy[`cusBtn${cntBtn+1}`] = baseData
    setCustomButton(copy)
  }

  const dragStart = (e, name, positionData) => {
    if (e.type === 'touchstart') {
      setInitialX(e.touches[0].clientX - positionData.currentX);
      setInitialY(e.touches[0].clientY - positionData.currentY);
      console.log(1)
    } else {
      setInitialX(e.clientX - positionData.currentX);
      setInitialY(e.clientY - positionData.currentY);
      console.log(2)
    }
    setActive(true);
    const data = [{active:active, currentX:currentX, currentY:currentY}]
    updateBtn(name, data)
  };

  const dragEnd = (name) => {
    setInitialX(currentX);
    setInitialY(currentY);
    setActive(false);
    const data = [{active:active, currentX:currentX, currentY:currentY}]
    updateBtn(name, data)
  };

  const drag = (e, name) => {
    if (active) {
      if (e.type === 'touchmove') {
        setCurrentX(e.touches[0].clientX - initialX);
        setCurrentY(e.touches[0].clientY - initialY);
      } else {
        setCurrentX(e.clientX - initialX);
        setCurrentY(e.clientY - initialY);
      }
      const data = [{active:active, currentX:currentX, currentY:currentY}]
      updateBtn(name, data)
    }
  };

  const selectBtn = (positionData) => {
    setActive(positionData.active)
    setCurrentX(positionData.currentX)
    setCurrentY(positionData.currentY)
    // setInitialX(0)
    // setInitialY(0)
  };

  const onTouchStart = (e, positionData, name) => {
    updateBtn(name, positionData)
    selectBtn(positionData[0])
    dragStart(e, name, positionData[0])
  }

  const updateBtn = (key, data) => {
    delete customButton[key]
    let copy = {...customButton}
    copy[key] = data
    setCustomButton(copy)
  }

  const cusBtnmapping = Object.entries(customButton).map(([name, position], index) => ({
    name,
    position,
    index,
  }));

  return (
    <div id="outerContainer">
      <Fab color="secondary" aria-label="add" onClick={addButton}>
        <AddIcon />
      </Fab>
      { cusBtnmapping.map((item) => (
          <div className="custom-button" key={item.name}>
            <div
              id="container"
              onTouchStart={(e) => {onTouchStart(e, item.position, item.name)}}
              onTouchEnd={() =>{dragEnd(item.name)}}
              onTouchMove={(e) => {drag(e, item.name)}}
              onMouseDown={(e) => {onTouchStart(e, item.position, item.name)}}
              onMouseUp={() =>{dragEnd(item.name)}}
              onMouseMove={(e) => {drag(e, item.name)}}
            >
              <div
                id="item"
                style={{
                  position: 'absolute',
                  left: `${item.position[0].currentX}px`,
                  top: `${item.position[0].currentY}px`,
                }}
              >
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default RmtCustom;
