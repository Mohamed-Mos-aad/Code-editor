// ** Hooks && Tools
import { configureStore } from '@reduxjs/toolkit'
// ** Slices
import { tabsSlice } from './features/tabs/tabsSlice'
import { contextMenuSlice } from './features/contextMenu/contextMenuSlice'
import { fileTreeSlice } from './features/filesTree/fileTreeSlice'



export const store = configureStore({
    reducer: {
        tabsSlice: tabsSlice.reducer,
        contextMenuSlice: contextMenuSlice.reducer,
        fileTreeSlice: fileTreeSlice.reducer,
    },
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch