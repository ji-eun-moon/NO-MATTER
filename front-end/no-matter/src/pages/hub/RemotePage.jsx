import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../../components/Card.jsx';
import GoBack from '../../components/GoBack.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

function RemotePage() {
  const { id } = useParams()  // 허브 id
  const [ hub, setHub ] = useState([]);
  const [ remotes, setRemotes ] = useState([]);
  const token = sessionStorage.getItem('authToken')
  const [loading, setLoading] = useState(true);

  // 특정 허브 정보 저장
  const hubInfo = (id) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:8080/api/v1/userhub/list')
      .then((response) => {
        const specificHub = response.data.find(hub => hub.hubId === parseInt(id));
        setHub(specificHub);
      });
  }

  const getRemote = (id) => {
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // json-server 테스트용
    // axios.get(`http://localhost:3001/hubs/${id}`)
    // .then((response) => {
    //   setHub(response.data)  // 허브 정보
    //   setRemotes(response.data.remotes) // 리모컨 리스트
    // })

    axios.get(`http://localhost:8080/api/v1/remote/list/${id}`)
    .then((response) => {
      // console.log(response.data)
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
        <LoadingSpinner/>
      )
    }

    if (remotes.length === 0) {
      return (
        <div className='centered m-5'>
          아직 등록된 리모컨이 없습니다.
        </div>
      )}
    
    return remotes.map(remote => {
      return (
        <Card key={remote.remoteId}>
          <div className='d-flex align-items-center justify-content-between'
               style={{width:"100%"}}>
            <div className='card-text'>{remote.controllerName}</div>
            <div><i className="bi bi-chevron-right"></i></div>
          </div>
        </Card>
      )
    })
  }

  return (
    <div className="container page-container">
      <div className='d-flex justify-content-between mt-5'>
        <div className='d-flex'>
          <GoBack />
          <h1 className="font-700">{hub.userHubName}</h1>
        </div>
        <div className='d-flex justify-content-center align-items-center' 
              style={{backgroundColor:"#fdd969", borderRadius:"15px", padding:"5px 10px 5px"}}>
          <img src="/images/crown.png" alt="crown" style={{width: "27px", height:"35px"}} className='me-2'/>
          <h5 style={{color:"#FCFCFC", fontWeight:"600"}}>master</h5>
        </div>
      </div>
      <hr />
      {renderRemoteList()}
      <Card>
        <div className="centered" style={{width:"100%"}}>
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
          <div className="text-secondary">리모컨 추가하기</div>
        </div>
      </Card>

      <div className='centered' style={{color:"crimson", textDecoration:"underline"}}>
        허브 나가기
      </div>
    </div> 
  )
}

export default RemotePage