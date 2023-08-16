import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axios.jsx'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './MainPage.scss'
import Card from '../../components/Card.jsx';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import useSpeechToText from '../../components/useSpeechToText.jsx';


function MainPage() {
  const { transcript, toggleListening, resetTranscript, processCommand } = useSpeechToText();
  const navigate = useNavigate();

  const [hubs, setHubs] = useState([]);
  const [remotes, setRemotes] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [initialHubId, setInitialHubId] = useState(null);
  const [userName, setUserName] = useState('')

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [listening, setListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const getUserInfo = () => {
    axiosInstance({
      method: 'Get',
      url: '/user/view',
      headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
    })
      .then((response) => {

        setUserName(response.data.userName)
      })
  }

  useEffect(() => {
    getUserInfo()
  }, []);


  useEffect(() => {
    if (listening) {
      startListening();
    }
  }, [listening]);

  useEffect(() => {
    startListening()
    getUserInfo()
  })

  const voiceClick = () => {
    console.log('click');
    setListening(true);
    setTimeout(() => {
      setListening(false);
    }, 10000);
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'ko-KR';
    recognition.onstart = () => {
      console.log('Speech recognition started');
    };
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);

      if (transcript.includes('노매타')) {
        setListening(true);
      }

      if (listening) {
        console.log('Recognized text:', transcript);
        processCommand(transcript)
        setTimeout(() => {

          setListening(false);
          setRecognizedText('')
        }, 2000);
      }
    };

    recognition.start();
  }

  const getHubs = () => {
    axiosInstance({
      method: 'Get',
      url: '/userhub/list',
      headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
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
    axiosInstance({
      method: 'Get',
      url: `/remote/list/${id}`,
      headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
    })
      .then((response) => {
        // console.log(response.data)
        setRemotes(response.data) // 리모컨 리스트
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
    <div className='container' style={{ position: "relative" }}>
      <div className='centered mt-5 mb-4' >
        <h1 className='welcome'>{userName}'s Home</h1>
      </div>
      <div className='container' style={{ background: 'linear-gradient(to bottom, #BECED2, #E2EAE9)', padding: "20px", borderRadius: "15px", height: "80vh" }}>
        <div className='d-flex mb-3 justify-content-between align-items-center'>
          <h1 className="font-700 ms-2" style={{ marginBottom: "0px" }}>연결된 기기</h1>
          {listening ?
            <Fab size='small' aria-label="add"
              style={{ borderRadius: "50%", backgroundColor: "#0097b2", color: "white", width: "60px", height: "60px" }} onClick={() => setListening(false)} >
              <i className="bi bi-mic-fill" style={{ fontSize: "30px" }} ></i>
            </Fab>
            :
            <Fab size='small' aria-label="add"
              style={{ borderRadius: "50%", backgroundColor: "#0097b2", color: "white", width: "60px", height: "60px" }} onClick={voiceClick}>
              <i className="bi bi-mic-mute-fill" style={{ fontSize: "30px" }}></i>
            </Fab>
          }

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
              <h5 style={{ position: "absolute", top: "40%" }}>등록된 기기가 없습니다.</h5>
            </div>
            :
            <Swiper spaceBetween={50} slidesPerView={1}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => handleSlideChange(swiper)}>
              {hubs.map((hub) => (
                <SwiperSlide key={hub.hubId}>

                  <div className="card mb-3 d-flex" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: "15px", height: "100%" }}>
                    <div className="card-text centered" style={{ paddingTop: '15px', fontSize: '25px' }}>
                      {hub.userHubName}
                    </div>
                    {remotes.length === 0 ?
                      <div className='centered' style={{ height: "60vh" }}>
                        <h5 style={{ position: "absolute", top: "40%" }}>등록된 리모컨이 없습니다.</h5>
                      </div>
                      :
                      <div className="card-body">
                        <div className='d-flex row justify-content-start align-items-baseline'>
                          {remotes.map((remote) => {
                            return (
                              <div className="col-6" key={remote.remoteId} onClick={() => navigate('/hubs/rmtdetail', { state: [remote.remoteType, false, remote.controllerName, hub.hubId, remote.remoteCode] })}>
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
      {listening ?
        <div className='voice-container' >
          <div className='d-flex flex-column'>
            <div className='centered'>
              <p style={{ color: "white" }}>허브 이름과 음성 명령어를 말씀하세요.</p>
            </div>
            <p style={{ color: "white" }}>{recognizedText}</p>
            <button className="btn" onClick={resetTranscript}>
              음성인식 초기화
            </button>
            <div className='centered'>
              <img src='/images/voice.gif' style={{ width: "200px", position: "absolute", bottom: "10px" }} />
            </div>
          </div>
        </div>
        :
        null
      }
    </div>

  )
}

export default MainPage

