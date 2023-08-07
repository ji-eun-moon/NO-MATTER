import React from 'react'
import GoBack from '../../components/GoBack.jsx'

function WeatherPage() {
  return (
    <div className='container page-container'>
        <div className='d-flex mt-5 mb-3'>
        <GoBack />
        <h1 className="font-700">날씨 등록</h1>
      </div>
    </div>
  )
}

export default WeatherPage