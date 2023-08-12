// userSlice.js
import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSignUp: false,
    user: null,
    error: null,
  },
  reducers: {
    signupSuccess: (state, action) => {
      state.isSignUp = true
      state.user = action.payload
      state.error = null
    },
    signupFailure: (state, action) => {
      state.isSignUp = false
      state.user = null
      state.error = action.payload
    },
  },
})

export const { signupSuccess, signupFailure } = userSlice.actions

export const signup = (userId, userPassword, userName, userEmail, userNumber) => async(dispatch) => {
  {
    axios({
      method: 'POST',
      url: 'https://i9c105.p.ssafy.io/api/v1/user/join',

      //찬석
      data: {userId:userId, userPassword:userPassword, userName:userName, userEmail:userEmail, userNumber:userNumber}

    })
    .then((response) => {
      console.log(response)
      const user = response.data
      dispatch(signupSuccess(user))
      Toast.fire({
        icon: 'success',
        title: '회원가입 완료',
        timer: 1500
        // footer: '<a href="">Why do I have this issue?</a>'
      })

    })
    .catch((err) => {
      console.log(userId, userPassword, userName, userEmail, userNumber)
      console.log(err)
      dispatch(signupFailure())
      Toast.fire({
        icon: 'error',
        title: '회원가입 실패',
        // footer: '<a href="">Why do I have this issue?</a>'
      })

    })
  }
}


export default userSlice.reducer;





