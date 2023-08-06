import React from 'react'

import Card from '../../components/Card.jsx';
import SwipeCard from '../../components/SwipeCard.jsx';
import GoBack from '../../components/GoBack.jsx'

import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'; // 멤버 추가
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'; // 멤버 아이콘
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

function RemotePage() {

  return (
    <div className="container page-container">

      <div className='d-flex justify-content-between mt-5'>
        <div className='d-flex'>
          <GoBack />
          <h1 className="font-700">Member</h1>
        </div>
      </div>
      <hr />
      
      {/* 스와이프 */}
      <div className='card mb-3' style={{height:'90px', padding:'0', border:'0px'}}>
        <div className='card-body' style={{position:'relative', zIndex:'1', padding:'0'}}>
          <SwipeCard>
            <div className='d-flex align-items-center justify-content-between' 
              style={{width:"100%"}}>
              <div className='centered'>
                <PermIdentityOutlinedIcon fontSize='large' style={{marginRight:'10px'}}/>
                <h3 className='font-700' style={{marginBottom:'0'}}>한석현</h3>
              </div>
              <div>
                <h5 style={{marginBottom:'0'}}>master</h5>
              </div>
            </div>
          </SwipeCard>
        </div>

        <div className='card-body mb-3 d-flex justify-content-between' style={{position:'absolute', padding:'0', width:'100%'}}>
          {/* 멤버 설정 */}
          <div className="card mb-3 bg-primary" style={{height:'79px', width:'79px'}}>
            <div className="card-body centered">
              <SyncAltOutlinedIcon fontSize='large' style={{color:'white'}} />
            </div>
          </div>
          {/* 멤버 삭제 */}
          <div className="card mb-3 bg-danger" style={{height:'79px', width:'79px', marginRight:'1px'}}>
            <div className="card-body centered">
              <RemoveCircleOutlineOutlinedIcon fontSize='large' style={{color:'white'}} />
            </div>
          </div>

        </div>

      </div>
      {/* 스와이프 끝 */}

      <Card>
        <div className="centered" style={{width:"100%"}}>
          <div><PersonAddAltOutlinedIcon fontSize='large'/></div>
          <h3 className="font-700" style={{marginBottom:'0', marginLeft:'15px'}}>초대하기</h3>
        </div>
      </Card>
    </div> 
  )
}

export default RemotePage