import React, { useState, useEffect } from 'react'
import axiosInstance from '../../config/axios.jsx'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { Box, Paper, Modal, TextField, Button } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function HubPage() {
  const navigate = useNavigate();
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen ] = React.useState(false);
  const [selectCode, setSelectCode ] = useState(false);
  const [code, setCode ] = useState('')
  const [hubName, setHubName ] = useState('')

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    setSelectCode(false);
    setCode('')
    setHubName('')
  };

  const clickCode = () => {
    setSelectCode(true)
  }

  const onCode = (event) => {
    setCode(event.currentTarget.value)
  }

  const onHubName = (event) => {
    if(event.target.value.length <= 5){
      setHubName(event.currentTarget.value)
    }
  }

  const check = async () => {
    try {
      const response = await axiosInstance({
        method: 'Post',
        url: '/hub/readCode',
        data: {
          'code': code,
          'userHubName': hubName
        }
      });
  
      setOpen(false);
      await getHubs();  // 업데이트된 허브 목록을 가져옵니다.
      navigate('/hubs');
  
    } catch (error) {
      if (error.response.status === 409) {
        // 이미 등록된 허브인 경우
        alert('이미 등록되어 있는 허브입니다.');
      } else if (error.response.status === 404) {
        // 유효하지 않은 초대 코드인 경우
        alert('유효하지 않은 초대 코드입니다.');
      } else {
        // 기타 에러 처리
        console.error(error);
        alert('초대 코드 검증 중 오류가 발생했습니다.');
      }
    }
  }
  
  const getHubs = () => {

    axiosInstance({
      method : 'Get',
      url : '/userhub/list',
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
    })
    .then((response) => {  
      setHubs(response.data)
      setLoading(false);
    })
  }

  useEffect(() => {
    getHubs()
  }, [])

  const renderHubList = () => {
    if (loading) {
      return (
        <LoadingSpinner/>
      )
    }

    if (hubs.length === 0) {
      return (
        <div className='centered m-5'>
          아직 등록된 허브가 없습니다.
        </div>
      )}
    
    return hubs.map(hub => {
      return (
        <Card key={hub.hubId}>
            <div className='d-flex align-items-center justify-content-between' 
                  onClick={() => navigate(`/hubs/${hub.hubId}`, { state: hub })}
                  style={{width:"100%"}}>
              <div className='card-text'>
                {hub.userHubName} 
              </div>
              <div>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
        </Card>
      )
    })
  }

  return (
    <div className="page-container container">
      <div className='d-flex justify-content-between mt-5 container'>
        <h1 className="font-700">My Hub</h1>
      </div>
      <hr />
      {renderHubList()}
      <Card>
        <div className="centered" style={{width:"100%"}}
            onClick={handleOpen}>
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
          <div className="text-secondary" >허브 추가하기</div>        
          {selectCode?
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{ ...style, width: 300, position:"relative" }}
                  style={{ backgroundColor:"#FCFCFC", borderRadius:"10px", border:"1px solid #FCFCFC", padding:"20px"}}>
                <div>
                  <i className="bi bi-x-lg" onClick={handleClose} style={{ position: 'absolute', top: 20, right: 20 }}></i>
                    <p style={{fontSize:"18px", fontWeight:"700"}}>초대 코드를 입력하세요</p>
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField id="standard-basic" label="초대 코드" variant="standard" value={code} onChange={onCode} />
                      <TextField id="standard-basic" label="허브 이름" variant="standard" value={hubName} onChange={onHubName} />
                    </Box>
                </div>
                <br />
                <div className='centered'>
                  <Button variant="contained" size="large" onClick={check}>SAVE</Button>
                </div>
              </Box>
            </Modal>
          :         
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{ ...style, width: 300, position:"relative" }} 
                   style={{ backgroundColor:"#FCFCFC", borderRadius:"10px", border:"1px solid #FCFCFC", padding:"20px"}}>
                <div>
                <i className="bi bi-x-lg" onClick={handleClose} style={{ position: 'absolute', top: 20, right: 20 }}></i>
                  <p style={{fontSize:"18px", fontWeight:"700"}} className='ms-2'>허브 등록 방법을 선택하세요.</p>
                  <br />
                    <div className='d-flex justify-content-center'>
                      <Box
                        onClick = {clickCode}
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          '& > :not(style)': {
                            m: 1,
                            width: 128,
                            height: 128,
                            transition: 'transform 0.3s',  // smooth transition                          
                          }
                        }}                     
                      >
                        <Paper elevation={3} style={{padding:"5px"}} className='centered'>
                          <div className='centered flex-column'>
                            <p style={{fontSize:'18px', fontWeight:'bold', marginBottom:"0px"}}>초대 코드 입력</p>
                            <KeyIcon fontSize='large'/>
                          </div>
                        </Paper>
                      </Box>               

                      <Box
                        onClick ={() => navigate('/hubs/addhub')}
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          '& > :not(style)': {
                            m: 1,
                            width: 128,
                            height: 128,
                            transition: 'transform 0.3s',  // smooth transition
                          }
                        }}
                      >
                        <Paper elevation={3} style={{padding:"5px"}} className='centered'>
                          <div className='centered flex-column'>
                            <p style={{fontSize:'18px', fontWeight:'bold' , marginBottom:"0px"}}>직접 추가</p>
                            <PanToolAltIcon fontSize='large'/>
                          </div>
                  
                        </Paper>
                      </Box>               

                    </div>
                </div>
              </Box>
            </Modal>
          }
        </div>
      </Card>
    </div>
  )
}

export default HubPage