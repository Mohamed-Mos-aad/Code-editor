// ** Hooks && Tools
import { v4 as uuid } from "uuid";
// ** Interfaces
import type { IFileTree } from "../interfaces";



// ** FileTree
export const fileTreeData: IFileTree[] = [
    {
        id: uuid(),
        isFolder: true,
        name: "app",
        children: [
        {
            id: uuid(),
            isFolder: false,
            name: "main.jsx",
            content: `import React from "react";
    import AppHeader from "./components/AppHeader";
    import { fetchTodos } from "../utils/api";

    export default function Main() {
    const [todos, setTodos] = React.useState([]);

    React.useEffect(() => {
        fetchTodos().then(setTodos);
    }, []);

    return (
        <div>
        <AppHeader title="My Test App" />
        <ul>
            {todos.map(t => <li key={t.id}>{t.title}</li>)}
        </ul>
        </div>
    );
    }`
        },
        {
            id: uuid(),
            isFolder: true,
            name: "components",
            children: [
            {
                id: uuid(),
                isFolder: false,
                name: "AppHeader.jsx",
                content: `import React from "react";

    export default function AppHeader({ title }) {
    return (
        <header style={{ padding: 12, borderBottom: "1px solid #333" }}>
        <h1>{title}</h1>
        </header>
    );
    }`
            },
            ],
        },
        ],
    },
    {
        id: uuid(),
        isFolder: false,
        name: "index.html",
        content: `<!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Test Project</title>
    <link rel="stylesheet" href="./style/style.css" />
    </head>
    <body>
    <div id="root"></div>
    <script type="module" src="./app/main.jsx"></script>
    </body>
    </html>`
    },
    {
        id: uuid(),
        isFolder: true,
        name: "style",
        children: [
        {
            id: uuid(),
            isFolder: false,
            name: "style.css",
            content: `:root {
    --bg: #1e1e1e;
    --text: #e6e6e6;
    --accent: #5ea6ff;
    }

    body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: "Inter", monospace;
    }

    header h1 {
    margin: 0;
    color: var(--accent);
    }`
        },
        ],
    },
    {
        id: uuid(),
        isFolder: true,
        name: "utils",
        children: [
        {
            id: uuid(),
            isFolder: false,
            name: "api.js",
            content: `import { v4 as uuid } from "uuid";

    export async function fetchTodos() {
    // fake API for testing
    return new Promise(resolve =>
        setTimeout(
        () =>
            resolve([
            { id: uuid(), title: "Todo 1" },
            { id: uuid(), title: "Todo 2" }
            ]),
        300
        )
    );
    }`
        },
        ],
    },
    {
        id: uuid(),
        isFolder: false,
        name: "function.js",
        content: `// small helper used in tests
    export const add = (a, b) => a + b;

    export function capitalize(s) {
    if (!s) return "";
    return s[0].toUpperCase() + s.slice(1);
    }`
    },
    {
        id: uuid(),
        isFolder: false,
        name: "README.md",
        content: `# Test Project

    This is a small test repo structure used for UI/editor testing.

    - /app: React entrypoint + components
    - /utils: helper modules
    - /style: css files

    Run: (no real build) just used for playground/testing.`
    },
];