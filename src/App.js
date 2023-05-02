import React, { useState } from 'react';
import './App.css';

function App() {
  const [inp, setInp] = useState("do you have a phone ?")
  const [varName, setVarName] = useState("")
  return (
    <div className="App">
      <input value={inp} onChange={(e) => setInp(e.target.value)} />
      <div>variable name</div>
      <input value={varName} onChange={(e) => setVarName(e.target.value)} />
    </div>
  );
}
//some changes
export default App;


