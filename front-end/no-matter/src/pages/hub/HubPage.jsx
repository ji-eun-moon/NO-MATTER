import React from 'react'
import axiosInstance from '../../config/axios'
import { useState, useEffect } from 'react'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
  const [ open, setOpen ] = React.useState(false);
  const [selectCode, setSelectCode ] = useState(false);
  const [code, setCode ] = useState('')
  const [hubName, setHubName ] = useState('')

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    console.log(open)
    e.stopPropagation();
    setOpen(false);
  };

  const clickCode = () => {
    setSelectCode(true)
  }

  const onCode = (event) => {
    setCode(event.currentTarget.value)
  }

  const onHubName = (event) => {
    setHubName(event.currentTarget.value)
  }

  const check = async () => {
    try {
      const response = await axiosInstance({
        method: 'Post',
        url: 'http://localhost:8080/api/v1/hub/readCode',
        data: {
          'code': code,
          'userHubName': hubName
        }
      });
  
      console.log(response);
      setOpen(false);
      await getHubs();  // 업데이트된 허브 목록을 가져옵니다.
      navigate('/hubs');
  
    } catch (error) {
      console.log(error);
      alert('초대 코드를 다시 입력해주세요');
    }
  }
  
  // const check = () => {
  //   axiosInstance({
  //     method : 'Post',
  //     url : 'http://localhost:8080/api/v1/hub/readCode',
  //     data : {
  //       'code' : code,
  //       'userHubName' : hubName
  //     }
  //   })
  //   .then((response)=>{
  //     console.log(response)
  //     setOpen(false)
  //     // window.location.reload();
  //     navigate('/hubs')
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     alert('초대 코드를 다시 입력해주세요')
  //   })

  // }
  const getHubs = () => {


    // 테스트 - json-server
    // axios.get('http://localhost:3001/hubs/')
    // .then((response) => {
    //   // console.log(response.data)
    //   setHubs(response.data)
    // })

    axiosInstance({
      method : 'Get',
      url : 'http://localhost:8080/api/v1/userhub/list',
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
    })
    .then((response) => {  
      // console.log(response.data)
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
        {/* <Card key={hub.id}> */}
            <div className='d-flex align-items-center justify-content-between' 
                  onClick={() => navigate(`/hubs/${hub.hubId}`, { state: hub })}
                  style={{width:"100%"}}>
              <div className='card-text'>
                {/* {hub.title} */}
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


  // const choice = () => {

  // }
  return (
    <div className="page-container container">
      <div className='d-flex justify-content-between mt-5'>
        <h1 className="font-700">My Hub</h1>
        {/* <div className="main-backgroud-color px-2 rounded">
          <i className="bi bi-people-fill fs-2 text-white"></i>
        </div> */}

      </div>
      <hr />
      {renderHubList()}
      <Card>
        <div className="centered" style={{width:"100%"}}
            // onClick={() => navigate('/hubs/addhub')}
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
              <Box sx={{ ...style, width: 300, position:"relative" }}>
                <div>
                  <i className="bi bi-x-lg" onClick={handleClose} style={{ position: 'absolute', top: 20, right: 20 }}></i>
                    <b>초대 코드를 입력하세요</b>
                    <br />
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
                <Button onClick={check}>SEND</Button>
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