import React from 'react';
import './App.css';
import Flow from './components/Flow/Flow';
import { useChat } from './contexts/ChatContext';
import Chat from './components/Chat/Chat';
import Detail from './components/Detail/Detail';
import { useFlow } from './contexts/FlowContext';
import { saveAs } from 'file-saver';
const details={
  intentNode:(id)=><Detail id={id}/>,
}

function App() {


  const {nodes} = useFlow();
  const {showChat} = useChat(); 
  return (
    <div className="App"
    >
      <Flow />
      {nodes.filter(i=>i.data.detail===true).map(i=>details[i.type](i.id))[0]}
      <Dash/>
      {showChat&&<Chat/>}
    </div>
  );
}
//some changes
export default App;


export function Dash(){
  const {edges,parserNodes,initNodes,nodes,importJson} = useFlow()
  const {setShowChat} =  useChat()

  const save=()=>{
    const data = {
      nodes: nodes,
      edges: edges,
      parserNodes: parserNodes
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'data.json');
  }
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      const parsedData = JSON.parse(content);
      importJson(parsedData);
      // setData(parsedData);
    };

    reader.readAsText(file);
  };


  return (
    <div className='intent-dash' style={{top:10,left:10}}>
      <button onClick={save}>export</button>
      <button >
      <label htmlFor="file">import </label>
      <input id='file' 
        type="file" 
        onChange={handleFileSelect} 
        accept=".json"
        style={{display:"none"}}
      />
      </button>
      <button onClick={()=>initNodes()}>clear</button>
      <button onClick={()=>setShowChat(e=>!e)}>chat</button>
      {/* <button onClick={()=>parse()}>chat</button> */}
    </div>
  )
}


