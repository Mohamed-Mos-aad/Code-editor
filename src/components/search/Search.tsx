// ** Hooks && Tools
import { useEffect, useState } from "react";
// ** Components
import type { IFileTree } from "../../interfaces";
// ** Interfaces
import FileComponent from "../fileTree/FileComponent";
// ** Local Storage
import { loadAppData } from "../../utils/localStorageHelper";
import { useDispatch } from "react-redux";
import { addTab, setActiveTab } from "../../app/features/tabs/tabsSlice";
import { useAppSelector } from "../../app/hooks";



export default function Search() {
    // ** Store
    const { tabs } = useAppSelector((state) => state.tabsSlice)
    const dispatch = useDispatch();



    // ** States
    const [fileTree] = useState(() => loadAppData().fileTree);
    const [searchValue,setSearchValue] = useState('')
    const [searchResult,setSearchResult] = useState<IFileTree[]>([]);


    
    // ** Handlers
    const changeSearchValueHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchValue(e.currentTarget.value);
    }
    const openFileHandler = (file:IFileTree)=>{
        if(file.isFolder) return
        const isExited = tabs.some(item => item.id === file.id);
        dispatch(setActiveTab(file));
        if(isExited) return 
        dispatch(addTab(file));
    }

    
    // ** Render
    const searchResultRender = searchResult.map(result => 
        <li className="text-[13px] text-[#f4f4f4] ml-[-28px]">
            <FileComponent activeNode="" file={result} onRightClick={()=>{}} changeActiveNodeHandler={openFileHandler}/>
        </li>
    )



    // ** UseEffect
    useEffect(()=>{
        if (!searchValue.trim()) return;

        const results: IFileTree[] = [];

        const searchInTree = (node: IFileTree)=>{
            if (!node) return;

            if (!node.isFolder && node.content?.toLowerCase().includes(searchValue.toLowerCase())) {
                results.push(node);
            }

            if (node.isFolder && node.children) {
                node.children.forEach(child => searchInTree(child));
            }
        }

        searchInTree(fileTree);

        setSearchResult(results);
    },[searchValue,fileTree]);



    return (
        <>
            <div className="w-full h-full bg-[#252526] px-4 py-2">
                <h1 className="text-[11px] text-[#D4D4D4] mb-2">SEARCH</h1>
                <input
                    className="w-full bg-[#2D2D2D] border-1 border-[#2E81D4] rounded-[2px] px-1 focus:outline-0 text-[14px] p-1"
                    autoFocus
                    placeholder="Search"
                    onChange={(e)=>{changeSearchValueHandler(e)}}
                    value={searchValue}
                    type="text"
                />
                <ul>
                    {searchResultRender}
                </ul>
            </div>
        </>
    )
}