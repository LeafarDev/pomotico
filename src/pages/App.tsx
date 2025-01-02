import { useAtom } from "jotai";
import appLogo from "../assets/favicon.svg";
import reactLogo from "../assets/react.svg";
import { countAtom } from "../atoms/Count.tsx";
import PWABadge from "../PWABadge.tsx";
import {
  Card,
  CountButton,
  Logo,
  ReadTheDocs,
  StyledLink,
} from "./styles/appStyle.ts";

function App() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <>
      <div>
        <StyledLink href="https://vitejs.dev" target="_blank">
          <Logo src={appLogo} alt="pomotico logo" />
        </StyledLink>
        <StyledLink href="https://react.dev" target="_blank">
          <Logo
            className="react"
            src={reactLogo}
            prefersreducedmotion={"no-preference"}
            alt="React logo"
          />
        </StyledLink>
      </div>
      <h1>pomotico</h1>
      <Card>
        <CountButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </CountButton>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <ReadTheDocs>Click on the Vite and React logos to learn more</ReadTheDocs>
      <PWABadge />
    </>
  );
}

export default App;
