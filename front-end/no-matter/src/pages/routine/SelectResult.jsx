import React, { useState, useEffect } from 'react'
import './Routine.scss'
import axiosInstance from '../../config/axios'
import Card from '../../components/Card.jsx';
import SelectButton from './SelectButton.jsx';

function SelectResult({setShowModal, handleSelection}) {

  const [hubs, setHubs] = useState([]);  // 허브 리스트
  const [remotes, setRemotes] = useState([]);  // 리모컨 리스트
  const [remoteType, setRemoteType] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null); // 선택한 허브
  const [selectedRemote, setSelectedRemote] = useState(null);  // 선택한 리모컨
  const [selectedRemoteAction, setSelectedRemoteAction] = useState(null); // 선택한 리모컨 버튼 - 통신용
  const [selectedRemoteButton, setSelectedRemoteButton] = useState(null); // 선택한 리모컨 버튼 - 출력용

  // 허브 리스트 
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
      setRemotes(response.data) // 리모컨 리스트
    })
  }

  useEffect(() => {
    getHubs()
  }, [])

  const closeModal = () => {
      setShowModal(false);
  };

  const selectHub = (hubId) => {
    const selectedHub = hubs.find((hub) => hub.hubId === hubId);
    setSelectedHub(selectedHub); // 허브 선택
    getRemote(hubId)
  }

  const selectRemote = (remoteId) => {
    const selectedRemote = remotes.find((remote) => remote.remoteId === remoteId)
    const remoteType = selectedRemote.remoteType
    setSelectedRemote(selectedRemote) // 리모컨 선택
    setRemoteType(remoteType)
  }

  // 리모컨 버튼 선택 -> props로 넘기기 
  const selectRemoteButton = (buttonlabel, buttonName) => {
    setSelectedRemoteButton(buttonlabel)  // 출력용
    setSelectedRemoteAction(buttonName)  // 통신용
  }
  
  const goBackToHubSelection = () => {
    setSelectedHub(null);
  };

  const goBackToRemoteSelection = () => {
    setSelectedRemote(null);
  };

  const handleSelectionComplete = () => {
    // 선택한 정보를 부모 컴포넌트로 전달하고 모달창 닫기
    handleSelection(selectedHub, selectedRemote, selectedRemoteAction, selectedRemoteButton);
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
              <div className='flex-column d-flex'>
                <h4 style={{fontWeight:"600", marginBottom:"0px", color:"#0097B2"}} className='me-2'>{selectedHub.userHubName}</h4>
                <h5 style={{marginBottom:"0px"}} className='font-700'>리모컨을 선택하세요</h5>
              </div>
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
                  리모컨 버튼을 선택하세요
                </h5>
              </div>
            </div>
            <SelectButton remoteType={remoteType} selectRemoteButton={selectRemoteButton}/>
            
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