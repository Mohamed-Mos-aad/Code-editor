// ** Hooks && Tools
import {  useEffect, useRef, useState } from "react";
// ** Components
import Tabs from "../tabs/Tabs";
// ** Store
import { useAppSelector } from "../../app/hooks";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';


export default function CodePage() {
    // ** Store
    const { activeTab } = useAppSelector((state) => state.tabsSlice)
    


    // ** States
    const [code, setCode] = useState(activeTab?.content || "");



    // ** Ref
    const codeRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    



    // ** Handlers
    const changeCodeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setCode(e.currentTarget.value);
    }
    const handleScroll = () => {
        if(codeRef.current && textareaRef.current) {
            textareaRef.current.scrollTop = codeRef.current.scrollTop;
        }
    };


    // ** UseEffect
    useEffect(() => {
        if (activeTab) {
            setCode(activeTab.content || "");
        }
    }, [activeTab]);



    return (
        <>
            <div className="w-full">
                <Tabs />
                <section className="relative bg-[#1E1E1E]" ref={codeRef} onScroll={handleScroll}>
                    <textarea className="w-full h-full absolute top-0 left-0 text-red-500 caret-white resize-none"
                    style={{
    fontFamily: "'Fira Code', monospace",
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '24px',
  }}
   onChange={(e)=>{changeCodeHandler(e)}} value={code || ""}>

                    </textarea>
                    <SyntaxHighlighter language="javascript" style={nightOwl} customStyle={{backgroundColor: '#1E1E1E', height: '95vh', overflow: 'auto',
    fontFamily: "'Fira Code', monospace",
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '24px',
    padding: '8px',
    fontStyle: 'normal',
}} showLineNumbers>
                        {code || ""}
                    </SyntaxHighlighter>
                </section>
            </div>
        </>
    )
}