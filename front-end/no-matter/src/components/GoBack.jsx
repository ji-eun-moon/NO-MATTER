import React from 'react'
import { useNavigate } from 'react-router-dom';

function GoBack() {
    const navigate = useNavigate();
    const goBack = () => {
        // 이전 페이지로 이동
        navigate(-1);
        };
  return (
    <div onClick={goBack}>
        <i className="bi bi-chevron-left fs-2 me-3"></i>
    </div>
  )
}

export default GoBack