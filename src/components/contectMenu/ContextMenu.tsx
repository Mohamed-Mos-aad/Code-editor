// ** Store
import { useEffect, useRef } from "react";
// ** Store
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeContextMenu } from "../../app/features/contextMenu/contextMenuSlice";

export default function ContextMenu() {
    // ** Store
    const { x , y } = useAppSelector((state) => state.contextMenuSlice)
    const dispatch = useAppDispatch()



    // ** Ref
    const menuRef = useRef<HTMLDivElement>(null);



    // ** UseEffect
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            dispatch(closeContextMenu());
        }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch]);



    return (
        <>
            <div ref={menuRef} className="w-72 absolute bg-[#252526] border-1 border-[#5b5b5b] rounded-[2px] text-[14px]" style={{ top: y, left: x }}>
                <ul className="p-1">
                    <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer">New File...</li>
                    <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer">New File...</li>
                    <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer">New File...</li>
                    <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer">New File...</li>
                </ul>
                <div className="w-full border-b-1 border-[#5b5b5b]"></div>
                <ul className="p-1">
                    <li className="pl-[24px] hover:bg-[#0067c8] rounded-[2px] cursor-pointer">New File...</li>
                </ul>
            </div>
        </>
    )
}
