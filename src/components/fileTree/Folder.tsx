// ** Hooks && Tools
import { useState } from "react";
// ** Components
import FileComponent from "./FileComponent";
// ** Interfaces
import type { IFileTree } from "../../interfaces";
interface IFolderProps extends IFileTree {
    activeNode: string;
    changeActiveNodeHandler: (item:IFileTree)=> void;
}


export default function Folder({id, isFolder, name, childern, activeNode, changeActiveNodeHandler}:IFolderProps) {
    // ** States
    const [isOpen,setIsOpen] = useState<boolean>(false);



    // ** Handlers
    const toggleFolderState = ()=>{
        setIsOpen(prev => !prev);
    }



    // ** Render
    const fileTreeRender = childern?.map(item => 
        item.isFolder ?  
        <Folder id={item.id} isFolder={item.isFolder} name={item.name} childern={item.childern} key={item.id} activeNode={activeNode} changeActiveNodeHandler={changeActiveNodeHandler}/> 
        :
        <FileComponent id={item.id} isFolder={item.isFolder} name={item.name} key={item.id} activeNode={activeNode} changeActiveNodeHandler={changeActiveNodeHandler}/>
    )



    return (
        <>
            <li className="block ml-1 mt-1 cursor-pointer">
                <div className={ `${activeNode === id ? 'bg-[rgba(98,157,214)]' : ''} flex items-center gap-1`} onClick={toggleFolderState}>
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
                    {
                        isOpen ? 
                            <button>
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder-open"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" /></svg>
                            </button>
                            :
                            <button>
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" /></svg>
                            </button>
                    }
                    {name}
                </div>
                {
                    isFolder && isOpen &&
                    <ul className="block ml-2 mt-1 border-l-2 border-[#D4D4D4]">
                        {fileTreeRender}
                    </ul>
                }
            </li>
        </>
    )
}
