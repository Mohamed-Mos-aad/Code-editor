// ** Style
import './App.css'
// ** Hooks && Tools
import { useState } from 'react'
// ** Components
import SideBar from './components/sideBar/SideBar'
import FileTree from './components/fileTree/FileTree'
import CodePage from './components/codePage/CodePage'
// ** Store
import { useAppSelector } from './app/hooks'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'



function App() {
  // ** Store
  const { activeTab } = useAppSelector((state) => state.tabsSlice)
  


  // ** States
  const [fileTreeIsOpen,setFileTreeIsOpen] = useState<boolean>(true);
  const [sizes, setSizes] = useState([20, 80]);


  // ** Handler
  const fileStateToggleHandler = ()=>{
    setFileTreeIsOpen(prev => !prev)
  }


  
  return (
    <>
      <main className="w-full h-screen flex bg-[#1E1E1E] text-white">
        <SideBar fileStateToggleHandler={fileStateToggleHandler}/>
        <PanelGroup direction="horizontal" onLayout={setSizes}>
          { fileTreeIsOpen &&  
            <Panel defaultSize={sizes[0]} minSize={20}>
              <FileTree />
            </Panel>          
          }
          <PanelResizeHandle />
          <Panel defaultSize={fileTreeIsOpen ? sizes[1] : 100} minSize={30}>
          {activeTab ? 
            <CodePage />
            :
            <div className='w-full h-full flex justify-center items-center text-[128px] text-[#252526]'>
              Coding
            </div>
          }  
          </Panel>
        </PanelGroup>
      </main>
    </>
  )
}

export default App