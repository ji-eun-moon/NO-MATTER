import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axiosInstance from '../../config/axios'
import Card from '../../components/Card.jsx';
import GoBack from '../../components/GoBack.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import SwipeCard from '../../components/SwipeCard.jsx';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

function RemotePage() {
  const { id } = useParams()  // 허브 id
  const [hub, setHub] = useState([]);
  const [remotes, setRemotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  // 특정 허브 정보 저장
  const hubInfo = (id) => {
    axiosInstance({
      method: 'Get',
      url: '/userhub/list',
      headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
    })
      .then((response) => {
        const specificHub = response.data.find(hub => hub.hubId === parseInt(id));
        setHub(specificHub);
        setUserId(specificHub.usersHubsId)
      });
  }
  console.log(hub)

  const getRemote = (id) => { 
    axiosInstance({
      method: 'Get',
      url: `/remote/list/${id}`,
      headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
    })
    .then((response) => {
      setRemotes(response.data) // 리모컨 리스트
      setLoading(false);
    })

  }


  useEffect(() => {
    hubInfo(id)
    getRemote(id)
  }, [id])

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
        <div key={remote.remoteId}  className='card mb-3' style={{height:'80px', padding:'0', border:'0px', overflow: 'hidden'}}>
          <SwipeCard>
            <div className='d-flex align-items-center row'
                style={{width:"100%"}}>
              <div className='card-text col-11' 
              onClick={() => navigate('/hubs/rmtdetail', {state: [remote.remoteType, false]})}>{remote.controllerName}</div>
            </div>
          </SwipeCard>
          <div className='card-body mb-3 d-flex justify-content-between' style={{position:'absolute', padding:'0', width:'100%'}}>
            {/* 리모컨 수정 */}
            <div className="card mb-3 bg-primary" style={{height:'79px', width:'79px', marginLeft: '1px'}}>
              <div className="card-body centered">
                <SettingsOutlinedIcon fontSize='large' style={{color:'white'}} onClick={() => navigate('/hubs/rmtdetail', {state: [remote.remoteType, true, remote.controllerName, id]})} />
              </div>
            </div>
            {/* 리모컨 삭제 */}
            <div className="card mb-3 bg-danger" style={{height:'79px', width:'79px', marginRight:'1px'}}>
              <div className="card-body centered">
                <RemoveCircleOutlineOutlinedIcon fontSize='large' style={{color:'white'}} />
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  const goMember = () => {
    // if(hub.userHubAuth === 'admin'){
      navigate(`/hubs/${id}/member`, { state: userId })
    // }
    // else{
    //   alert('권한이 없습니다')
    // }
  }
  
  const hubDelete = () => {
    if (hub && hub.userHubAuth === 'admin' && hub.length === 1) {
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
              url: `http://localhost:5000/api/v1/userhub/deleteUserHub/${id}`,
              headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
            })
              .then((response) => {
                console.log(response.data)
                navigate('/hubs')
              })
          }
        });

    }
    else if (hub && hub.userHubAuth === 'admin' && hub.length > 1) {
      swal({
        title: "master 이외에 사용자가 있어 삭제할 수 없습니다",
        text: "삭제하시면 다시 되돌릴 수 없습니다",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axiosInstance({
              method: 'Post',
              url: `http://localhost:8080/api/v1/userhub/deleteUserHub/${id}`,
              headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
            })
              .then((response) => {
                console.log(response.data)
                navigate('/hubs')
              })
          }
        });

    }
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
              url: `http://localhost:5000/api/v1/userhub/deleteUserHub/${id}`,
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
  return (
    <div className="container page-container">
      <div className='d-flex justify-content-between mt-5'>
        <div className='d-flex'>
          <GoBack />
          <h1 className="font-700">{hub.userHubName}</h1>
          {hub.userHubAuth === 'admin' ?
            <div className='d-flex flex-column justify-content-center align-items-center ms-2'
              style={{ backgroundColor: "#fdd969", borderRadius: "10px", padding: "5px 10px 5px" }}>
              <img src="/images/crown.png" alt="crown" style={{ width: "16px", height: "25px" }} />
              <p style={{ fontWeight: 'bold', fontSize: '7px', color: "white", margin: "0px" }}>ADMIN</p>
              {/* <h5 style={{color:"#FCFCFC", fontWeight:"600"}}>master</h5> */}
            </div>
            : hub.userHubAuth === 'manager' ?
              <div className='d-flex flex-column justify-content-center align-items-center ms-2'
                style={{ backgroundColor: "#11c942", borderRadius: "10px", padding: "5px 10px 5px" }}>
                <img src="/images/crown.png" alt="crown" style={{ width: "16px", height: "25px" }} />
                <p style={{ fontWeight: 'bold', fontSize: '6px', color: "white", margin: "0px" }}>MANAGER</p>
                {/* <h5 style={{color:"#FCFCFC", fontWeight:"600"}}>master</h5> */}
              </div>
              :
              <div className='d-flex flex-column justify-content-center align-items-center ms-2'
                style={{ backgroundColor: "#b6b6b6", borderRadius: "10px", padding: "5px 10px 5px" }}>
                <img src="/images/crown.png" alt="crown" style={{ width: "16px", height: "25px" }} />
                <p style={{ fontWeight: 'bold', fontSize: '8px', color: "white", margin: "0px" }}>USER</p>
                {/* <h5 style={{color:"#FCFCFC", fontWeight:"600"}}>master</h5> */}
              </div>
          }
        </div>
        {/* <div className='d-flex' onClick={goMember}>
          <div className="main-backgroud-color px-2 rounded centered">
            <i className="bi bi-people-fill fs-2 text-white"></i>
          </div>
        </div> */}
        { hub.userHubAuth === 'admin' && 
          <div className='d-flex' onClick={goMember}>
            <div className="main-backgroud-color px-2 rounded centered">
              <i className="bi bi-people-fill fs-2 text-white"></i>
            </div>
          </div>
        }
      </div>
      <hr />
      {renderRemoteList()}
      <Card>
        <div className="centered" style={{ width: "100%" }} onClick={() => navigate('/hubs/addrmt', { state: [hub, id] })}>
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
          <div className="text-secondary">리모컨 추가하기</div>
        </div>
      </Card>

      <div className='centered' style={{ color: "crimson", textDecoration: "underline" }} onClick={hubDelete}>
        { }
        허브 나가기
      </div>
    </div>
  )
}

export default RemotePage
