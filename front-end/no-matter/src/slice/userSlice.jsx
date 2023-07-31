// userSlice.js
import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


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
      url: 'http://localhost:8080/api/v1/user/join',

      //찬석
      data: {userId:userId, userPassword:userPassword, userName:userName, userEmail:userEmail, userNumber:userNumber}

    })
    .then((response) => {
      console.log(response)
      const user = response.data
      dispatch(signupSuccess(user))
    })
    .catch((err) => {
      console.log(userId, userPassword, userName, userEmail, userNumber)
      console.log(err)
      dispatch(signupFailure())
    })
  }
}


export default userSlice.reducer;





