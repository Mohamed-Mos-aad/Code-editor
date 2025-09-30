export interface IFileTree{
    id: string,
    isFolder: boolean,
    name: string,
    childern?: IFileTree[]
}