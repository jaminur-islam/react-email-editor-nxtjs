import { configureStore } from '@reduxjs/toolkit'
import {emailEditorSlice} from "./slice/emailEditorSlice"
import { selectTem } from './slice/selectTemSlice'

// config the store 
const store= configureStore({
  reducer: {
    emailTemplatedList: emailEditorSlice.reducer,
    selectTem: selectTem.reducer,
  }
})

// export default the store 
export default store

