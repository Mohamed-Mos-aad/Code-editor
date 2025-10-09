// ** Store
import { useEffect, useRef } from "react";
// ** Store
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeContextMenu } from "../../app/features/contextMenu/contextMenuSlice";
import { deleteNode, setNewNode } from "../../app/features/filesTree/fileTreeSlice";
import { closeAllTabs, closeTab } from "../../app/features/tabs/tabsSlice";



export default function ContextMenu() {
    // ** Store
    const { file, x, y, type } = useAppSelector((state) => state.contextMenuSlice)
    const dispatch = useAppDispatch()



    // ** Ref
    const menuRef = useRef<HTMLDivElement>(null);



    // ** Handlers
    const addFileHandler = ()=>{
        if(!file) return
        dispatch(closeContextMenu());
        dispatch(setNewNode({ parentId: file.id, isFolder: false, rename: false }));
    }
    const addFolderHandler = ()=>{
        if(!file) return
        dispatch(closeContextMenu());
        dispatch(setNewNode({ parentId: file.id, isFolder: true, rename: false }));
    }
    const renameNodeHandler = ()=>{
        if(!file) return
        dispatch(closeContextMenu());
        dispatch(setNewNode({ parentId: file.id, isFolder: file.isFolder, rename: true }));
    }
    const deleteNodeHandler = ()=>{
        if(!file) return
        dispatch(closeContextMenu());
        dispatch(deleteNode({ id: file.id }));
        dispatch(closeTab(file.id));
    }
    const closeTabHandler = ()=>{
        if(!file) return
        dispatch(closeContextMenu());
        dispatch(closeTab(file.id));
    }
    const closeAllTabsHandler = ()=>{
        if(!file) return
        dispatch(closeContextMenu());
        dispatch(closeAllTabs());
    }



    // ** UseEffect
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                dispatch(closeContextMenu());
                dispatch(setNewNode(null));
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch]);




    return (
        <>
            {
                type === 'tab' ? 
                <div ref={menuRef} className="w-72 absolute z-50 bg-[#252526] border-1 border-[#5b5b5b] rounded-[2px] text-[14px]" style={{ top: y, left: x }}>
                    <ul className="p-1">
                        <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer" onClick={closeTabHandler}>Close</li>
                        <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer" onClick={closeAllTabsHandler}>Close All</li>
                    </ul>
                </div>
                :
                <div ref={menuRef} className="w-72 absolute z-50 bg-[#252526] border-1 border-[#5b5b5b] rounded-[2px] text-[14px]" style={{ top: y, left: x }}>
                    <ul className="p-1">
                        {
                            file?.isFolder && 
                            <>
                                <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer" onClick={addFileHandler}>New File...</li>
                                <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer" onClick={addFolderHandler}>New Folder...</li>
                            </>
                        }
                        <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer" onClick={renameNodeHandler}>Rename {file?.isFolder ? 'Folder' : 'File'}</li>
                        <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer" onClick={deleteNodeHandler}>Delete {file?.isFolder ? 'Folder' : 'File'}</li>
                    </ul>
                    <div className="w-full border-b-1 border-[#5b5b5b]"></div>
                </div>
            }
        </>
    )
}
