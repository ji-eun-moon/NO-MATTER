import React from 'react'
import Bluetooth from './Bluetooth';

function AddHub_Bluetooth() {

  return (
    <div>
      <span style={{marginLeft:"10px"}}>스마트폰의 블루투스 기능을 키고 </span>
      <br /><span style={{marginLeft:"10px"}}>허브의 전원을 켜서 기기를 연결하세요</span>
      <br />
      <div className='d-flex justify-content-center align-content-center justify-items-between' style={{marginTop:"20px", marginLeft:"20px"}}>
        <div style={{margin:"15px"}}><i className="bi bi-disc-fill" style={{fontSize:'80px'}}></i></div>
        
        <div className='d-flex flex-column' style={{margin:"18px"}}>
          <img src="/images/bluetooth.png" alt="bluetooth" style={{width:'20px', height:'20px', marginLeft:'20px'}}/>
          <img src="/images/connect.gif" alt="connect gif" style={{width:"60px"}} ></img>
        </div>

        <div style={{margin:"15px 15px 15px 5px"}}><i className="bi bi-phone" style={{fontSize:'90px'}}></i></div>
      </div>
      <Bluetooth />
    </div>
  )
}

export default AddHub_Bluetooth