export interface IFileTree{
    id: string,
    isFolder: boolean,
    name: string,
    children?: IFileTree[],
    content?: string
}