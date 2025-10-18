// ** Hooks && Tools
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// ** Local Storage
import { loadAppData, saveAppData } from '../../../utils/localStorageHelper';
// ** Interfaces




const storedData = loadAppData();
const initialState= {
    theme: storedData.theme || 'prism-one-dark',
};



export const themeSlice = createSlice({
    name: 'themeSlice',
    
    initialState,
    reducers: {
        changeTheme: (state,action: PayloadAction<string>)=>{
            state.theme = action.payload;
            saveAppData({theme: action.payload})
        }
    },
})

export const { changeTheme } = themeSlice.actions


export default themeSlice.reducer