import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../../components/Card.jsx';

function RemotePage() {
  const { id } = useParams()
  const [ hub, setHub ] = useState([]);
  const [ remotes, setRemotes ] = useState([]);

  const getRemote = (id) => {
    axios.get(`http://localhost:3001/hubs/${id}`)
    .then((response) => {
      setHub(response.data)  // 허브 정보
      setRemotes(response.data.remotes) // 리모컨 리스트
    })
  }

  useEffect(() => {
    getRemote(id)
  }, [])

  return (
    <div className="container">
      <div className='d-flex justify-content-between mt-5'>
        <h1 className="font-700">{hub.title}</h1>
      </div>
      <hr />
      {remotes.map(remote => {
        return (
          <Card key={remote.id}>
            <div className='d-flex justify-content-between'>
              <div>{remote.title}</div>
              <div><i className="bi bi-chevron-right"></i></div>
            </div>
          </Card>
        )
      })}
      <Card>
        <div className="centered">
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
          <div className="text-secondary">리모컨 추가하기</div>
        </div>
      </Card>
    </div>
  )
}

export default RemotePage