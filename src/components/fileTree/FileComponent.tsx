// ** Components
import FileLogo from "./FileLogo";
// ** Interfaces
import type { IFileTree } from "../../interfaces";
interface IFileProps {
    file: IFileTree;
    activeNode: string;
    changeActiveNodeHandler: (item:IFileTree)=> void;
    onRightClick: (e: React.MouseEvent, file: IFileTree)=> void;
}


export default function FileComponent({file, activeNode, changeActiveNodeHandler, onRightClick}:IFileProps) {
    // ** States
    const { id, name, isFolder } = file;



    return (
        <>
            <li className="block ml-1 mt-1 cursor-pointer">
                <div className={ `${activeNode === id ? 'bg-[rgba(18,58,94)]' : ''} flex items-center gap-1 border-1 ${activeNode === id ? 'border-[#2E81D4]' : 'border-transparent'} rounded-[2px]`} onClick={()=>{changeActiveNodeHandler(file)}}
                    onContextMenu={(e)=>{onRightClick(e,file)}}>
                    <div className="w-5"></div>
                    <button>
                        <FileLogo isFolder={isFolder} name={name}/>
                    </button>
                    {name}
                </div>
            </li>
        </>
    )
}
