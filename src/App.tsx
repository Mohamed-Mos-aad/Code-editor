// ** Style
import './App.css'
// ** Hooks && Tools
import { useEffect, useState } from 'react'
// ** Components
import SideBar from './components/sideBar/SideBar'
import FileTree from './components/fileTree/FileTree'
import CodePage from './components/codePage/CodePage'
import ContextMenu from './components/contectMenu/ContextMenu'
// ** Store
import { useAppSelector } from './app/hooks'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import Search from './components/search/Search'
// ** Local Storage
import { loadAppData, saveAppData } from './utils/localStorageHelper'



function App() {
  // ** Store
  const { activeTab } = useAppSelector((state) => state.tabsSlice)
  const { visible } = useAppSelector((state) => state.contextMenuSlice)
  


  // ** Local Storage
  const { panelsSizes } = loadAppData()


  // ** States
  const [sideSectionIsOpen,setSideSectionIsOpen] = useState<boolean>(true);
  const [sizes, setSizes] = useState(panelsSizes ? [...panelsSizes] : [20,80]);
  const [sideSection, setSideSection] = useState(<FileTree />);
  const [lastSection, setLastSection] = useState<string>('fileTree');


  
  // ** Handler
  const sideSectionStateToggleHandler = (currentSection: string)=>{
    if(currentSection === lastSection)
    {
      setSideSectionIsOpen(prev => !prev)
    }
  }
  const openFileTreeSideSectionHandler = ()=>{
    sideSectionStateToggleHandler('fileTree');
    setLastSection('fileTree')
    setSideSection(<FileTree />)
  }
  const openSearchSideSectionHandler = ()=>{
    sideSectionStateToggleHandler('search');
    setLastSection('search')
    setSideSection(<Search />)
  }


  
  // ** UseEffect
  useEffect(()=>{
    if(sideSectionIsOpen){
      setSizes([20,80])
    }
  },[sideSectionIsOpen])
  useEffect(() => {
    saveAppData({ panelsSizes: sizes });
  }, [sizes]);

  
  return (
    <>
      <main className="w-full h-screen flex flex-col bg-[#1E1E1E] text-white">
        <div className='w-full flex-1 flex'>
          {
            visible && <ContextMenu />
          }
          <SideBar openFileTreeSideSectionHandler={openFileTreeSideSectionHandler} openSearchSideSectionHandler={openSearchSideSectionHandler}/>
          <PanelGroup direction="horizontal" autoSaveId="conditional" onLayout={(newSizes) => setSizes(newSizes)} className="h-full">
            { sideSectionIsOpen &&  
              (
                <>
                  <Panel defaultSize={sizes[0]} minSize={20} order={1}>
                    {sideSection}
                  </Panel>          
                  <PanelResizeHandle />
                </>
              )
            }
            <Panel defaultSize={sideSectionIsOpen ? sizes[1] : 100} minSize={30} order={2}>
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