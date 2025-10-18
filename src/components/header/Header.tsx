// ** Hooks && Tools
import { useEffect, useRef, useState } from "react"
// ** Store
import { useDispatch } from "react-redux";
import { changeTheme } from "../../app/features/settings/settingsSlice";



export default function Header() {
    // ** Store
    const dispatch = useDispatch();



    // ** Refs
    const listRef = useRef<HTMLDivElement | null>(null)
    // ** States
    const [listOpened,setListOpened] = useState<boolean>(false);



    // ** Handlers
    const changeThemeHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>)=>{
        dispatch(changeTheme(e.currentTarget.innerHTML));
        setListOpened(false);
    }



    // ** UseEffect
    useEffect(()=>{
        function handleClickOutside(event: MouseEvent) {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                setListOpened(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[]);



    return (
        <>
            <div className='h-9 flex items-center bg-[#3C3C3C] text-[14px] px-2 relative'>
                <div className='w-12'></div>
                <ul>
                    <li className='cursor-pointer'>File</li>
                </ul>
                <div className='absolute left-1/2 z-10 translate-x-[-50%] w-[32%] flex justify-center items-center gap-1 bg-[#464646] border border-[#616161] px-1 py-[2px] rounded-sm cursor-pointer'
                onClick={()=>{setListOpened((prev)=> !prev)}}>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="#ffffff"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    code-editor
                </div>
                {
                    listOpened && 
                    <div className="absolute top-1 left-1/2 z-[100] translate-x-[-50%] w-[40%] bg-[#252526] border-1 border-[#5b5b5b] rounded-[2px] text-[14px] px-1 py-[2px] shadow-md"
                        ref={listRef}>
                        <ul>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-one-dark</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-vsc-dark-plus</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-dracula</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-atom-dark</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-duotone-dark</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-material-dark</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-coldark-dark</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-nord</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-night-owl</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-gruvbox-dark</li>
                        </ul>
                        <div className="w-full border-b-1 border-[#5b5b5b]"></div>
                        <ul>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-one-light</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-duotone-light</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-material-light</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-gruvbox-light</li>
                            <li className="cursor-pointer" onClick={(e)=>{changeThemeHandler(e)}}>prism-ghcolors</li>
                        </ul>
                    </div>
                }
            </div>
        </>
    )
}