import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.tsx'
import './App.css'
import {countAtom} from "./atoms/Count.tsx";
import { useAtom } from 'jotai'


function App() {
    const [count, setCount] = useAtom(countAtom)

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={appLogo} className="logo" alt="pomotico logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>pomotico</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <PWABadge/>
        </>
    )
}

export default App
