// ** Hooks && Tools
import { v4 as uuid } from "uuid";
// ** Interfaces
import type { IFileTree } from "../interfaces";



// ** FileTree
export const fileTreeData:IFileTree[] = [
    {
        id: uuid(),
        isFolder: true,
        name: "app",
        childern: [
            {
                id: uuid(),
                isFolder: false,
                name: "main.jsx"
            }
        ]
    },
    {
        id: uuid(),
        isFolder: false,
        name: "index.html",
    },
    {
        id: uuid(),
        isFolder: true,
        name: "style",
        childern: [
            {
                id: uuid(),
                isFolder: false,
                name: "style.css"
            }
        ]
    },
    {
        id: uuid(),
        isFolder: false,
        name: "function.js",
    }
]