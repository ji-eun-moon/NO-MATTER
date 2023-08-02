import React from 'react'
import { Button } from '@material-ui/core'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../config/axios'

function UserEditPage() {
  const navigate = useNavigate()

  const deleteUser = (e) => {
    axiosInstance.delete('/user/delete')
    .then((res) => {
      alert('잘가시게')
      sessionStorage.clear()
      console.log(res)
      navigate('/')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <div className='d-flex justify-content-between mt-5'>
        <h1 className="font-700">회원 정보 수정</h1>
      </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={deleteUser}
          color="primary"
          className="button"
          >
          회원 탈퇴
        </Button>
    </div>
  )
}

export default UserEditPage