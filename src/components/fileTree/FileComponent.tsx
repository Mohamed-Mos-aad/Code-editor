// ** Interfaces
import type { IFileTree } from "../../interfaces";
interface IFileProps extends IFileTree {
    activeNode: string;
    changeActiveNodeHandler: (item:IFileTree)=> void;
}


export default function FileComponent({id, name, activeNode, changeActiveNodeHandler, ...rest}:IFileProps) {
    const fileData: IFileTree = { id, name, ...rest };



    return (
        <>
            <li className="block ml-1 mt-1 cursor-pointer">
                <div className={ `${activeNode === id ? 'bg-[rgba(98,157,214)]' : ''} flex items-center gap-1`} onClick={()=>{changeActiveNodeHandler(fileData)}}>
                    <div className="w-5"></div>
                    <button>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-js"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M3 15h3v4.5a1.5 1.5 0 0 1 -3 0" /><path d="M9 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-1" /></svg>
                    </button>
                    {name}
                </div>
            </li>
        </>
    )
}
