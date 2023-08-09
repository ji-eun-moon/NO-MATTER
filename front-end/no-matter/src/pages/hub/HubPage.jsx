import React from 'react'
import axiosInstance from '../../config/axios'
import { useState, useEffect } from 'react'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

function HubPage() {
  const navigate = useNavigate();
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="page-container container">
      <div className='d-flex justify-content-between mt-5'>
        <h1 className="font-700">My Hub</h1>
        <div className="main-backgroud-color px-2 rounded">
          <i className="bi bi-people-fill fs-2 text-white"></i>
        </div>
      </div>
      <hr />
      {renderHubList()}
      <Card>
        <div className="centered" style={{width:"100%"}}
            onClick={() => navigate('/hubs/addhub')}>
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
          <div className="text-secondary" >허브 추가하기</div>
        </div>
      </Card>
    </div>
  )
}

export default HubPage