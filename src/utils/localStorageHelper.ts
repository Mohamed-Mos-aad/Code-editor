// ** Constant
const STORAGE_KEY = "vsCode_clone";



// ** Default
const defaultData = {
    fileTree: {},
    tabs: [],
    activeTab: null,
    panelsSizes: [20,80],
}



// ** Load Data
export const loadAppData = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const parsed = data ? JSON.parse(data) : defaultData;

        return { ...defaultData, ...parsed };
    } catch (error) {
        console.error("Failed to load app data", error);
        return defaultData;
    }
};



// ** Save Data
export const saveAppData = (partialData: object) => {
    try {
        const current = loadAppData();
        const updated = { ...current, ...partialData };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error("Failed to save app data", error);
    }
};



// ** Clear All Data
export const clearAppData = () => {
    localStorage.removeItem(STORAGE_KEY);
};