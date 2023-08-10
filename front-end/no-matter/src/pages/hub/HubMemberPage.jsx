import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axiosInstance from '../../config/axios'

import Card from '../../components/Card.jsx';
import SwipeCard from '../../components/SwipeCard.jsx';
import GoBack from '../../components/GoBack.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CopyToClipboard from 'react-copy-to-clipboard';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; // 멤버 아이콘
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function HubMemberPage() {
  const { id } = useParams()  // 허브 id
  const [ hub, setHub ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ open, setOpen ] = React.useState(false);
  const [ codeStatus, setCodeStatus ] = useState(false)
  const [ inviteCode, setInviteCode ] = useState(null);
  const [ date, setDate ] = useState(null);
  const [ checkStatus, setCheckStatus ] = useState(false)

  const handleOpen = (e) => {
    console.log('click')
    setOpen(true);
    e.stopPropagation();
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    setCodeStatus(false)
  };

  const click = () => {
    console.log('click')
  }
  const onCheck = () => {
    setCheckStatus(!checkStatus)
  }
  // 특정 허브 정보 저장
  const hubInfo = (id) => {
    axiosInstance({
      method : 'Get',
      url : '/userhub/list',
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
    })
    .then((response) => {
      const specificHub = response.data.find(hub => hub.hubId === parseInt(id));
      setHub(specificHub);
    });
  }

  const getUser = (id) => {   
    // json-server 테스트용
    // axios.get(`http://localhost:3001/hubs/${id}`)
    // .then((response) => {
    //   setHub(response.data)  // 허브 정보
    //   setRemotes(response.data.remotes) // 유저 리스트
    // })

    axiosInstance({
      method : 'Get',
      url : `/hub/members/${id}`,
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
    })
    .then((response) => {
      console.log(response.data)
      console.log(response.data[0][0])
      console.log(response.data[0][1])
      console.log(response.data[0][2])
      setUsers(response.data) // 유저 리스트
      console.log('users', users)
      setLoading(false);
    })

  }

  useEffect(() => {
    hubInfo(id)
    getUser(id)
  }, [id])

  const getCode = (event) => {
    console.log(id)
    const hubId = id
    event.preventDefault()
    axiosInstance({
        method : 'Get',
        url : `/hub/inviteCode/${hubId}`,
        headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
    })
    .then((response) => {
        console.log('초대 코드 생성 성공', response.data)
        const res = response.data.split(' ')
        const code = res[0]
        const date = res[1].substring(0, 16).replace('T', ' ')
        setInviteCode(code)
        setDate(date)
        setCodeStatus(true)
    })
    .catch((err) => {
        console.log('초대 코드 생성 실패', err)
        setCodeStatus(false)
      })        
  }

  const clickDelete = (e) => {
    e.stopPropagation();
    console.log('click Delete')
  }

  const clickModify = (e) => {
    e.stopPropagation();
    console.log('click Modify')
  }

  const renderUserList = () => {
    if (loading) {
      return (
        <LoadingSpinner/>
      )
    }

    if (users.length === 0) {
      return (
        <div className='centered m-5'>
          아직 등록된 유저가 없습니다.
        </div>
      )}

    return users.map((user, index) => {
      return (
        <div key={index} className='card mb-3' style={{height:'80px', padding:'0', border:'0px', overflow: 'hidden'}}>
          {/* <div className='card-body' style={{position:'relative', padding:'0', width:"100%", zIndex:"1"}}> */}
            <SwipeCard>
              <div className='d-flex align-items-center justify-content-between' 
                style={{width:"100%"}}>
                <div className='centered' >
                  <AccountCircleOutlinedIcon fontSize='large' style={{marginRight:'10px'}}/>
                  <div className='card-text' style={{marginBottom:'0'}}>{user[1]}</div>
                </div>
                <div>
                  <div className='card-text' style={{marginBottom:'0'}}>{user[2]}</div>
                </div>
              </div>
            </SwipeCard>
        {/* </div> */}
          <div className='card-body mb-3 d-flex justify-content-between' style={{position:'absolute', padding:'0', width:'100%'}}>
            {/* 멤버 설정 */}
            <div className="card mb-3 bg-primary" style={{height:'79px', width:'79px', marginLeft: '1px'}} onClick={clickModify}>
              <div className="card-body centered">
                <SyncAltOutlinedIcon fontSize='large' style={{color:'white'}} />
              </div>
            </div>
            {/* 멤버 삭제 */}
            <div className="card mb-3 bg-danger" style={{height:'79px', width:'79px', marginRight:'1px'}} onClick={clickDelete}>
              <div className="card-body centered">
                <RemoveCircleOutlineOutlinedIcon fontSize='large' style={{color:'white'}} />
              </div>
            </div>
          </div>
          </div>
      )
    })
  }

  
  return (
    <div className="container page-container">
      <div className='d-flex justify-content-between mt-5'>
        <div className='d-flex'>
          <GoBack />
          <h1 className="font-700">Member</h1>
        </div>
      </div>
      <hr />
      {renderUserList()}

      <ToastContainer />
      <Card>
        <div className="centered" style={{width:"100%"}} onClick={handleOpen}>
          <div><i className="bi bi-plus-circle-fill fs-1 me-2 text-secondary"></i></div>
          <div className="text-secondary">초대하기</div>
        </div>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={{ ...style, width: 300, position:"relative" }} style={{borderRadius:"15px"}}>
          <div>
            <i className="bi bi-x-lg" onClick={handleClose} style={{ position: 'absolute', top: 20, right: 20 }}></i>
            <h4 className='font-700 text-center'>초대코드</h4>
            <br />
            {!codeStatus?
                <div className='centered'>
                  <Button variant="contained" size="large" onClick={getCode}>초대 코드 생성하기</Button>
                </div>
                : <CopyToClipboard
                    text={inviteCode}
                    // onCopy={() => toast.success(`초대 링크가 복사되었습니다.`, {autoClose: 3000})}
                  >
                    <div className='flex-column centered'>
                      <p style={{padding:'10px 0px 0px 0px'}}>{inviteCode}</p>
                      <div className='flex-column centered' 
                        onClick={() => toast.success(`초대 링크가 복사되었습니다.`, { autoClose: 3000 })}>
                        <Button variant="contained" size="large" style={{ margin:'10px'}} 
                       >복사</Button>
                        <p style={{padding:'10px 0px 0px 0px', fontSize:'15px'}}>※ 위 코드는 {date}까지만 사용 가능합니다</p>
                      </div>
                    </div>
                  </CopyToClipboard>
            }
          </div>
        </Box>
      </Modal>

    </div> 
  )
}

export default HubMemberPage