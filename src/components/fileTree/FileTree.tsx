// ** Hooks && Tools
import { useState } from "react";
// ** Components
import FileComponent from "./FileComponent";
import Folder from "./Folder";
// ** Interfaces
import { fileTreeData } from "../../data/data";



export default function FileTree() {
    // ** States
    const [isOpen,setIsOpen] = useState<boolean>(true);
    const [activeNode,setActiveNode] = useState<string>('');



    // ** Handlers
    const toggleFolderState = ()=>{
        setIsOpen(prev => !prev);
        changeActiveNodeHandler('main');
    }
    const changeActiveNodeHandler = (id:string)=>{
        setActiveNode(id);
    }



    // ** Render
    const fileTreeRender = fileTreeData?.map(item => 
        item.isFolder ?  
        <Folder id={item.id} isFolder={item.isFolder} name={item.name} childern={item.childern} key={item.id} activeNode={activeNode} changeActiveNodeHandler={changeActiveNodeHandler}/> 
        :
        <FileComponent id={item.id} isFolder={item.isFolder} name={item.name} key={item.id} activeNode={activeNode} changeActiveNodeHandler={changeActiveNodeHandler}/>
    )



    return (
        <>
            <div className="min-w-72 h-screen bg-[#252526] py-2">
                <h1 className="px-4 text-[12px] text-[#D4D4D4]">EXPLORER</h1>
                <ul className="mt-2 text-[14px]">
                    <li>
                        <div className={ `${activeNode === 'main' ? 'bg-[rgba(98,157,214)]' : ''} flex justify-between items-center gap-1`} onClick={toggleFolderState}>
                            <div className="w-full flex items-center gap-1 cursor-pointer">
                                {
                                    isOpen ? 
                                        <button>
                                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="#D4D4D4"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
                                        </button>
                                        :
                                        <button>
                                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="#D4D4D4"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
                                        </button>
                                }
                                Project Name
                            </div>
                            <div className="flex gap-2 pr-2">
                                <button className="cursor-pointer">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="#D4D4D4"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M12 11l0 6" /><path d="M9 14l6 0" /></svg>
                                </button>
                                <button className="cursor-pointer">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="#D4D4D4"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                                </button>
                            </div>
                        </div>
                        {
                            isOpen && 
                            <ul className="block ml-2 mt-1">
                                {fileTreeRender}
                            </ul>
                        }
                    </li>
                </ul>
            </div>
        </>
    )
}