import { useStableState } from "react-stable-state";

const App = () => {
  const [value, stableValue, setValue] = useStableState<string>({
    initialState: "",
    load: () =>
      fetch("http://localhost:3333/start_of_work").then((resp) => resp.text()),
    onStableStateChanged: () =>
      fetch("http://localhost:3333/start_of_work", {
        method: "POST",
        body: JSON.stringify({ value: stableValue }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(),
  });

  return (
    <div className="App" id="app">
      <input
        type="text"
        id="text-input"
        value={value}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
      ></input>
    </div>
  );
};
export default App;
