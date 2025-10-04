// ** Hooks && Tools
import { useState } from "react";
// ** Store
import { useAppDispatch } from "../../app/hooks";
// ** Interfaces
import type { IFileTree } from "../../interfaces";
import { renameNode, setNewNode } from "../../app/features/filesTree/fileTreeSlice";
import FileLogo from "./FileLogo";
interface IRenameNodeProps {
    node: IFileTree;
    changeActiveNodeHandler: (item:IFileTree)=> void;
}



export default function RenameNode({node}:IRenameNodeProps) {
    // ** Store
    const dispatch = useAppDispatch();



    // ** States
    const [name, setName] = useState(node.name);
    const isFolder = node.isFolder;


    // ** Handlers
    const liveChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const renameHandler = () => {
        if (!name.trim()) return;
        dispatch(renameNode({ id: node.id, newName: name.trim() }));
        dispatch(setNewNode(null));
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
                        autoFocus
                        className="w-full border-1 border-[#2E81D4] rounded-[2px] px-1 focus:outline-0"
                        type="text"
                        value={name}
                        onChange={liveChangeHandler}
                        onBlur={renameHandler}
                        onKeyDown={(e) => { 
                            if (e.key === "Enter") renameHandler();
                            if (e.key === "Escape") {
                                dispatch(setNewNode(null));
                            }
                        }}
                    />
                </div>
            </li>
        </>
    )
}