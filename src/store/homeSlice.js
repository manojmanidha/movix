import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
  name: 'home',
  initialState :{
    URL:{name : "re dev"},
    geners:{}
  },
  reducers: {
    getApiConfiguration:(state , action)=>{
        state.URL = action.payload
    },
    getGeners:(state , action)=>{
        state.geners = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {getApiConfiguration , getGeners  } = homeSlice.actions

export default homeSlice.reducer