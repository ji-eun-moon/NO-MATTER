// userSlice.js
import { createSlice} from '@reduxjs/toolkit';


const chaSlice = createSlice({
  name: 'cha',
  initialState: {
    characteristicValue : "",
    characteristic : null
  },
  reducers: {
    bconnectSuccess: (state, action) => {
    state.characteristic = action.payload
    },
    wconnectSuccess:(state,action) => {
        state.characteristicValue = new TextDecoder().decode(action.payload)
    },
  },
})

export const { bconnectSuccess, wconnectSuccess } = chaSlice.actions

export const bluetooth = (characteristic) => async(dispatch) => {
    dispatch(bconnectSuccess(characteristic))
}

export const cha = (value, characteristic) => async(dispatch) => {
  {    
    try{
      if (characteristic) {
        const data = new TextEncoder().encode(value);
        await characteristic.writeValue(data)
        console.log('Data written successfully:', value);
        dispatch(wconnectSuccess(value))
      }
    } 
    catch (error) {
      console.error('Error writing data:', error);
    }
        // .then(() => {
        //   console.log('Data written successfully:', value);
        //   dispatch(wconnectSuccess(value))
        // })
        // .catch((error) => {
        //   console.error('Error writing data:', error);
        // });
    }
  }


export default chaSlice.reducer;
