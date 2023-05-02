import React, { useState } from 'react';
import './App.css';
import Flow from './Drag/Drag';
import { useIntent } from './contexts/IntentContext';
import Detail from './Detail';
import {db} from './config/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useApp } from './contexts/AppContext';
import Chat from './components/Chat/Chat';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import Editor from './Editor';
import Entity from './components/entities/Entity';
function App() {
  const {showdetail,addNode} = useIntent();
  const {showChat} = useApp(); 
  const [code, setCode] = useState("") 
  React.useEffect(()=>{
    console.log("new feature")
  },[])
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
      {/* <Entity/> */}


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


