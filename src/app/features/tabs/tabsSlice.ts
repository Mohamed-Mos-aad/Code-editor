// ** Hooks && Tools
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// ** Local Storage
import { loadAppData, saveAppData } from '../../../utils/localStorageHelper';
// ** Interfaces
import type { IFileTree } from '../../../interfaces'
interface TabsState {
    tabs: IFileTree[],
    activeTab: IFileTree | null,
}




const storedData = loadAppData();
const initialState: TabsState = {
    tabs: storedData.tabs,
    activeTab: storedData.activeTab,
};



export const tabsSlice = createSlice({
    name: 'tabsSlice',
    
    initialState,
    reducers: {
        addTab: (state, action: PayloadAction<IFileTree>) => {
            const exists = state.tabs.find(t => t.id === action.payload.id);
            if (!exists) {
                state.tabs.push(action.payload);
                saveAppData({ tabs: state.tabs });
            }
        },
        setActiveTab: (state, action: PayloadAction<IFileTree | null>) => {
            state.activeTab = action.payload;
            saveAppData({ activeTab: state.activeTab });
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
            saveAppData({ tabs: state.tabs, activeTab: state.activeTab });
        },
        closeAllTabs: (state)=>{
            state.tabs = []
        }
    },
})

export const { addTab , setActiveTab, closeTab, closeAllTabs } = tabsSlice.actions


export default tabsSlice.reducer