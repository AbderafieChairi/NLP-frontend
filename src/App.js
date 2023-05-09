import React, { useState } from 'react';
import './App.css';
import Flow from './components/Flow/Flow';
import { useChat } from './contexts/ChatContext';
import Chat from './components/Chat/Chat';
import Detail from './components/Detail/Detail';
import { useFlow } from './contexts/FlowContext';

const details={
  intentNode:(id)=><Detail id={id}/>,
}

function App() {


  const {nodes} = useFlow();
  const {showChat} = useChat(); 
  return (
    <div className="App"
    onClick={(e)=>{
      e.preventDefault();
    }}
    >
      <Flow />
      {nodes.filter(i=>i.data.detail==true).map(i=>details[i.type](i.id))[0]}
      <Dash/>
      {showChat&&<Chat/>}


    </div>
  );
}
//some changes
export default App;


export function Dash(){
  const {edges,addNode,parserNodes,initNodes,nodes,parse} = useFlow()
  const {setShowChat} =  useChat()
  return (
    <div className='intent-dash' style={{top:10,left:10}}>
      <button onClick={(e)=>{
        console.log(edges)
      }}>Edges</button>
      <button onClick={()=>initNodes()}>clear</button>
      <button onClick={()=>setShowChat(e=>!e)}>chat</button>
      {/* <button onClick={()=>parse()}>chat</button> */}
      <button onClick={e=>console.log(parserNodes)}>node</button>
    </div>
  )
}


