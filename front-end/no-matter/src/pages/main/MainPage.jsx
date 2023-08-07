import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Card from '../../components/Card.jsx';

function MainPage() {
  // const hublist = ['1번']
  const hublist = ['1번', '2번', '3번']
  const rmtlist1 = ['11번', '21번', '31번', '31번', '31번', '31번', '31번']

  return (
    <div className='container page-container'>
      <div className='d-flex justify-content-center p-5'>
        <img src="images/logo2.png" alt="No Matter logo" style={{width:"300px"}}/>
      </div>
      <div className="card mb-3" style={{backgroundColor:'#FFFAF0'}}>
        <div className="card-body d-flex">
          <div className="card-text" style={{marginBottom:'15px', marginTop:'15px', marginLeft:'10px'}}>
            <h1 className="font-700" style={{marginBottom:'20px'}}>안녕하세요</h1>
            <h1 className="font-700">한석현 님</h1>
          </div>
        </div>
      </div>
      <h1 className="font-700" style={{marginTop:"60px", marginLeft:"12px"}}>연결된 리모컨</h1>
      
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
      >
        {
          hublist.map((hub)=>{
            return (
              <SwiperSlide>
                <div className="card mb-3" style={{backgroundColor:'white'}}>
                  <div className="card-text" style={{paddingLeft:'15px', paddingTop:'15px'}}>{hub}</div>
                  <div className="card-body d-flex justify-content-start row">
                    {
                      rmtlist1.map((rmt)=>{
                        return (
                          <div className="col-6">
                            <Card>
                              {rmt}
                            </Card>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>

    </div>
  )
}

export default MainPage