export default function Tabs() {
    return (
        <>
            <div>
                <ul className="flex bg-[#252526] text-[13px] text-[#D4D4D4]">
                    <li className="w-40 flex justify-between items-center bg-[#1E1E1E] px-4 py-2 cursor-pointer">
                        style.css
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </li>
                    <li className="w-40 flex justify-between items-center bg-[#2D2D2D] px-4 py-2 cursor-pointer">
                        main.js
                    </li>
                    <li className="w-40 flex justify-between items-center bg-[#2D2D2D] px-4 py-2 cursor-pointer">
                        index.html
                    </li>
                </ul>
            </div>
        </>
    )
}