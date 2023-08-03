import React from 'react'
import Card from '../../components/Card.jsx';
import {useNavigate} from 'react-router-dom'

function AddRemote() {
  const navigate = useNavigate()

  return (
    <div className="container">
      
      <Card>
        <div className="centered" onClick={() => {navigate('/hubs/rmttv/1')}}>
          <div className="text-secondary">TV</div>
        </div>
      </Card>
      <Card>
        <div className="centered">
          <div className="text-secondary">에어컨</div>
        </div>
      </Card>
      <Card>
        <div className="centered">
          <div className="text-secondary" onClick={() => {navigate('/hubs/rmtcustom/1')}}>커스텀 리모컨</div>
        </div>
      </Card>
    </div>
  )
}

export default AddRemote