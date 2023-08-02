import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../../components/Card.jsx';
import GoBack from '../../components/GoBack.jsx'

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
    <div className="container page-container">
      <div className='d-flex justify-content-between mt-5'>
        <div className='d-flex'>
          <GoBack />
          <h1 className="font-700">{hub.title}</h1>
        </div>
        <div className='d-flex justify-content-center align-items-center' 
              style={{backgroundColor:"#fdd969", borderRadius:"15px", padding:"5px 10px 5px"}}>
          <img src="/images/crown.png" alt="crown" style={{width: "27px", height:"35px"}} className='me-2'/>
          <h5 style={{color:"#FCFCFC", fontWeight:"600"}}>master</h5>
        </div>
      </div>
      <hr />
      {remotes.map(remote => {
        return (
          <Card key={remote.id}>
            <div className='d-flex align-items-center justify-content-between'
                 style={{width:"100%"}}>
              <div className='card-text'>{remote.title}</div>
              <div><i className="bi bi-chevron-right"></i></div>
            </div>
          </Card>
        )
      })}
      <Card>
        <div className="centered" style={{width:"100%"}}>
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
          <div className="text-secondary">리모컨 추가하기</div>
        </div>
      </Card>
      <div className='centered' style={{color:"crimson", textDecoration:"underline"}}>허브 나가기</div>
    </div> 
  )
}

export default RemotePage