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



function App() {
  // ** Store
  const { activeTab } = useAppSelector((state) => state.tabsSlice)
  


  // ** States
  const [fileTreeIsOpen,setFileTreeIsOpen] = useState<boolean>(true);



  // ** Handler
  const fileStateToggleHandler = ()=>{
    setFileTreeIsOpen(prev => !prev)
  }


  
  return (
    <>
      <main className="w-full h-screen flex bg-[#1E1E1E] text-white">
        <SideBar fileStateToggleHandler={fileStateToggleHandler}/>
        { fileTreeIsOpen && <FileTree /> }
        {activeTab ? 
          <CodePage />
          :
          <div className='w-full h-full flex justify-center items-center text-[128px] text-[#252526]'>
            Coding
          </div>
        }  
      </main>
    </>
  )
}

export default App