import { configureStore } from '@reduxjs/toolkit'
import {emailEditorSlice} from "./slice/emailEditorSlice"

// config the store 
const store= configureStore({
  reducer: {
    emailTemplatedList: emailEditorSlice.reducer
  }
})

// export default the store 
export default store

