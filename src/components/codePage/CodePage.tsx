// ** Hooks && Tools
import {  useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prism-themes/themes/prism-one-dark.css";
import "prismjs/components/";
// ** Components
import Tabs from "../tabs/Tabs";
// ** Store
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// ** Data
import { languagesMap } from "../../constant";
import { updateFileContent } from "../../app/features/filesTree/fileTreeSlice";
import { setActiveTab } from "../../app/features/tabs/tabsSlice";



export default function CodePage() {
    // ** Store
    const { activeTab } = useAppSelector((state) => state.tabsSlice)
    const dispatch = useAppDispatch()
    


    // ** States
    const [code, setCode] = useState(activeTab?.content || "");
    const [highlightedCode, setHighlightedCode] = useState("");
    




    // ** Ref
    const preRef = useRef<HTMLPreElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    



    // ** Handlers
    const loadLanguageHandler = (name: string) => {
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
    const saveToLocalHandler = (newContent:string)=>{
        if (activeTab) {
            dispatch(updateFileContent({ id: activeTab.id, content: newContent }));
            dispatch(setActiveTab({ ...activeTab, content: newContent }));
        }
    }
    const highLightCodeHandler = (code: string)=>{
        const lang = loadLanguageHandler(activeTab?.name || "");
        const grammar = Prism.languages[lang] || Prism.languages.javascript;
        const html = Prism.highlight(
            code,
            grammar,
            lang
        );
        setHighlightedCode(html);
    }
    const changeCodeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const newCode = e.currentTarget.value;
        setCode(newCode);
        saveToLocalHandler(newCode);
        highLightCodeHandler(newCode);
    }
    const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if (e.key === "Tab") {
            e.preventDefault();

            const textarea = textareaRef.current;
            if (!textarea) return;

            const { selectionStart, selectionEnd, value } = textarea;

            const newValue = value.substring(0, selectionStart) + "    " + value.substring(selectionEnd);

            textarea.value = newValue;
            setCode(newValue);
            highLightCodeHandler(newValue);
            saveToLocalHandler(newValue);
            textarea.selectionStart = textarea.selectionEnd = selectionStart + 4;
        }

        if (e.ctrlKey && e.key === "/") {
            e.preventDefault();
            
            const textarea = textareaRef.current;
            if (!textarea) return;

            const { selectionStart, selectionEnd, value } = textarea;

            const newValue = value.substring(0, selectionStart) + "//" + value.substring(selectionEnd);
            textarea.value = newValue;
            setCode(newValue);
            highLightCodeHandler(newValue);
            saveToLocalHandler(newValue);
            textarea.selectionStart = textarea.selectionEnd = selectionStart + 4;
        }

        if (e.shiftKey && e.altKey && e.key === "ArrowDown") {
            e.preventDefault();
            
            const textarea = textareaRef.current;
            if (!textarea) return;

            const { selectionStart, selectionEnd, value } = textarea;
            
            const lines = value.split("\n");
            const startLine = value.substring(0, selectionStart).split("\n").length - 1;
            const endLine = value.substring(0, selectionEnd).split("\n").length - 1;

            const newLines = [...lines];
            const selectedLines = newLines.slice(startLine, endLine + 1);
            newLines.splice(endLine + 1, 0, ...selectedLines);

            const newValue = newLines.join("\n");
            setCode(newValue);
            highLightCodeHandler(newValue);
            saveToLocalHandler(newValue);


            const newSelectionStart = selectionStart + selectedLines.join("\n").length + 1;
            const newSelectionEnd = selectionEnd + selectedLines.join("\n").length + 1;
            requestAnimationFrame(() => {
                textarea.selectionStart = newSelectionStart;
                textarea.selectionEnd = newSelectionEnd;
            });
        }
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
            const lang = loadLanguageHandler(activeTab?.name || "");
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
                            className="w-full h-[92vh] absolute top-0 left-0 text-transparent caret-white whitespace-pre resize-none focus:outline-0 selection:bg-blue-600 selection:text-white
                            bg-transparent outline-none z-10 font-mono text-[16px] leading-6 overflow-x-auto custom-scrollbar" 
                            spellCheck={false}
                            onChange={(e)=>{changeCodeHandler(e)}} 
                            onKeyDown={(e)=>{keyDownHandler(e)}}
                            value={code || ""}>
                    </textarea>
                    <pre ref={preRef} className="w-full h-[92vh] overflow-auto text-[16px] leading-6 font-mono text-white whitespace-pre overflow-x-auto custom-scrollbar" dangerouslySetInnerHTML={{ __html: highlightedCode }}/>
                </section>
            </div>
        </>
    )
}