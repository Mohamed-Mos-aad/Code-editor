// ** Hooks && Tools
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// ** Interfaces
import type { IFileTree } from '../../../interfaces'
interface IContextMenuState {
    visible: boolean, x: number, y: number, file: IFileTree | null
}




const initialState: IContextMenuState = {
    visible: false,
    x: 0,
    y: 0,
    file: null
}

export const contextMenuSlice = createSlice({
    name: 'contextMenuSlice',
    
    initialState,
    reducers: {
        updateContextMenu: (state, action: PayloadAction<IContextMenuState>) => {
            state.visible = action.payload.visible;
            state.x = action.payload.x;
            state.y = action.payload.y;
            state.file = action.payload.file;
        },
        closeContextMenu: (state) => {
            state.visible = false;
        },
    },
})

export const { updateContextMenu, closeContextMenu } = contextMenuSlice.actions


export default contextMenuSlice.reducer