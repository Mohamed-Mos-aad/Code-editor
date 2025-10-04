// ** Hooks && Tools
import { useState } from "react";
import { v4 as uuid } from "uuid";
// ** Store
import { addFile, addFolder, setNewNode } from "../../app/features/filesTree/fileTreeSlice";
import { useAppDispatch } from "../../app/hooks";
// ** Components
import FileLogo from "./FileLogo";
// ** Interfaces
import type { IFileTree } from "../../interfaces";



// ** Interfaces
interface INewNode{
    isFolder: boolean;
    id:string;
    changeActiveNodeHandler: (item:IFileTree)=> void;
}



export default function NewNode({isFolder,id,changeActiveNodeHandler}:INewNode) {
    // ** Store
    const dispatch = useAppDispatch();



    // ** States
    const [name,setName] = useState('');



    // ** Handlers
    const liveIconHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.currentTarget.value);
    }
    const newNodeHandler = (id:string, value:string)=>{
        dispatch(setNewNode(null));
        if(value === "") return
        const newId = uuid();
        if(isFolder)
        {
            dispatch(addFolder({ parentId: id, id: newId, name: value }));
        }
        else
        {
            dispatch(addFile({ parentId: id, id: newId, name: value }));
        }
        changeActiveNodeHandler({ id: newId, isFolder: isFolder, name:value})
    }



    return (
        <>
            <li className="block ml-1 mt-1 cursor-pointer">
                <div className="flex items-center gap-1">
                    {
                        isFolder ?
                        <>
                            <button>
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="#D4D4D4"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
                            </button>
                            <button>
                                <FileLogo isFolder={isFolder} name={name} isOpen={false}/>
                            </button>
                        </>
                        :
                        <>
                            <div className="min-w-5"></div>
                            <button>
                                <FileLogo isFolder={false} name={name}/>
                            </button>
                        </>
                    }
                    <input
                        className="w-full border-1 border-[#2E81D4] rounded-[2px] px-1 focus:outline-0"
                        autoFocus
                        type="text"
                        onChange={(e)=>{liveIconHandler(e)}}
                        placeholder={isFolder ? "Enter Folder name" : "Enter File name"}
                        onBlur={(e) => { newNodeHandler(id,e.target.value); }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.currentTarget.value) {
                                e.preventDefault();
                                newNodeHandler(id,e.currentTarget.value);
                            }
                            if (e.key === "Escape") dispatch(setNewNode(null));
                        }}
                    />
                </div>
            </li>
        </>
    )
}
