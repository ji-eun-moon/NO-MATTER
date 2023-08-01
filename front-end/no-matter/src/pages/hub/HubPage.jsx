import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'

function HubPage() {
  const navigate = useNavigate();
  const [hubs, setHubs] = useState([]);

  const getHubs = () => {
    axios.get('http://localhost:3001/hubs')
    .then((response) => {
      setHubs(response.data)
    })
  }

  useEffect(() => {
    getHubs()
  }, [])

  return (
    <div className="container">
      <div className='d-flex justify-content-between mt-5'>
        <h1 className="font-700">My Hub</h1>
        <div className="main-backgroud-color px-2 rounded">
          <i className="bi bi-people-fill fs-2 text-white"></i>
        </div>
      </div>
      <hr />
      {hubs.map(hub => {
        return (
          <Card key={hub.id}>
            <div className='d-flex justify-content-between'>
              <div>{hub.title}</div>
              <div onClick={() => navigate(`/hubs/${hub.id}`)}>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </Card>
        )
      })}
      <Card>
        <div className="centered">
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
          <div className="text-secondary">허브 추가하기</div>
        </div>
      </Card>
    </div>
  )
}

export default HubPage