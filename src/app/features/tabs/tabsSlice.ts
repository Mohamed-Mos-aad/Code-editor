// ** Hooks && Tools
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// ** Interfaces
import type { IFileTree } from '../../../interfaces'
interface TabsState {
    tabs: IFileTree[],
    activeTab: IFileTree | null,
}




const storedActiveTab = localStorage.getItem('activeTab');
const storedTabs = localStorage.getItem('tabs');
const initialState: TabsState = {
    activeTab: storedActiveTab ? JSON.parse(storedActiveTab) : null,
    tabs: storedTabs ? JSON.parse(storedTabs) : [],
};




// ** Handlers
const saveActiveTabToLocalStorageHandler = (activeTab: IFileTree | null) => {
    try {
        if(activeTab) localStorage.setItem('activeTab', JSON.stringify(activeTab));
    } catch (error) {
        console.error('Failed to save activeTab to localStorage', error);
    }
};
const saveTabsToLocalStorageHandler = (tabs: IFileTree[] | null) => {
    try {
        if(tabs) localStorage.setItem('tabs', JSON.stringify(tabs));
    } catch (error) {
        console.error('Failed to save activeTab to localStorage', error);
    }
};


export const tabsSlice = createSlice({
    name: 'tabsSlice',
    
    initialState,
    reducers: {
        addTab: (state, action: PayloadAction<IFileTree>) => {
            const exists = state.tabs.find(t => t.id === action.payload.id);
            if (!exists) {
                state.tabs.push(action.payload);
                saveTabsToLocalStorageHandler(state.tabs);
            }
        },
        setActiveTab: (state, action: PayloadAction<IFileTree | null>) => {
            state.activeTab = action.payload;
            saveActiveTabToLocalStorageHandler(action.payload);
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
            saveTabsToLocalStorageHandler(state.tabs);
            saveActiveTabToLocalStorageHandler(state.activeTab);
        },
        closeAllTabs: (state)=>{
            state.tabs = []
        }
    },
})

export const { addTab , setActiveTab, closeTab, closeAllTabs } = tabsSlice.actions


export default tabsSlice.reducer