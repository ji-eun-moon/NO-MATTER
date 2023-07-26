import React from 'react'


function ServiceWarning() {
  return (
    <div className='container'>
        <img src="images/logo.png" alt="No Matter logo"/>
        <h1><i class="bi bi-exclamation-triangle-fill me-3" style={{ color: 'red' }}></i>모바일에서만 이용 가능한 서비스입니다.</h1>
    </div>
  )
}

export default ServiceWarning