// ** Hooks && Tools
import { v4 as uuid } from "uuid";
// ** Interfaces
import type { IFileTree } from "../interfaces";

// ** FileTree
export const fileTreeData: IFileTree = {
    id: "main",
    isFolder: true,
    name: "Project Name",
    children: [
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
                {
                id: uuid(),
                isFolder: false,
                name: "AppFooter.jsx",
                content: `import React from "react";

    export default function AppFooter() {
    return (
        <footer style={{ padding: 12, borderTop: "1px solid #333" }}>
        <p>© 2025 My Test App</p>
        </footer>
    );
    }`
                }
            ]
            },
            {
            id: uuid(),
            isFolder: true,
            name: "pages",
            children: [
                {
                id: uuid(),
                isFolder: false,
                name: "Home.jsx",
                content: `import React from "react";

    export default function Home() {
    return <h2>Welcome to Home Page</h2>;
    }`
                },
                {
                id: uuid(),
                isFolder: false,
                name: "About.jsx",
                content: `import React from "react";

    export default function About() {
    return <h2>About Us</h2>;
    }`
                }
            ]
            }
        ]
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
    }

    footer p {
    color: var(--text);
    font-size: 12px;
    text-align: center;
    }`
            }
        ]
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
    return new Promise(resolve =>
        setTimeout(
        () =>
            resolve([
            { id: uuid(), title: "Todo 1" },
            { id: uuid(), title: "Todo 2" },
            { id: uuid(), title: "Todo 3" }
            ]),
        300
        )
    );
    }`
            },
            {
            id: uuid(),
            isFolder: false,
            name: "helpers.js",
            content: `export function add(a, b) {
    return a + b;
    }

    export function capitalize(str) {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
    }`
            }
        ]
        },
        {
        id: uuid(),
        isFolder: false,
        name: "README.md",
        content: `# Test Project

    This is a test repo structure for UI/editor testing.

    - /app: React entrypoint + components
    - /app/pages: additional pages
    - /utils: helper modules
    - /style: css files

    Run: (no real build) just used for playground/testing.`
        }
    ]
};