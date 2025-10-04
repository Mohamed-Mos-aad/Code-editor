// ** Data
import { logoMap } from "../../constant";

// ** Interface
interface IFileLogo{
    isFolder: boolean,
    isOpen?: boolean,
    name: string
}


const DEFAULT_ICON = 'file'; 
const DEFAULT_FOLDER_ICON = 'folder-default';
const DEFAULT_FOLDER_OPEN_ICON = 'folder-default-open';



export default function FileLogo({isFolder,isOpen,name}:IFileLogo) {
    // ** States
    let keyToSearch: string;
    if (isFolder) {
        if(isOpen){
            keyToSearch = `folder-${name.toLowerCase()}-open`;
        } else {
            keyToSearch = `folder-${name.toLowerCase()}`;
        }
    } else {
        const parts = name.split(".");
        const extension = parts[parts.length - 1];
        keyToSearch = extension;
    }

    const iconValue = logoMap[keyToSearch] || (isFolder ? (isOpen ? DEFAULT_FOLDER_OPEN_ICON : DEFAULT_FOLDER_ICON) : DEFAULT_ICON);
    const logoIconUrl = `/icons/${iconValue}.svg`;



    return (
        <>
            <img src={logoIconUrl} alt={name} className="w-4"/>
        </>
    )
}