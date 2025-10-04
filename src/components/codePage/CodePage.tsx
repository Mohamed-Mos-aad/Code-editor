// ** Hooks && Tools
import {  useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prism-themes/themes/prism-one-dark.css";
import "prismjs/components/";
function loadLanguage(name: string) {
    const fileName = name;
    const parts = fileName?.split(".");
    let keyToSearch: string;

    if (parts.length > 1) {
        keyToSearch = parts[parts.length - 1].toLocaleLowerCase();
    } else {
        keyToSearch = fileName.toLocaleLowerCase();
    }
    const langFromMap = languagesMap[keyToSearch];
    return (langFromMap || 'text').toLowerCase();
}
// ** Components
import Tabs from "../tabs/Tabs";
// ** Store
import { useAppSelector } from "../../app/hooks";
import { languagesMap } from "../../constant";


export default function CodePage() {
    // ** Store
    const { activeTab } = useAppSelector((state) => state.tabsSlice)
    


    // ** States
    const [code, setCode] = useState(activeTab?.content || "");
    const [highlightedCode, setHighlightedCode] = useState("");
    




    // ** Ref
    const preRef = useRef<HTMLPreElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    



    // ** Handlers
    const changeCodeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const newCode = e.currentTarget.value;
        setCode(newCode);
        const lang = loadLanguage(activeTab?.name || "");
        const grammar = Prism.languages[lang] || Prism.languages.javascript;
        const html = Prism.highlight(
            newCode,
            grammar,
            lang
        );
        setHighlightedCode(html);
    }
    const handleScroll = () => {
        if (textareaRef.current && preRef.current) {
        preRef.current.scrollTop = textareaRef.current.scrollTop;
        preRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };


    // ** UseEffect
    useEffect(() => {
    if (activeTab) {
        const lang = loadLanguage(activeTab?.name || "");
        const newCode = activeTab.content || "";
        const grammar = Prism.languages[lang] || Prism.languages.javascript;
        setCode(newCode);
        setHighlightedCode(Prism.highlight(newCode, grammar, lang));
    }
    }, [activeTab]);



    return (
        <>
            <div className="w-full">
                <Tabs />
                <section className="relative bg-[#1E1E1E]">
                    <textarea ref={textareaRef}
                            onScroll={handleScroll}
                            className="w-full h-[95vh] absolute top-0 left-0 text-transparent caret-white resize-none focus:outline-0 selection:bg-blue-600 selection:text-white
                            bg-transparent outline-none z-10 font-mono text-[16px] leading-6" 
                            spellCheck={false}
                            onChange={(e)=>{changeCodeHandler(e)}} 
                            value={code || ""}>
                    </textarea>
                    <pre ref={preRef} className="w-full h-[95vh] overflow-auto text-[16px] leading-6 font-mono text-white whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: highlightedCode }}/>
                </section>
            </div>
        </>
    )
}