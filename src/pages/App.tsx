import { ReactElement } from "react";
import PWABadge from "../PWABadge.tsx";
import { Card } from "./styles/appStyle.ts";
import { Timer } from "../components/Timer/Timer.tsx";

function App(): ReactElement {
  return (
    <>
      <Card>
        <Timer />
      </Card>
      <PWABadge />
    </>
  );
}

export default App;
