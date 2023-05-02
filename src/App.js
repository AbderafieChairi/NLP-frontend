import React, { useState } from 'react';
import './App.css';
import Flow from './components/Flow/Flow';
import { useIntent } from './contexts/IntentContext';
import { useApp } from './contexts/AppContext';
import Chat from './components/Chat/Chat';
import Detail from './components/Detail/Detail';
function App() {


  const {showdetail,addNode} = useIntent();
  const {showChat} = useApp(); 
  const [code, setCode] = useState("") 
  return (
    <div className="App"
    onClick={(e)=>{
      e.preventDefault();
    }}
    >
      <Flow />
      {showdetail.showdetail&&<Detail/>}
      <Dash/>
      {showChat&&<Chat/>}


    </div>
  );
}
//some changes
export default App;


export function Dash(){
  const {addNode,menuPosition,initNodes} = useIntent()
  const {setShowChat} =  useApp()
  return (
    <div className='intent-dash' style={{top:menuPosition.y,left:menuPosition.x}}>
      <button onClick={(e)=>{
        e.preventDefault();
        // addNode(e.clientX,e.clientY)
      }}>add Intent</button>
      <button onClick={()=>initNodes()}>clear</button>
      <button onClick={()=>setShowChat(e=>!e)}>chat</button>
      <button >entities</button>
    </div>
  )
}


