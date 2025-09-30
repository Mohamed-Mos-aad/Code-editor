// ** Style
import './App.css'
// ** Components
import SideBar from './components/sideBar/SideBar'
import FileTree from './components/fileTree/FileTree'
import CodePage from './components/codePage/CodePage'



function App() {
  return (
    <>
      <main className="w-full h-screen flex bg-[#1E1E1E] text-white">
        <SideBar />
        <FileTree />
        <CodePage />
      </main>
    </>
  )
}

export default App