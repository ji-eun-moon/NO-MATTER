import React from 'react'
import './Landing.scss'
import Fade from 'react-reveal/Fade';

import InstallAccordion from './InstallAccordion.jsx'

function PCLanding() {

  return (       
    <div>

      <div className='header'>
        <img src="images/logo2.png" alt="No Matter logo" className='logo'/>
        <p className='header-text'>본 서비스는 모바일 환경에서만 이용 가능합니다.</p>
      </div>

      <div className='main-image'>
        <img src="images/main.png" alt="main background" style={{width:"100%"}}/>
        <div className='main-text'>
          <Fade top>
            <h1>누구나 쉽게,</h1>
            <h1>스마트홈의 완성</h1>
          </Fade>
        </div>
      </div>

      <div className='flex-column centered' style={{ height:"500px"}}>
        <h1 className='font-700'>수많은 리모컨 대신 스마트폰 하나로!</h1>
        <br />
        <h3>아무리 찾아도 안보이는 리모컨</h3>
        <h3>더 이상 찾지 말고</h3>  
        <br />
        <h2 style={{fontWeight:"500"}}>필요할 때 바로 핸드폰으로 간편하게 조작하세요.</h2>
      </div>

      <div className='d-flex justify-content-around container intro-1'>
        <Fade left>
          <img src='images/phone.png' style={{height:"500px"}}/>
        </Fade>
        <Fade right>
          <div className='intro-1'>
            <h1>언제 어디서나 앱으로 원격 제어</h1>
            <br />
            <p>깜빡하고 켜고 나온 전자제품 끄기 위해</p>
            <p>다시 집으로 돌아가지 않아도 돼요.</p>
          </div>
        </Fade>
      </div>

      <div>
        <p>오래된 가전을 최신 가전으로</p>
        <p>구형 가전 제품도 앱으로 전원 ON/OFF</p>
        <p>직접 학습시켜 사용할 수 있어요.</p>
      </div>

      <div>
        <p>음성 제어로 더 편리하게</p>
        <p>에어컨, 티비 등을 목소리로 제어할 수 있어요.</p>
        <p>분주한 일상에 두 손이 자유로워지도록 도와드릴게요.</p>
      </div>

      <div>
        <p>어디에나 자연스럽게</p>
        <p>360도로 리모컨 신호를 보내</p>
        <p>모든 위치에 놓고 사용 가능해요.</p>
      </div>

      <div>
        <p>편리함을 공유하기</p>
        <p>가족 또는 장소를 함께 사용하는 분을 초대하여</p>
        <p>함께 앱으로 제어하고 관리할 수 있어요.</p>
      </div>

      <div>
        <p>삶이 편해지는 나만의 루틴</p>
        <p>필요한 상황과 조건에 맞게</p>
        <p>연동된 제품을 제어할 수 있어요.</p>
      </div>

      <div className='container'>
        <InstallAccordion />
      </div>

    </div>

  );
}

export default PCLanding