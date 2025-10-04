// ** Hooks && Tools
import { useState } from "react";
// ** Components
import FileComponent from "./FileComponent";
import FileLogo from "./FileLogo";
// ** Interfaces
import type { IFileTree } from "../../interfaces";
interface IFolderProps {
    activeNode: string;
    changeActiveNodeHandler: (item:IFileTree)=> void;
    file: IFileTree;
}


export default function Folder({file, activeNode, changeActiveNodeHandler}:IFolderProps) {
    // ** States
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const { id, name, isFolder } = file;


    // ** Handlers
    const toggleFolderState = ()=>{
        setIsOpen(prev => !prev);
    }



    // ** Render
    const fileTreeRender = file.children?.map(item => 
        item.isFolder ?  
        <Folder file={item} key={item.id} activeNode={activeNode} changeActiveNodeHandler={changeActiveNodeHandler}/> 
        :
        <FileComponent file={item} key={item.id} activeNode={activeNode} changeActiveNodeHandler={changeActiveNodeHandler}/>
    )



    return (
        <>
            <li className="block ml-1 mt-1 cursor-pointer">
                <div className={ `${activeNode === id ? 'bg-[rgba(18,58,94)]' : ''} flex items-center gap-1 border-1 ${activeNode === id ? 'border-[#2E81D4]' : 'border-transparent'} rounded-[2px]`} onClick={() => {
                    toggleFolderState();
                    changeActiveNodeHandler(file);
                }}>
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
                    <button>
                        <FileLogo isFolder={isFolder} name={name} isOpen={isOpen}/>
                    </button>
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
