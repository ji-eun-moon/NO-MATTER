import React from 'react'
import { useParams, } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axiosInstance from '../../config/axios.jsx'
import Card from '../../components/Card.jsx';
import GoBack from '../../components/GoBack.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import SwipeCard from '../../components/SwipeCard.jsx';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

import io from 'socket.io-client'
const BrokerAddress = 'i9c105.p.ssafy.io:3002'

function useNonNullEffect(callback, deps) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (callbackRef.current && deps.every(dep => dep !== null)) {
      return callbackRef.current();
    }
  }, deps);
}

function RemotePage() {
  const { hubId } = useParams()  // 허브 id
  const [usersHubsId, setUsersHubsId] = useState(null) // 허브 id
  const [userId, setUserId] = useState(''); // 유저 id
  const [hub, setHub] = useState([]);
  const [remotes, setRemotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hubStatusChange, setHubStatusChange] = useState(false) // 허브 모드 변경이 필요한가
  const [progress, setProgress] = React.useState(0);
  const [isUse, setIsUse] = useState(true) // 리모컨 사용인가
  const [selectRmtData, setSelectRmtData] = useState([])

  const navigate = useNavigate();



  // topic == 허브uuid/RC/CONTROLL
  // topic == 허브uuid/IR
  const [topic, setTopic] = useState('')
  const [socket, setSocket] = useState(null)

  const getUuid = () => {
    axiosInstance({
      method :'GET',
      url: `/hub/view/${hubId}`,
    }).then((response) => {
      const hubuuid = response.data.hubUuid
      setTopic(`${hubuuid}/IR/`)
    })
  }
  
  useEffect(() => {
    hubInfo(hubId)
    getRemote(hubId)

    const newSocket = io(BrokerAddress, {
      cors: { origin: '*' }
    });
    getUuid()
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the broker.');
    });

    if (newSocket && topic) {
      newSocket.emit('subscribe', topic);
      console.log(`Subscribed to topic: ${topic}`);
    }

    return () => {
      newSocket.disconnect();
    };
  }, [hubId]);

  React.useEffect(() => {
    // 30초 동안 100번 progress를 증가시키려면 300ms 간격으로 증가시켜야 합니다.
    const intervalTime = 300;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 0;
        }
        return oldProgress + 1;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 새로운 메시지를 수신할 때 실행될 이벤트 핸들러
  useNonNullEffect(() => {
    socket.on('message', (receivedMessage) => {
      console.log(receivedMessage)
      // 리모컨 수정 or 추가 일때 허브 수신모드
      if (receivedMessage === 'RECEIVE' && isUse === false) {
        navigate('/hubs/addrmt', { state: hubId })
      // 리모컨 수정 or 추가 일때 허브 송출모드
      } else if (receivedMessage === 'TRANSMIT' && isUse === false) {
        publishMessage('TRANSMIT')
        setHubStatusChange(true)
        setTimeout(setHubStatusChange(false), 30000)
      // 리모컨 사용 일때 허브 수신모드
      } else if (receivedMessage === 'RECEIVE' && isUse === true) {
        publishMessage('RECEIVE')
        setHubStatusChange(true)
        setTimeout(setHubStatusChange(false), 30000)
      // 리모컨 사용 일때 허브 송출모드
      } else if (receivedMessage === 'TRANSMIT' && isUse === true) {
        navigate('/hubs/rmtdetail', { state: selectRmtData })
      }
    });
  }, [socket])

  const publishMessage = (message) => {
    if (socket && topic && message) {
      socket.emit('publish', { topic, message });
      console.log(`Published message "${message}" to topic: ${topic}`);
    }
  };

  const goRmtDetail = (data) => {
    setSelectRmtData(data)
    setIsUse(true)
    // publishMessage('IR/STATUS')
    navigate('/hubs/rmtdetail', { state: data })
  }



  // 특정 허브 정보 저장
  const hubInfo = (hubId) => {
    axiosInstance({
      method: 'Get',
      url: '/userhub/list',
      headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
    })
      .then((response) => {
        const specificHub = response.data.find(hub => hub.hubId === parseInt(hubId));
        setHub(specificHub);
        setUserId(specificHub.userId)
        setUsersHubsId(specificHub.usersHubsId)
      });
  }

  // json-server 테스트용
  // axios.get(`http://localhost:3001/hubs/${id}`)
  // .then((response) => {
  //   setHub(response.data)  // 허브 정보
  //   setRemotes(response.data.remotes) // 리모컨 리스트
  // })

  ////////////////////
  //    // S O S    //
  //    // S O S    //
  //    // S O S    //
  ////////////////////

  // 나 좀 살 려 줘
  // H E L P M E 

  const getRemote = (hubId) => {
    axiosInstance({
      method: 'Get',
      url: `/remote/list/${hubId}`,
      headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
    })
      .then((response) => {
        setRemotes(response.data) // 리모컨 리스트
        setLoading(false);
      })

  }

  // console.log(hub)
  // useEffect(() => {
  //   hubInfo(hubId)
  //   getRemote(hubId)
  // }, [hubId])

  const clickDelete = (remoteId) => {
    console.log('click Delete')
    axiosInstance({
      method : 'Delete',
      url : `remote/delete/${remoteId}`,
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`},
    })
    .then((response) => {  
      console.log('response : ',response.data)
      window.location.reload()
      // setHubs(response.data)
      // setLoading(false);
    })

  }


  const renderRemoteList = () => {
    if (loading) {
      return (
        <LoadingSpinner />
      )
    }

    if (remotes.length === 0) {
      return (
        <div className='centered m-5'>
          아직 등록된 리모컨이 없습니다.
        </div>
      )
    }

    return remotes.map(remote => {
      return (
        <div key={remote.remoteId} className='card mb-3' style={{ height: '80px', padding: '0', border: '0px', overflow: 'hidden' }}>
          <SwipeCard>
            <div className='d-flex align-items-center row'
              style={{ width: "100%" }}>
              <div className='card-text col-11'
                onClick={() => goRmtDetail([remote.remoteType, false, remote.controllerName, hubId])}>{remote.controllerName}</div>
            </div>
          </SwipeCard>
          <div className='card-body mb-3 d-flex justify-content-between' style={{ position: 'absolute', padding: '0', width: '100%' }}>
            {/* 리모컨 수정 */}
            <div className="card mb-3 bg-primary" style={{ height: '79px', width: '79px', marginLeft: '1px' }}>
              <div className="card-body centered">
                <SettingsOutlinedIcon fontSize='large' style={{ color: 'white' }} onClick={() => navigate('/hubs/rmtdetail', { state: [remote.remoteType, true, remote.controllerName, hubId] })} />
              </div>
            </div>
            {/* 리모컨 삭제 */}
            <div className="card mb-3 bg-danger" style={{ height: '79px', width: '79px', marginRight: '1px' }} onClick={() => clickDelete(remote.remoteId)}>
              <div className="card-body centered">
                <RemoveCircleOutlineOutlinedIcon fontSize='large' style={{ color: 'white' }} />
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  const goMember = () => {
    // if(hub.userHubAuth === 'admin'){
    navigate(`/hubs/members/${hubId}`, { state: hub.userHubAuth })
    // }
    // else{
    //   alert('권한이 없습니다')
    // }
  }

  const addRmt = () => {
    setIsUse(false)
    publishMessage('RECEIVE')
    setHubStatusChange(true)
    setTimeout(() => {
      navigate('/hubs/addrmt', { state: hubId })
    setHubStatusChange(false)
    }, 30000)
  }


  const hubDelete = () => {
    console.log('hub : ', hub)
    if (hub && hub.userHubAuth === 'admin' ) {
      swal({
        title: "정말 삭제하시겠습니까?",
        text: "삭제하시면 다시 되돌릴 수 없습니다",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axiosInstance({
              method: 'Post',
              url: `/userhub/deleteUserHub/${usersHubsId}`,
              headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
            })
              .then((response) => {
                console.log('이거 : ',response.data)
                navigate('/hubs')
                window.location.reload()
              })
              .catch((err) => {
                console.log('catch 찍음 : ', err)
                swal({
                  title : "본인 이외에 사용자가 있어 삭제할 수 없습니다",
                  dangerMode: true,
                });
                navigate('/hubs')
          })
          }
          
        });
    }
    // else if (hub && hub.userHubAuth === 'admin' && hub.length > 1) {
    //   swal({
    //     title: "본인 이외에 사용자가 있어 삭제할 수 없습니다",
    //     text: "삭제하시면 다시 되돌릴 수 없습니다",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    //   })
    //     .then((willDelete) => {
    //       if (willDelete) {
    //         axiosInstance({
    //           method: 'Post',
    //           url: `/userhub/deleteUserHub/${hubId}`,
    //           headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
    //         })
    //           .then((response) => {
    //             console.log(response.data)
    //             navigate('/hubs')
    //           })
    //       }
    //     });

    // }
    else {
      swal({
        title: "정말 나가시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axiosInstance({
              method: 'Post',
              url: `/userhub/deleteUserHub/${usersHubsId}`,
              headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
            })
              .then((response) => {
                console.log(response.data)
                navigate('/hubs')
              })
          }
        });
    }
  }

  // React.useEffect(() => {
  //   hubInfo(hubId)
  //   getRemote(hubId)

  //   const interval = 30000 / 100; 
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         clearInterval(timer);
  //         return 100;
  //       }
  //       return oldProgress + 1;
  //     });
  //   }, interval);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [hubId]);

  return (
    <>
      {
        hubStatusChange ?
          (<div className="container page-container">
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <div style={{
                width: "500px",
                height: "500px",
                backgroundImage: `url("/images/logoGif.gif")`,
                backgroundSize: "cover",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                color: "black", // 텍스트 색상 설정,
                fontSize: "30px",
                fontWeight: "bold"
              }}>
                30초 정도 소요됩니다...
              </div>
              <Box sx={{ width: '100%' }}>
                {/* <LinearProgress variant="determinate" value={progress} /> */}
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </Box>
            </div>
          </div>)
          :
        <div className="container page-container">
          {/* <div className='d-flex justify-content-between mt-5'>
            <div className='d-flex'>
              <GoBack />
              <h1 className="font-700">{hub.userHubName}</h1>
              {hub.userHubAuth === 'admin' ?
                (<div className='d-flex flex-column justify-content-center align-items-center ms-2'
                  style={{ backgroundColor: "#fdd969", borderRadius: "10px", padding: "5px 10px 5px" }}>
                  <img src="/images/crown.png" alt="crown" style={{ width: "16px", height: "25px" }} />
                  <p style={{ fontWeight: 'bold', fontSize: '7px', color: "white", margin: "0px" }}>ADMIN</p>
                </div>)
                : (hub.userHubAuth === 'manager' ?
                  (<div className='d-flex flex-column justify-content-center align-items-center ms-2'
                    style={{ backgroundColor: "#11c942", borderRadius: "10px", padding: "5px 10px 5px" }}>
                    <img src="/images/crown.png" alt="crown" style={{ width: "16px", height: "25px" }} />
                    <p style={{ fontWeight: 'bold', fontSize: '6px', color: "white", margin: "0px" }}>MANAGER</p>
                  </div>)
                  :
                  (<div className='d-flex flex-column justify-content-center align-items-center ms-2'
                    style={{ backgroundColor: "#b6b6b6", borderRadius: "10px", padding: "5px 10px 5px" }}>
                    <img src="/images/crown.png" alt="crown" style={{ width: "16px", height: "25px" }} />
                    <p style={{ fontWeight: 'bold', fontSize: '8px', color: "white", margin: "0px" }}>USER</p>
                  </div>))
              }
            </div>
            {hub.userHubAuth === 'admin' &&
                <div className='d-flex' onClick={goMember}>
                  <div className="main-backgroud-color px-2 rounded centered">
                    <i className="bi bi-people-fill fs-2 text-white"></i>
                  </div>
                </div>
            }
          </div> */}
          <div className='d-flex justify-content-between align-items-center mt-5'>
            <div className='d-flex align-items-center'>
              <GoBack />
              <h1 className="font-700" style={{margin: '0px'}}>{hub.userHubName}</h1>
              {hub.userHubAuth === 'admin' ?
                (<div className='d-flex flex-column justify-content-center align-items-center ms-2'
                  style={{ backgroundColor: "#fdd969", borderRadius: "10px", padding: "5px 10px 5px", width:"48px", height:"45px" }}>
                  <img src="/images/crown.png" alt="crown" style={{ width: "16px", height: "25px" }} />
                  <p style={{ fontWeight: 'bold', fontSize: '7px', color: "white", margin: "0px" }}>ADMIN</p>
                </div>)
                : (hub.userHubAuth === 'manager' ?
                  (<div className='d-flex flex-column justify-content-center align-items-center ms-2'
                    style={{ backgroundColor: "#11c942", borderRadius: "10px", padding: "5px 10px 5px", width:"48px", height:"45px" }}>
                    <img src="/images/crown.png" alt="crown" style={{ width: "16px", height: "25px" }} />
                    <p style={{ fontWeight: 'bold', fontSize: '6px', color: "white", margin: "0px" }}>MANAGER</p>
                  </div>)
                  :
                  (<div className='d-flex flex-column justify-content-center align-items-center ms-2'
                    style={{ backgroundColor: "#b6b6b6", borderRadius: "10px", padding: "5px 10px 5px", width:"48px", height:"45px" }}>
                    <img src="/images/crown.png" alt="crown" style={{ width: "16px", height: "25px" }} />
                    <p style={{ fontWeight: 'bold', fontSize: '8px', color: "white", margin: "0px" }}>USER</p>
                  </div>))
              }
            </div>
            <div className='d-flex align-items-center' onClick={goMember}>
              <div className="main-backgroud-color px-2 rounded centered" style={{width:"45px", height:"45px"}}>
                <i className="bi bi-people-fill fs-2 text-white" ></i>
              </div>
            </div>            
          </div>
          <hr />
          {renderRemoteList()}
          {hub.userHubAuth!=='user' && 
          <Card>
            <div className="centered" style={{ width: "100%" }} onClick={addRmt}>
              <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
              <div className="text-secondary">리모컨 추가하기</div>
            </div>
          </Card>
          }

          <div className='centered' style={{ color: "crimson", textDecoration: "underline" }} onClick={hubDelete}>
            { }
            허브 나가기
          </div>   
        </div>   
      }
    </>
  )
}
export default RemotePage
