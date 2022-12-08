import { createSlice } from '@reduxjs/toolkit'
// create a slice 
export const selectTem = createSlice({
  name:"selectTem",
  initialState:{
    selectTem: {}
  },
  reducers:{
       setSelectTem: (state , action)=>{
           state.selectTem = action.payload
       },
       
     }
  })

  export const {setSelectTem } = selectTem.actions;