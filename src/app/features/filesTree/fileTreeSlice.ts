// ** Hooks && Tools
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// ** Local Storage
import { loadAppData, saveAppData } from '../../../utils/localStorageHelper';
// ** Interfaces
import type { IFileTree } from '../../../interfaces';
interface FileTreeState {
    tree: IFileTree;
    newNode: {parentId: string, isFolder: boolean, rename?: boolean} | null;
}




// ** InitialState
const storedTree = loadAppData();
const initialState: FileTreeState = {
    tree: storedTree.fileTree,
    newNode: null,
};



export const fileTreeSlice = createSlice({
    name: 'fileTreeSlice',
    initialState,
    reducers: {
        addFile: (state, action: PayloadAction<{ parentId: string, id:string, name: string }>) => {
            const { parentId, id, name } = action.payload;

            const findNode = (nodes: IFileTree[]): IFileTree | null => {
                for (const node of nodes) {
                if (node.id === parentId) return node;
                if (node.children) {
                    const found = findNode(node.children);
                    if (found) return found;
                }
                }
                return null;
            }

            const parent = action.payload.parentId === state.tree.id 
            ? state.tree 
            : findNode(state.tree.children ?? []);
            if (parent && parent.isFolder) {
                parent.children = parent.children || [];
                parent.children.push({ id, name, isFolder: false });
            }
            saveAppData({ fileTree: state.tree });
        },

        addFolder: (state, action: PayloadAction<{ parentId: string, id:string, name: string }>) => {
            const { parentId, id, name } = action.payload;

            const findNode = (nodes: IFileTree[]): IFileTree | null => {
                for (const node of nodes) {
                if (node.id === parentId) return node;
                if (node.children) {
                    const found = findNode(node.children);
                    if (found) return found;
                }
                }
                return null;
            }

            const parent = action.payload.parentId === state.tree.id 
            ? state.tree 
            : findNode(state.tree.children ?? []);
            if (parent && parent.isFolder) {
                parent.children = parent.children || [];
                parent.children.push({ id, name, isFolder: true, children: [] });
            }
            saveAppData({ fileTree: state.tree });
        },

        renameNode: (state, action: PayloadAction<{ id: string, newName: string }>) => {
            const findNode = (nodes: IFileTree[]): IFileTree | null => {
                for (const node of nodes) {
                    if (node.id === action.payload.id) return node;
                    if (node.children) {
                        const found = findNode(node.children);
                        if (found) return found;
                    }
                }
                return null;
            }

            const node = findNode(state.tree.children ?? []);
            if (node && action.payload.newName !== '') {
                node.name = action.payload.newName;
            }
            if (node && action.payload.newName !== '') node.name = action.payload.newName;
            saveAppData({ fileTree: state.tree });
        },

        deleteNode: (state, action: PayloadAction<{ id: string }>) => {
            const deleteRecursively = (nodes: IFileTree[]): IFileTree[] => {
                return nodes.filter(n => n.id !== action.payload.id).map(n => ({
                ...n,
                children: n.children ? deleteRecursively(n.children) : []
                }));
            }
            state.tree.children  = deleteRecursively(state.tree.children ?? []);
            saveAppData({ fileTree: state.tree });
        },
        setNewNode: (state, action: PayloadAction<{parentId: string, isFolder: boolean, rename: boolean} | null>)=> {
            state.newNode = action.payload;
        },
        updateFileContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
            const findNode = (nodes: IFileTree[]): IFileTree | null => {
                for (const node of nodes) {
                    if (node.id === action.payload.id) return node;
                    if (node.children) {
                        const found = findNode(node.children);
                        if (found) return found;
                    }
                }
                return null;
            };

            
            if (state.tree.id === action.payload.id && !state.tree.isFolder) {
                state.tree.content = action.payload.content;
                return;
            }

            const node = findNode(state.tree.children ?? []);
            if (node && !node.isFolder) {
                node.content = action.payload.content;
            }
            saveAppData({ fileTree: state.tree });
        },
    },
})

export const { addFile, addFolder, renameNode, deleteNode, setNewNode, updateFileContent } = fileTreeSlice.actions;



export default fileTreeSlice.reducer