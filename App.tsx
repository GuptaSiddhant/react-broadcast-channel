import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useBroadcastState } from "./index";

function App() {
  const [count, setCount] = useBroadcastState<number>("count", 0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
