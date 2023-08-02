import React from 'react'
import Card from '../../components/Card.jsx';

function SettingPage() {
  return (
    <div>
      <div className='d-flex justify-content-between mt-5'>
        <h1 className="font-700">설정</h1>
          <div className="main-backgroud-color px-2 rounded">
          <i className="bi bi-people-fill fs-2 text-white"></i>
        </div>
      </div>
      <Card>회원 정보 수정</Card>
      <Card>알림 센터</Card>
      <Card>고객 지원</Card>
      <Card>다크 모드</Card>
    </div>
  )
}

export default SettingPage