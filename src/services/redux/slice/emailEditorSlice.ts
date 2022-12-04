import { createSlice } from '@reduxjs/toolkit'
// create a slice 
export const emailEditorSlice = createSlice({
  name:"emailTemplatedList",
  initialState:{
    emailTemplatedList: []
  },
  reducers:{
       setEmailTemplated: (state , action)=>{
           state.emailTemplatedList.unshift(action.payload)
       },
       removeEmailTemplated: (state)=>{
           state.emailTemplatedList.pop()
       },
       
     }
  })

  export const {setEmailTemplated , removeEmailTemplated} = emailEditorSlice.actions;