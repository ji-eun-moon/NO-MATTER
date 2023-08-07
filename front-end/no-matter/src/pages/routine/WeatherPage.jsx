import React from 'react'
import GoBack from '../../components/GoBack.jsx'
import Card from '../../components/Card.jsx';
import { useNavigate } from 'react-router-dom'

function WeatherPage() {
  const navigate = useNavigate();
  const items = [
    {
      label: '기온',
      path:'/routine/weather/temp'
    },
    {
      label: '습도',
      path:'/routine/weather/humid'
    },
    {
      label: '날씨',
      path:'/routine/weather/weather'
    },
  ];

  return (
    <div className='container page-container'>
        <div className='d-flex mt-5 mb-3'>
          <GoBack />
          <h1 className="font-700">날씨 등록</h1>
        </div>

        {items.map(item => {
        return (
          <Card key={item.label}>
              <div className='d-flex align-items-center justify-content-between' 
                    onClick={() => navigate(item.path)}
                    style={{width:"100%"}}>
                <div className='card-text'>
                  {item.label}
                </div>
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </div>
          </Card>
        )
      })}

    </div>
  )
}

export default WeatherPage