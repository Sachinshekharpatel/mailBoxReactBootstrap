import {createSlice , configureStore} from '@reduxjs/toolkit'
// always import react redux tookit from terminal
//after cretaing this redux function go to index.js file and wrap component inside provifer tag and pass store as props
const editormodal = {
    editor : false,
}

const sendmailSlice = createSlice({
    name : 'sendmail',
    initialState : editormodal,
    reducers : {
        editormodal : (state) => {
            state.editor = !state.editor
        }
    }
})

const store = configureStore({
    reducer: {
      sendmail: sendmailSlice.reducer,
    },
  });
  export const sendMailBtnReduxStore = sendmailSlice.actions;
  export default store;
  