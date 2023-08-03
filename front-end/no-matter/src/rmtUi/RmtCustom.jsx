import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ButtonBase, Fab, Box, Modal, Button, InputLabel, MenuItem,
        FormControl, Select } from "@mui/material";

import AddIcon from '@mui/icons-material/Add'; // +
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'; // -

const RmtCustom = () => {
  const [active, setActive] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  
  const [customButton, setCustomButton] = useState({
    cusBtn1:[{active:false, currentX:0, currentY:150, icon:'AddIcon'}],
    cusBtn2:[{active:false, currentX:50, currentY:150, icon:'HorizontalRuleIcon'}]
  })
  
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false)
  
  const [icon, setIcon] = useState('');
  
  const addButton = (e) => {
    let cntBtn = Object.keys(customButton).length
    const baseData = [{active:false, currentX:50, currentY:150, icon:e}]
    let copy = {...customButton}
    copy[`cusBtn${cntBtn+1}`] = baseData
    setCustomButton(copy)
  }

  const dragStart = (e, name, positionData) => {
    if (e.type === 'touchstart') {
      setInitialX(e.touches[0].clientX - positionData.currentX);
      setInitialY(e.touches[0].clientY - positionData.currentY);
    } else {
      setInitialX(e.clientX - positionData.currentX);
      setInitialY(e.clientY - positionData.currentY);
    }
    setActive(true);
  };

  const dragEnd = (name, btnIcon) => {
    if (isAdd === true) {
      setInitialX(currentX);
      setInitialY(currentY);
      setActive(false);
      const data = [{active:active, currentX:currentX, currentY:currentY, icon:btnIcon}]
      updateBtn(name, data)}
  };

  const drag = (e, name, btnIcon) => {
    if (active) {
      if (e.type === 'touchmove') {
        setCurrentX(e.touches[0].clientX - initialX);
        setCurrentY(e.touches[0].clientY - initialY);
      } else {
        setCurrentX(e.clientX - initialX);
        setCurrentY(e.clientY - initialY);
      }
      const data = [{active:active, currentX:currentX, currentY:currentY, icon:btnIcon}]
      updateBtn(name, data)
    }
  };

  /* 버튼 클릭시 실행 */
  const onTouchStart = (e, positionData, name) => {
    if (isAdd === true) {
      updateBtn(name, positionData)
      selectBtn(e, positionData[0])
      dragStart(e, name, positionData[0])
    }
  }

  /* 버튼 클릭시 실행되며 object에 저장된 x, y좌표값 state에 저장 */
  const selectBtn = (e, positionData) => {
    if (isAdd === true) {
      setActive(positionData.active)
      setCurrentX(positionData.currentX)
      setCurrentY(positionData.currentY)
    }
  };

  /* 버튼 좌표 object에 업데이트 */
  const updateBtn = (key, data) => {
    delete customButton[key]
    let copy = {...customButton}
    // const datas = [{active:active, currentX:currentX, currentY:currentY, icon:data[0].icon}]
    copy[key] = data
    setCustomButton(copy)
  }

  
  // 모달
  const location = useLocation()
  
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
  
  useEffect(() => {
    const lastCharacter = location.pathname.slice(-1);
    setIsAdd(lastCharacter === "1");
  }, [location.pathname]);
  
  const selectButton = () => {
    setOpen(true);
  }
  /* 리모컨 추가페이지 일때 모달 확인 버튼 함수 */
  const handleAddClose = () => {
    setOpen(false);
    addButton(icon)
  };
  
  /* 리모컨 추가페이지 일때 모달 취소 버튼 함수 */
  const handleClose = () => {
    setOpen(false);
  };
  
  /* 리모컨 버튼 추가 버튼 클릭 */
  const handleAddClick = (name) => (e) => {
    selectButton()
    // 신호를 입출력할 함수 필요
  }

  /* 리모컨 버튼 클릭 */
  const handleClick = (name) => (e) => {
    console.log(name)
    // 신호를 입출력할 함수 필요
  }
  
  // 아이콘 선택
  const handleChange = (event) => {
    setIcon(event.target.value);
  };
  
  const getIcon = (iconName) => {
    switch (iconName) {
      case "AddIcon":
        return <AddIcon />;
      case "HorizontalRuleIcon":
        return <HorizontalRuleIcon />;
    default:
      return null;
    }
  };

  /* object 순회 mapping */
  const cusBtnmapping = Object.entries(customButton).map(([name, position], index) => ({
    name,
    position,
    index,
  }));
        
  return (
    <div id="outerContainer">
      {
        isAdd ? <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        >
          <Box sx={{ ...modalStyle, width: 300 }}>
            <h2 id="child-modal-title">버튼을 추가합니다</h2>
            <p id="child-modal-description">
              허브를 향해<br/>리모컨 버튼을 눌러주세요
            </p>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">아이콘</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={icon}
                  label="Icon"
                  onChange={handleChange}
                  >
                  <MenuItem value={'AddIcon'}>+</MenuItem>
                  <MenuItem value={'HorizontalRuleIcon'}>-</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div style={{display: 'flex', justifyContent:'flex-end'}}>
              <Button onClick={handleAddClose}>확인</Button>
              <Button onClick={handleClose}>취소</Button>
            </div>
          </Box>
        </Modal> 
        : null
      }
      {
        isAdd ? 
        <Fab color="secondary" aria-label="add" onClick={handleAddClick()}>
          <AddIcon />
        </Fab>
        : null
      }

      { cusBtnmapping.map((item) => (
          <div className="custom-button" key={item.name}>
            <div
              id="container"
              onTouchStart={(e) => {onTouchStart(e, item.position, item.name)}}
              onTouchEnd={() =>{dragEnd(item.name, item.position[0].icon)}}
              onTouchMove={(e) => {drag(e, item.name, item.position[0].icon)}}
            >
              <div
                id="item"
                style={{
                  position: 'absolute',
                  left: `${item.position[0].currentX}px`,
                  top: `${item.position[0].currentY}px`,
                }}
              >
                {/* <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab> */}
                <ButtonBase
                  key={item.name}
                  component={Fab}
                  color="primary"
                  style={{ borderRadius: "50%" }}
                  onClick={handleClick(item.name)}
                >
                  {getIcon(item.position[0].icon)}
                </ButtonBase>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default RmtCustom;
