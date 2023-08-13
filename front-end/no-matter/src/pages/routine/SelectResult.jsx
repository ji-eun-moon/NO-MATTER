import React from 'react'
import './Routine.scss'
import { useState, useEffect  } from 'react'
import axiosInstance from '../../config/axios'
import Card from '../../components/Card.jsx';

function SelectResult({setShowModal, handleSelection}) {

  const [hubs, setHubs] = useState([]);  // 허브 리스트
  const [remotes, setRemotes] = useState([]);  // 리모컨 리스트
  const [selectedHub, setSelectedHub] = useState(null); // 선택한 허브
  const [selectedRemote, setSelectedRemote] = useState(null);  // 선택한 리모컨
  const [selectedRemoteAction, setSelectedRemoteAction] = useState('ON');  // 선택한 리모컨 동작 - 임시로 ON 넣어놨음

  const getHubs = () => {

    axiosInstance({
      method : 'Get',
      url : '/userhub/list',
    })
    .then((response) => {  
      setHubs(response.data)
    })
  }

  const getRemote = (id) => {

    axiosInstance({
      method : 'Get',
      url : `/remote/list/${id}`,
    })
    .then((response) => {
      // console.log(response.data)
      setRemotes(response.data) // 리모컨 리스트
    })

  }

  useEffect(() => {
    getHubs()
  }, [])

  const closeModal = () => {
      setShowModal(false);
  };

  const selectHub = (id) => {
    const selectedHub = hubs.find((hub) => hub.hubId === id);
    // console.log(selectedHub);
    setSelectedHub(selectedHub); // 허브 선택
    getRemote(id)
    // console.log(remotes)
  }

  const selectRemote = (id) => {
    const selectedRemote = remotes.find((remote) => remote.remoteId === id)
    // console.log(selectedRemote)
    setSelectedRemote(selectedRemote) // 리모컨 선택
  }
  
  const goBackToHubSelection = () => {
    setSelectedHub(null);
  };

  const goBackToRemoteSelection = () => {
    setSelectedRemote(null);
  };

  const handleSelectionComplete = () => {
    // 선택한 정보를 부모 컴포넌트로 전달하고 모달창 닫기
    handleSelection(selectedHub, selectedRemote, selectedRemoteAction);
    closeModal()
  };

  const renderHubList = () => {

    if (hubs.length === 0) {
      return (
        <div className='centered m-5'>
          등록된 허브가 없습니다.
        </div>
      )}
    
    return hubs.map(hub => {
      return (
        <Card key={hub.hubId}>
            <div className='d-flex align-items-center justify-content-between'
                  onClick={() => selectHub(hub.hubId)}
                  style={{width:"100%"}}>
              <div className='card-text'>
                {hub.userHubName} 
              </div>
              <div>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
        </Card>
      )
    })
  }

  const renderRemoteList = () => {
    if (remotes.length === 0) {
      return (
        <div className='centered m-5'>
          등록된 리모컨이 없습니다.
        </div>
      )}
    
    return remotes.map(remote => {
      return (
        <Card key={remote.remoteId}>
          <div className='d-flex align-items-center justify-content-between'
              onClick={() => selectRemote(remote.remoteId)}
              style={{width:"100%"}}>
            <div className='card-text'>{remote.controllerName}</div>
            <div><i className="bi bi-chevron-right"></i></div>
          </div>
        </Card>
      )
    })
  }



  return (
    <div className='modal-container container page-container centered'>

        {/* 허브 선택 */}
        { selectedHub ? null : <div className='select-hub'>
          <div className='d-flex align-items-center mb-3'>
            <div onClick={closeModal}>
              <i className="bi bi-chevron-left fs-2 me-3"></i>
            </div>
            <h5 style={{marginBottom:"0px"}} className='font-700'>허브를 선택하세요</h5>
          </div>
          <div>
              {renderHubList()}
            </div>
        </div>}
        
        {/* 리모컨 선택 */}
        {selectedHub ? (
          <div className='select-hub'>
            <div className='d-flex align-items-center mb-3'>
              <div onClick={goBackToHubSelection}>
                <i className="bi bi-chevron-left fs-2 me-3"></i>
              </div>
              <h4 style={{fontWeight:"600", marginBottom:"0px", color:"#0097B2"}} className='me-2'>{selectedHub.userHubName}</h4>
              <h5 style={{marginBottom:"0px"}} className='font-700'>리모컨을 선택하세요</h5>
            </div>
            {renderRemoteList()}
          </div>
        ) : null}

        {/* 리모컨 동작 선택 */}
        {selectedRemote ? (
          <div className='select-hub'>
            <div className='d-flex align-items-center mb-3'>
              <div onClick={goBackToRemoteSelection}>
                <i className='bi bi-chevron-left fs-2 me-3'></i>
              </div>
              <div className='d-flex flex-column'>
                <h4 style={{fontWeight:"600", marginBottom:"0px", color:"#0097B2"}} className='me-2'>
                  {selectedHub.userHubName} {selectedRemote.controllerName}</h4>
                <h5 style={{ marginBottom: '0px' }} className='font-700'>
                  리모컨 동작을 선택하세요
                </h5>
              </div>
            </div>
            <button className='btn mt-3'
                onClick={handleSelectionComplete}
                style={{backgroundColor:"#0097B2", color:"#FCFCFC", fontWeight:"700", width:"100%", height:"40px"}}>
             선택완료</button>
        </div>
      ) : null}

    </div>
  )
}

export default SelectResult