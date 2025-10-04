// ** Hooks && Tools
import { useEffect } from "react";
// ** Components
import FileLogo from "../fileTree/FileLogo";
// ** Interfaces
import type { IFileTree } from "../../interfaces";
// ** Store
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeTab, setActiveTab } from "../../app/features/tabs/tabsSlice";




export default function Tabs() {
    // ** Store
    const { tabs, activeTab } = useAppSelector((state) => state.tabsSlice)
    const dispatch = useAppDispatch()

    
    
    // ** Handlers
    const selectActiveTabHandler = (file:IFileTree)=>{
        dispatch(setActiveTab(file));
    }
    const closeTabHandler = (id:string)=>{
        dispatch(closeTab(id));
    }



    // ** Render
    const tabRenders = tabs.map(tab => 
        <li className={`w-40 flex justify-between items-center ${activeTab?.id === tab.id ? 'bg-[#1E1E1E]' :  'bg-[#2D2D2D]'}  px-4 py-2 cursor-pointer`} onClick={()=>{selectActiveTabHandler(tab)}} key={tab.id}>
            <div className="max-w-4">
                <FileLogo isFolder={false} name={tab.name}/>
            </div>
            <div className="flex items-center gap-2">
                {tab.name}
                <button onClick={(e)=>{
                    e.stopPropagation();
                    closeTabHandler(tab.id)
                }}>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x cursor-pointer"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>
        </li>
    )



    // ** UseEffect
    useEffect(()=>{
        if(tabs.length < 1){
            dispatch(setActiveTab(null));
        }
    },[dispatch, tabs])


    
    return (
        <>
            <div>
                <ul className="flex bg-[#252526] text-[13px] text-[#D4D4D4]">
                    {tabRenders}
                </ul>
            </div>
        </>
    )
}