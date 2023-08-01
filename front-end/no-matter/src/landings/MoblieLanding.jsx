import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      {loginButtonVisible && <button onClick={loginPageVisible}>로그인</button>}
      {loginButtonVisible && <button onClick={signupPage}>회원가입</button>}
    </div>
  )
}

export default MoblieLanding