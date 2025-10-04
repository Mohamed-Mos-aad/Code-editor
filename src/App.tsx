// ** Style
import './App.css'
// ** Hooks && Tools
import { useState } from 'react'
// ** Components
import SideBar from './components/sideBar/SideBar'
import FileTree from './components/fileTree/FileTree'
import CodePage from './components/codePage/CodePage'
import ContextMenu from './components/contectMenu/ContextMenu'
// ** Store
import { useAppSelector } from './app/hooks'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'



function App() {
  // ** Store
  const { activeTab } = useAppSelector((state) => state.tabsSlice)
  const { visible } = useAppSelector((state) => state.contextMenuSlice)
  


  // ** States
  const [fileTreeIsOpen,setFileTreeIsOpen] = useState<boolean>(true);
  const [sizes, setSizes] = useState([20, 80]);


  // ** Handler
  const fileStateToggleHandler = ()=>{
    setFileTreeIsOpen(prev => !prev)
  }


  
  return (
    <>
      <main className="w-full h-screen flex flex-col bg-[#1E1E1E] text-white">
        <div className='w-full flex-1 flex'>
          {
            visible && <ContextMenu />
          }
          <SideBar fileStateToggleHandler={fileStateToggleHandler}/>
          <PanelGroup direction="horizontal" onLayout={setSizes} className="h-full">
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
        </div>
        <div className='h-6 flex items-center bg-[#2C7CCC] text-[14px] px-2'>
          saved
        </div>
      </main>
    </>
  )
}

export default App