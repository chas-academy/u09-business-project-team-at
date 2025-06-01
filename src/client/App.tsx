import "./App.css";

import Button from "./components/common/button";

function App() {
  return (
    <div className="gap-2 flex ">
      <Button variant="primary">Primary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="transparent">Transparent</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}

export default App;
