import React from 'react'
import Card from '../../components/Card.jsx';
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

function SettingPage() {
  const navigate = useNavigate()
  const logout = () => {
    navigate('/')
    sessionStorage.clear()
  }
  return (
    <div>
      <div className='d-flex justify-content-between mt-5'>
        <h1 className="font-700">설정</h1>
      </div>
      <Card>
        <div onClick={() => navigate('/setting/useredit')}>
            회원 정보 수정
        </div>
      </Card>
      <Card>알림 센터</Card>
      <Card>고객 지원</Card>
      <Card>다크 모드</Card>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={logout}
        color="primary"
        className="button"
        >
        로그아웃
      </Button>
    </div>
  )
}

export default SettingPage