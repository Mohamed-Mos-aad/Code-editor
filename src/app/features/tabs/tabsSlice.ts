// ** Hooks && Tools
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// ** Interfaces
import type { IFileTree } from '../../../interfaces'
interface TabsState {
    tabs: IFileTree[],
    activeTab: IFileTree | null,
}




const initialState: TabsState = {
    tabs: [],
    activeTab: null,
}

export const tabsSlice = createSlice({
    name: 'tabsSlice',
    
    initialState,
    reducers: {
        addTab: (state, action: PayloadAction<IFileTree>) => {
            state.tabs.push(action.payload)
        },
        setActiveTab: (state, action: PayloadAction<IFileTree | null>) => {
            state.activeTab = action.payload;
        },
        closeTab: (state, action: PayloadAction<string>) => {
            const closingId = action.payload;
            const idx = state.tabs.findIndex(t => t.id === closingId);
            const updatedTabs = state.tabs.filter(item => item.id != action.payload);

            if (state.activeTab?.id === closingId) {
                if (updatedTabs.length > 0) {
                state.activeTab = updatedTabs[Math.max(0, idx - 1)];
                } else {
                state.activeTab = null;
                }
            };

            state.tabs = updatedTabs;
        },
    },
})

export const { addTab , setActiveTab, closeTab } = tabsSlice.actions


export default tabsSlice.reducer