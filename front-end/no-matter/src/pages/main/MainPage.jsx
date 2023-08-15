import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './MainPage.scss'
import Card from '../../components/Card.jsx';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function MainPage() {
  const navigate = useNavigate();

  // const hublist = ['1번']
  const [hubs, setHubs] = useState([]);
  const [remotes, setRemotes] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [initialHubId, setInitialHubId] = useState(null);
  const [userName, setUserName] = useState('')

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const getUserInfo = () => {
    axiosInstance({
      method : 'Get',
      url : '/user/view',
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
    })
    .then((response) => {
      // console.log(response.data.userName)
      // const responseData = response.data;
      // const userDataString = responseData.substring(responseData.indexOf("User(") + 5, responseData.indexOf(")"));
      // const userDataPairs = userDataString.split(', ');
      // const extractedData = {};
      // userDataPairs.forEach(pair => {
      //   const [key, value] = pair.split('=');
      //   extractedData[key] = value;
      // });
      // const userName = extractedData.userName;
      setUserName(response.data.userName)
    })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  const getHubs = () => {
    axiosInstance({
      method : 'Get',
      url : '/userhub/list',
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
    })
    .then((response) => {  
      // console.log(response.data)
      setHubs(response.data)
    })
  }

  useEffect(() => {
    getHubs()
    if (hubs.length > 0 && initialHubId === null) {
      setInitialHubId(hubs[0].hubId);
    }
  }, [])

  const getRemote = (id) => {
    // setLoading(true);
    axiosInstance({
      method : 'Get',
      url : `/remote/list/${id}`,
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
    })
    .then((response) => {
      // console.log(response.data)
      setRemotes(response.data) // 리모컨 리스트
      // setLoading(false);
    })
  }

  useEffect(() => {
    // initialHubId가 존재할 때만 리모컨 리스트 가져오기
    if (initialHubId !== null) {
      getRemote(initialHubId);
    }
  }, [initialHubId]);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
    if (hubs[swiper.activeIndex]) {
      const hubId = hubs[swiper.activeIndex].hubId;
      getRemote(hubId);
    }
  };

  return (
    <div className='container' style={{position:"relative"}}>
      <div className='centered mt-5 mb-4' >
        <h1 className='welcome'>{userName}'s Home</h1>
      </div>
      {/* <div className='d-flex justify-content-center p-3'>
          <img src="images/logo2.png" alt="No Matter logo" style={{width:"300px"}}/>
        </div> */}
        {/* <div className="card mb-2" style={{backgroundColor:'#E6F4F1'}}>
          <div className="card-body d-flex">
            <div className="card-text" style={{marginBottom:'15px', marginTop:'15px', marginLeft:'10px'}}>
              <h1 className="font-700" style={{marginBottom:'20px'}}>반갑습니다.</h1>
              <h1 className="font-700">한석현 님</h1>
          </div>
        </div>
      </div>
       */}

      {/* <Swiper
        spaceBetween={50}
        slidesPerView={1}
      >
        {
          hublist.map((hub)=>{
            return (
              <SwiperSlide>
                <div className="card mb-3" style={{backgroundColor:'white'}}>
                  <div className="card-text" style={{paddingLeft:'15px', paddingTop:'15px'}}>{hub}</div>
                  <div className="card-body d-flex justify-content-start row">
                    {
                      rmtlist1.map((rmt)=>{
                        return (
                          <div className="col-6">
                            <Card>
                              {rmt}
                            </Card>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper> */}
      <div className='container' style={{ background: 'linear-gradient(to bottom, #BECED2, #E2EAE9)', padding: "20px", borderRadius: "15px", height: "80vh" }}>
        <div className='d-flex mb-3 justify-content-between align-items-center'>
          <h1 className="font-700 ms-2" style={{ marginBottom: "0px" }}>연결된 기기</h1>
          <Fab color="action" aria-label="add" onClick={handleMenuOpen}>
            <AddIcon />
          </Fab>
        </div>
        <div>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              navigate('/hubs/addhub');
              handleMenuClose();
            }} style={{ fontWeight: "900", fontSize: "20px" }}>
              허브 추가
            </MenuItem>
            <MenuItem onClick={() => {
              navigate('/routine/addroutine')
              handleMenuClose();
            }} style={{ fontWeight: "900", fontSize: "20px" }}>
              루틴 추가
            </MenuItem>
          </Menu>
        </div>

        <div className='remote-card-list-container'>
          {hubs.length === 0 ?
            <div className='centered' style={{ height: "60vh" }}>
              <h5 style={{ position:"absolute", top:"40%" }}>등록된 기기가 없습니다.</h5>
            </div>
            :
            <Swiper spaceBetween={50} slidesPerView={1}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => handleSlideChange(swiper)}>
              {hubs.map((hub) => (
                <SwiperSlide key={hub.hubId}>

                  <div className="card mb-3 d-flex" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: "15px", height:"100%"}}>
                    <div className="card-text centered" style={{ paddingTop: '15px', fontSize: '25px' }}>
                      {hub.userHubName}
                    </div>
                    {remotes.length === 0 ? 
                      <div className='centered' style={{ height: "60vh" }}>
                        <h5 style={{ position:"absolute", top:"40%" }}>등록된 리모컨이 없습니다.</h5>
                      </div>
                    :
                      <div className="card-body">
                        <div className='d-flex row justify-content-start align-items-baseline'>
                        {remotes.map((remote) => {
                          return (
                            <div className="col-6" key={remote.remoteId} onClick={() => navigate('/hubs/rmtdetail', {state: [remote.remoteType, false, remote.controllerName, hub.hubId]})}>
                              <Card>
                                <div className='centered' style={{ width: "100%" }}>
                                  <span style={{ fontWeight: "700", marginBottom: "0px", fontSize: "18px" }}>{remote.controllerName}</span>
                                </div>
                              </Card>
                            </div>
                          )
                        })}
                        </div>
                      </div>
                    }
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>}
        </div>
        <div className='centered'>
          <div className="pagination-dots-container" style={{ position: "absolute", bottom: "90px" }}>
            {hubs.map((_, index) => (
              <div key={index} className={`pagination-dot ${activeSlide === index ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default MainPage