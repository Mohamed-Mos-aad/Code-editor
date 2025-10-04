// ** Hooks && Tools
import { useEffect, useState } from "react";
// ** Components
import FileComponent from "./FileComponent";
import FileLogo from "./FileLogo";
// ** Interfaces
import type { IFileTree } from "../../interfaces";
import { useAppSelector } from "../../app/hooks";
import NewNode from "./NewNode";
import RenameNode from "./RenameNode";
interface IFolderProps {
    activeNode: string;
    changeActiveNodeHandler: (item:IFileTree)=> void;
    onRightClick: (e: React.MouseEvent, file: IFileTree)=> void;
    file: IFileTree;
}


export default function Folder({file, activeNode, changeActiveNodeHandler, onRightClick}:IFolderProps) {
    // ** Store
    const { newNode } = useAppSelector((state) => state.fileTreeSlice)



    // ** States
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const { id, name, isFolder } = file;



    // ** Handlers
    const toggleFolderState = ()=>{
        setIsOpen(prev => !prev);
    }



    // ** Render
    const fileTreeRender = file.children?.map(node => {
        const isNodeRenaming = newNode?.rename && newNode?.parentId === node.id;



        return node.isFolder
            ? (isNodeRenaming
                ? <RenameNode node={node} changeActiveNodeHandler={changeActiveNodeHandler} />
                : <Folder file={node} key={node.id} activeNode={activeNode} changeActiveNodeHandler={changeActiveNodeHandler} onRightClick={onRightClick} />)
            : (isNodeRenaming
                ? <RenameNode node={node} changeActiveNodeHandler={changeActiveNodeHandler} />
                : <FileComponent file={node} key={node.id} activeNode={activeNode} changeActiveNodeHandler={changeActiveNodeHandler} onRightClick={onRightClick} />);
    });


    // ** UseEffect
    useEffect(()=>{
        if (newNode && newNode.parentId === id) {
            setIsOpen(true);
        }
    },[newNode,id])


    
    return (
        <>
            <li className="block ml-1 mt-1 cursor-pointer">
                <div className={ `${activeNode === id ? 'bg-[rgba(18,58,94)]' : ''} flex items-center gap-1 border-1 ${activeNode === id ? 'border-[#2E81D4]' : 'border-transparent'} rounded-[2px]`} onClick={() => {
                    toggleFolderState();
                    changeActiveNodeHandler(file);
                }}
                onContextMenu={(e)=>{onRightClick(e,file)}}>
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
                        {newNode && newNode.parentId === id && <NewNode id={newNode.parentId} isFolder={newNode.isFolder} changeActiveNodeHandler={changeActiveNodeHandler}/>}
                    </ul>
                }
            </li>
        </>
    )
}
