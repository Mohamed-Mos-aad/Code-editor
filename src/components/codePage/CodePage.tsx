// ** Hooks && Tools
import { useEffect, useRef, useState } from "react";
// ** Components
import Tabs from "../tabs/Tabs";

export default function CodePage() {
    // ** States
    const [code, setCode] = useState("");



    // ** Ref
    const editorRef = useRef<HTMLDivElement>(null);



    // ** Handlers
    const getLinesNumbers = ()=>{
        const lines = code.split("\n");
        return lines.map((_, index) => (
            <li key={index} className="w-16 flex justify-center line-number">{index + 1}</li>
        ));
    }
    const highlightSyntax = (code:string) => {
        const keywords = /\b(function|var|let|const|if|else|return)\b/g;
        return code.replace(keywords, (match) => `<span class="text-blue-500!">${match}</span>`);
    };
    const handleChange = () => {
        if(!editorRef.current) return
        setCode(editorRef.current.innerText);
    };



    // ** UseEffect
    useEffect(()=>{
        if(!editorRef.current) return
        console.log(highlightSyntax(code));
        editorRef.current.innerHTML = highlightSyntax(code);
    },[code])



    return (
        <>
            <div className="w-full">
                <Tabs />
                <section className="flex bg-[#1E1E1E]">
                    <div>
                        <ul className="text-white">
                            {getLinesNumbers()}
                        </ul>
                    </div>
                    <div ref={editorRef}className="w-full font-mono focus:outline-0" style={{ whiteSpace: "pre-wrap" }}  onInput={handleChange} contentEditable spellCheck="false">
                        
                    </div>
                </section>
            </div>
        </>
    )
}