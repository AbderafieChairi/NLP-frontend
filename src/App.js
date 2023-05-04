import React, { useState } from 'react';
import './App.css';
import Flow from './components/Flow/Flow';
import { useIntent } from './contexts/IntentContext';
import { useApp } from './contexts/AppContext';
import Chat from './components/Chat/Chat';
import Detail from './components/Detail/Detail';
import SwitchDetail from './components/SwitchDetail/SwitchDetail';
function App() {


  const {showdetail,addNode,showSwitch} = useIntent();
  const {showChat} = useApp(); 
  return (
    <div className="App"
    onClick={(e)=>{
      e.preventDefault();
    }}
    >
      <Flow />
      {showdetail.showdetail&&<Detail/>}
      {showSwitch.showdetail&&<SwitchDetail/>}
      <Dash/>
      {showChat&&<Chat/>}


    </div>
  );
}
//some changes
export default App;


export function Dash(){
  const {edges,addNode,menuPosition,initNodes,nodes,bankIntent} = useIntent()
  const {setShowChat} =  useApp()
  return (
    <div className='intent-dash' style={{top:menuPosition.y,left:menuPosition.x}}>
      <button onClick={(e)=>{
        console.log(edges)
      }}>Edges</button>
      <button onClick={()=>initNodes()}>clear</button>
      <button onClick={()=>setShowChat(e=>!e)}>chat</button>
      <button onClick={e=>console.log(nodes)}>nodes</button>
    </div>
  )
}


