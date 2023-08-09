import { createSlice} from '@reduxjs/toolkit';

const chaSlice = createSlice({
  name: 'cha',
  initialState: {
    characteristicValue : "",
    characteristic : false,
    error : null
  },
  reducers: {
    bconnectSuccess: (state, action) => {
      state.characteristic = true
      state.characteristicValue = new TextDecoder().decode(action.payload)
    },
    bconnectFailure: (state, action) => {
      state.characteristic = action.payload
    },
    wconnectSuccess:(state,action) => {
      state.characteristicValue = action.payload
    },
    wconnectFailure: (state, action) => {
      console.log(action.payload)
      state.characteristic = null
      state.errorMessage = action.payload
    },
  },
})

export const { bconnectSuccess, bconnectFailure, wconnectSuccess, wconnectFailure } = chaSlice.actions

export const bluetooth = (characteristic) => async(dispatch) => {
  console.log('bluetooth check')
  try{
    console.log('bluetooth 연결 성공')
    await dispatch(bconnectSuccess(characteristic))
  }
  catch(error){
    console.log('bluetooth 연결 실패', error)
    dispatch(bconnectFailure())
  }
}

export const cha = (value) => async(dispatch, getState) => {
  const { cha: {characteristic}} = getState()
  console.log('check')
    if (chaSlice.characteristic) {
      const data = new TextEncoder().encode(value);
      try{
        await characteristic.writeValue(data)
          console.log('Data written successfully:', value);
          dispatch(wconnectSuccess(value))
      }
      catch (error) {
        console.error('Error writing data:', error);
        dispatch(wconnectFailure())
      }    
    }
  } 
        // .then(() => {
        //   console.log('Data written successfully:', value);
        //   dispatch(wconnectSuccess(value))
        // })
        // .catch((error) => {
        //   console.error('Error writing data:', error);
        // });
    
  


export default chaSlice.reducer;
