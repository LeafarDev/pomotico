import { ReactElement } from "react";
import { Card } from "./styles/appStyle.ts";
import { Timer } from "../components/Timer/Timer.tsx";

function App(): ReactElement {
  return (
    <>
      <Card>
        <Timer />
      </Card>
    </>
  );
}

export default App;
