import React, { useState } from 'react'
import Card from '../../components/Card.jsx';
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

function SettingPage() {
  const navigate = useNavigate()

  const [dark, setDark] = useState(false)

  const onDark= (value) => {
    setDark(value)
  }
  const logout = () => {
    // navigate('/')
    sessionStorage.clear()
  }
  return (
    <div className="page-container container">
      <div className='d-flex justify-content-between mt-5 mb-3'>
        <h1 className="font-700">My Setting</h1>
      </div>

      <Card>
        <div className='d-flex align-items-center justify-content-between' style={{width:"100%"}}>
          <div style={{fontSize:"18px", fontWeight:"bold"}}>
              회원 정보 수정
          </div>
          <div>
            <i className="bi bi-chevron-right" onClick={() => navigate('/setting/useredit')}></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className='d-flex align-items-center justify-content-between' style={{width:"100%"}}>
          <div style={{fontSize:"18px", fontWeight:"bold"}}>
            알림 센터
          </div>
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className='d-flex align-items-center justify-content-between' style={{width:"100%"}}>
          <div style={{fontSize:"18px", fontWeight:"bold"}}>
            고객 지원
          </div>
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card>
      <Card>
        <div className='d-flex align-items-center justify-content-between' style={{width:"100%"}}>
          <div style={{fontSize:"18px", fontWeight:"bold"}}>
            다크 모드
          </div>
          <div class="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={dark} onChange={() => onDark(!dark)}/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              {dark ? 'ON' : 'OFF'}
            </label>
          </div>          
        </div>
      </Card>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={logout}
        style={{ backgroundColor: '#CC0000', color: 'white' }}
        className="button"
        >
          <LogoutIcon/>
        로그아웃
      </Button>
    </div>
  )
}

export default SettingPage