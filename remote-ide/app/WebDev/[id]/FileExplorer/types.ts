
export type FileTree = {
    id: string,
    name: string,
    type: "Folder" | "File"
    children: FileTree[] 
    code: string | null
}

export const Folder_Example = {
    id: "root",
    name: "react_project",
    type: "Folder",
    children: [
        {
            id: "public",
            name: "public",
            type: "Folder",
            children: [
                {
                    id: "index.html",
                    name: "index.html",
                    type: "File",
                    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My React App</title>
    <link rel="icon" href="favicon.ico">
</head>
<body>
    <div id="root"></div>
</body>
</html>`
                }
            ]
        },
        {
            id: "src",
            name: "src",
            type: "Folder",
            children: [
                {
                    id: "components",
                    name: "components",
                    type: "Folder",
                    children: [
                        {
                            id: "Header.jsx",
                            name: "Header.jsx",
                            type: "File",
                            code: `import React from 'react';

const Header = () => {
    return (
        <header style={{ backgroundColor: "#282c34", padding: "20px", color: "#fff", textAlign: "center" }}>
            <h1>My React App</h1>
        </header>
    );
};

export default Header;`
                        },
                        {
                            id: "Footer.jsx",
                            name: "Footer.jsx",
                            type: "File",
                            code: `import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#282c34", padding: "10px", color: "#fff", textAlign: "center", position: "fixed", bottom: "0", width: "100%" }}>
            <p>&copy; {new Date().getFullYear()} My React App</p>
        </footer>
    );
};

export default Footer;`
                        }
                    ]
                },
                {
                    id: "pages",
                    name: "pages",
                    type: "Folder",
                    children: [
                        {
                            id: "Home.jsx",
                            name: "Home.jsx",
                            type: "File",
                            code: `import React from 'react';

const Home = () => {
    const [likes, setLikes] = React.useState(0);

    return (
        <div style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px", textAlign: "center", width: "250px", margin: "auto" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#000" }}>
                {likes}
            </p>
            <button
                style={{ backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", padding: "10px 20px", cursor: "pointer", fontSize: "16px" }}
                onClick={() => setLikes(likes + 2)}
            >
                Like
            </button>
        </div>
    );
};

export default Home;`
                        },
                        {
                            id: "About.jsx",
                            name: "About.jsx",
                            type: "File",
                            code: `import React from 'react';

const About = () => {
    return (
        <div style={{ backgroundColor: "#fafafa", padding: "20px", borderRadius: "10px", textAlign: "center", width: "250px", margin: "auto" }}>
            <h2>About</h2>
            <p>This is a simple React app using inline styling.</p>
        </div>
    );
};

export default About;`
                        }
                    ]
                },
                {
                    id: "App.jsx",
                    name: "App.jsx",
                    type: "File",
                    code: `import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';

const App = () => {
    return (
        <div>
            <Header />
            <main style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "20px" }}>
                <Home />
                <About />
            </main>
            <Footer />
        </div>
    );
};

export default App;`
                },
                {
                    id: "index.js",
                    name: "index.js",
                    type: "File",
                    code: `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));`
                }
            ]
        },
        {
            id: "package.json",
            name: "package.json",
            type: "File",
            code: `{
  "name": "react_project",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}`
        },
        {
            id: ".gitignore",
            name: ".gitignore",
            type: "File",
            code: `node_modules/
build/
.env
.DS_Store`
        },
        {
            id: "README.md",
            name: "README.md",
            type: "File",
            code: `# My React App

This is a simple React application showcasing basic usage of components and pages.

## Setup

1. Clone this repository.
2. Install dependencies using \`npm install\`.
3. Start the development server with \`npm start\`.

## Structure

- \`public/\`: Static files for the web application.
- \`src/\`: Source code for React components and pages.
  - \`components/\`: Reusable UI components.
  - \`pages/\`: Top-level pages of the application.
  - \`App.jsx\`: Main component integrating all pages and components.
  - \`index.js\`: Entry point to render the React app.`
        }
    ]
};
