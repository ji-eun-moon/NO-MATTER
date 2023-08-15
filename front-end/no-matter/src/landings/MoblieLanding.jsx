import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './MobileLanding.scss'
import InstallAccordion from './InstallAccordion.jsx'
import { Fade } from "react-awesome-reveal";

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

  const automaticLogin = () => {
    const isValidRefresh = !!localStorage.getItem('refreshToken')
    if (isValidRefresh === true) {
      axios.post('https://i9c105.p.ssafy.io/api/v1/user/refreshToken', { refreshToken: localStorage.getItem('refreshToken') })
        .then((response) => {
          sessionStorage.setItem('authToken', response.data[0]);
          localStorage.setItem('refreshToken', response.data[1]);
          navigate('/main')
          return true
        })
        .catch(() => {
          return false
        })
    }
  }

  useEffect(() => {
    automaticLogin()
  }, [])

  return (
    <div>
      <div className='d-flex justify-content-around py-3 container'>
        <div>  
          <img src="/images/logo2.png" alt="No Matter logo" className='logo-mobile'/>
        </div>
        <div className='d-flex justify-content-end auth-button'>
          {loginButtonVisible && <button className="btn" onClick={loginPageVisible}>로그인</button>}
          {loginButtonVisible && <button className="btn" onClick={signupPage}>회원가입</button>}
        </div>
      </div>
      <div className='intro-image'>
        <img src="/images/main.png" alt="main background" style={{width:"100%"}}/>
        <div className='intro-text'>
          <Fade direction="up">
            <h2 className='font-700'>누구나 쉽게,</h2>
            <h2 className='font-700'>스마트 홈의 완성</h2>
          </Fade>
        </div>
      </div>

      <div className='flex-column centered container mt-5'>
        <h4 className='font-700'>수많은 리모컨 대신 스마트폰 하나로!</h4>
        <br />
        <h5>아무리 찾아도 안보이는 리모컨</h5>
        <h5>더 이상 찾지 말고</h5>  
        <br />
        <h6 style={{fontWeight:"500"}}>필요할 때 바로 핸드폰으로 간편하게 조작하세요.</h6>
      </div>

      <div className='container intro-1-mobile'>
        <div className='flex-column centered'>
          <div className='mb-4'>
            <Fade>
              <img src='/images/intro/1.png' style={{height:"250px"}}/>
            </Fade>
          </div>
            <div className='centered'>
              <Fade direction="right">
                <div className='intro-text-mobile'>
                  <div className='mb-3'>
                    <p className='intro-text-mobile-summary'>앱을 통한 원격 제어</p>
                  </div>
                  <h4 className='font-700'>언제 어디서나</h4>
                  <h4 className='font-700'>앱으로 원격 제어</h4>
                  <br />
                  <p className='intro-text-mobile-detail' style={{marginBottom:"3px"}}>깜빡하고 켜고 나온</p>
                  <p className='intro-text-mobile-detail' style={{marginBottom:"3px"}}>전자제품 끄기 위해</p>
                  <p className='intro-text-mobile-detail' style={{marginBottom:"3px"}}>다시 집으로 돌아가지 않아도 돼요.</p>
                </div>
              </Fade>
            </div>
        </div>
      </div>


      <div className='container intro-1-mobile' style={{position:"relative", width:"100%"}}>
        <div className='centered flex-column'>  
          <div className='mb-4'>
            <Fade>
              <img src='/images/intro/2.png' style={{height:"300px"}}/>
            </Fade>
          </div>
          <Fade direction='left'>
            <div className='intro-text-mobile'>
              <div className='mb-3'>
                  <p className='intro-text-mobile-summary'>IR 리모컨 학습 기능</p>
              </div>
              <h4 className='font-700'>오래된 가전을</h4>
              <h4 className='font-700'>최신 가전으로</h4>
              <br />
              <p className='intro-text-mobile-detail'>구형 가전 제품도 앱으로 전원 ON/OFF</p>
              <p className='intro-text-mobile-detail'>직접 학습시켜 사용할 수 있어요.</p>
            </div>
          </Fade>
        </div>
      </div>

      <div className='container d-flex justify-content-around intro-1-mobile'>
        <div className='centered flex-column'>
          <div className='centered'>
            <Fade className='centered'>
              <img src='/images/intro/3-3.png' style={{width:"90%", marginBottom:"30px"}}/>
            </Fade>
          </div>
          <Fade direction='right'>
          <div className='intro-text-mobile'>
            <div className='mb-3'>
              <p className='intro-text-mobile-summary'>음성 인식 기능</p>
            </div>
            <h4 className='font-700'>음성 제어로 더 편리하게</h4>
            <br />
            <p className='intro-text-mobile-detail' style={{marginBottom:"3px"}}>에어컨, 티비 등을</p>
            <p className='intro-text-mobile-detail'>목소리로 제어할 수 있어요.</p>
            <p className='intro-text-mobile-detail' style={{marginBottom:"3px"}}>분주한 일상에 두 손이</p>
            <p className='intro-text-mobile-detail'>자유로워지도록 도와드릴게요.</p>
          </div>
          </Fade>
        </div>
      </div>

      <div className='intro-image'>
        <img src="/images/intro/4.png" alt="main background" style={{width:"100%", height:"300px"}}/>
          <div className='intro-text' style={{width:"100%"}}>
            <Fade direction='up'>
              <h4 className='font-700'>어디에나 자연스럽게</h4>
              <br />
              <h6>360도로 리모컨 신호를 보내</h6>
              <h6>모든 위치에 놓고 사용 가능해요.</h6>
            </Fade>
          </div>
      </div>

      <div className='flex-column centered intro-2-item'>
          <Fade damping={0.5}>
          <img src='/images/phone.png' style={{width:"250px"}}/>
          </Fade>
          <Fade direction='up'>
            <h2>편리함을 공유하기</h2>
            <br />
            <p style={{marginBottom:"3px"}}>가족 또는 장소를 함께 사용하는 분을 초대하여</p>
            <p>함께 앱으로 제어하고 관리할 수 있어요.</p>
          </Fade>
        </div>

        <div className='flex-column centered intro-2-item'>
          <Fade damping={0.5}>
          <img src='/images/phone.png' style={{width:"250px"}}/>
          </Fade>
          <Fade direction='up'>
            <h2>DIY 맞춤 리모컨</h2>
            <br />
            <p>원하는 리모컨 포맷을 사용하여</p>
            <p>리모컨을 직접 학습시켜 사용할 수 있어요.</p>
          </Fade>
        </div>

        <div className='flex-column centered intro-2-item'>
          <Fade damping={0.5}>
            <img src='/images/phone.png' style={{width:"250px"}}/>
          </Fade>
          <Fade direction='up'>
            <h2>나만의 루틴</h2>
            <br />
            <p>필요한 상황과 조건에 맞게</p>
            <p>연동된 제품을 제어할 수 있어요.</p>
          </Fade>
        </div>

        <div className='centered mt-5'>  
          <img src="/images/logo2.png" alt="No Matter logo" style={{width:"250px"}}/>
        </div>

      <div className='container'>
        <InstallAccordion />
      </div>
    </div>
  )
}

export default MoblieLanding