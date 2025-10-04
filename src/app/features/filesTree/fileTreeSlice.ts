// ** Hooks && Tools
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// ** Data
import { fileTreeData } from '../../../data/data';
// ** Interfaces
import type { IFileTree } from '../../../interfaces';

interface FileTreeState {
    tree: IFileTree;
    newNode: {parentId: string, isFolder: boolean, rename?: boolean} | null;
}

const initialState: FileTreeState = {
    tree: fileTreeData,
    newNode: null
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
        },
        deleteNode: (state, action: PayloadAction<{ id: string }>) => {
            const deleteRecursively = (nodes: IFileTree[]): IFileTree[] => {
                return nodes.filter(n => n.id !== action.payload.id).map(n => ({
                ...n,
                children: n.children ? deleteRecursively(n.children) : []
                }));
            }
            state.tree.children  = deleteRecursively(state.tree.children ?? []);
        },
        setNewNode: (state, action: PayloadAction<{parentId: string, isFolder: boolean, rename: boolean} | null>)=> {
            state.newNode = action.payload;
        }
    },
})

export const { addFile, addFolder, renameNode, deleteNode, setNewNode } = fileTreeSlice.actions;



export default fileTreeSlice.reducer