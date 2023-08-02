import React from 'react'
import NavData from '../../data/NavData';


function AddHub_Bluetooth() {

  return (
    <div>
      <span>스마트폰의 블루투스 기능을 키고 허브의 전원을 켜서 기기를 연결하세요</span>
      <br />
      <div className='d-flex justify-content-center align-content-center' style={{marginTop:"30px", marginLeft:"20px"}}>
        <p style={{margin:"15px"}}><i className="bi bi-disc-fill" style={{fontSize:'80px'}}></i></p>

        <p style={{margin:"15px"}}><img src="images/bluetooth.png" alt="bluetooth" style={{width:'20px', height:'20px', marginLeft:"30px"}}/></p>
        <p ><img src="images/connect.gif" alt="connect gif" style={{width:"70px", marginTop:"40px"}} ></img></p>

        <p style={{margin:"15px"}}><i class="bi bi-phone" style={{fontSize:'80px'}}></i></p>
      </div>
    </div>
  )
}

export default AddHub_Bluetooth