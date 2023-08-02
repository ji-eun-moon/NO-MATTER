import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.scss'
import InstallAccordion from './InstallAccordion.jsx'

function MoblieLanding() {
  let navigate = useNavigate()
  let [loginButtonVisible, setLoginButtonVisible] = useState(true)
  const loginPageVisible = () => {
    setLoginButtonVisible(false)
    navigate('/login')
  }
  const signupPage = () => {
    navigate('/signup')
  }
  return (
    <div>
      <div className='d-flex justify-content-center p-5'>
        <img src="images/logo2.png" alt="No Matter logo" className='logo-mobile'/>
      </div>
      <div className='d-flex justify-content-end auth-button'>
        {loginButtonVisible && <button className="btn" onClick={loginPageVisible}>로그인</button>}
        {loginButtonVisible && <button className="btn" onClick={signupPage}>회원가입</button>}
      </div>
      <InstallAccordion />
    </div>
  )
}

export default MoblieLanding