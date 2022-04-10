import { useEffect } from "react";
import { useStableStateExtra } from "react-stable-state";
import "./App.css";

const App = () => {
  const {
    state: value,
    stableState: stableValue,
    setState: setValue,
    isEditing,
    delay,
    setDelay,
  } = useStableStateExtra<string>({
    initialState: localStorage.getItem("key") || "",
  });

  useEffect(() => {
    console.log("stable value has changed!");
    localStorage.setItem("key", stableValue);
  }, [stableValue]);

  return (
    <div className="App" id="app">
      <h1>react-stable-state demo</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "5px",
        }}
      >
        <div>
          value<br></br>
          <textarea
            id="text-input"
            value={value}
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
          ></textarea>
        </div>

        <div>
          stableValue<br></br>
          <textarea id="text-input" value={stableValue} readOnly></textarea>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "5px",
        }}
      >
        <div className={`circle ${isEditing ? "editing" : "synced"}`}></div>
        <div style={{ float: "left" }}>
          {isEditing ? "editing..." : "synced"}
        </div>
      </div>
      delay:
      <label htmlFor="delay">
        {delay / 1000} second{delay != 1000 && "s"}
      </label>
      <br></br>
      <input
        name="delay"
        type="range"
        value={delay}
        min="0"
        max="10000"
        step="100"
        onChange={(e) => {
          e.preventDefault();
          setDelay(e.target.valueAsNumber);
        }}
      ></input>
    </div>
  );
};
export default App;
