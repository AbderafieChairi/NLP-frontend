import React, { useRef, useState } from 'react';
// import '../../App.css';
import "./Detail.css"
import { useIntent } from '../../contexts/IntentContext';
import Entity from '../Entity/Entity';
import Editor from '../Editor/Editor';
export default function Detail() {
        const [name, setname] = useState("")
        const [messages, setmessages] = useState([])
        const [responses, setResponses] = useState([])
        const [entity, setEntity] = useState([]) 
        const [code, setCode] = useState("")
        const {nodes,showdetail,updateNode,setShowdetail} = useIntent()
      
        const save=()=>{
          updateNode(showdetail.id,{name,messages,responses,entity,code})
          setShowdetail({id:0,showdetail:0})
        }
        React.useEffect(()=>{
          if(nodes.find(i=>i.id===showdetail.id).data.messages){
            setname(nodes.find(i=>i.id===showdetail.id).data.name)
            setmessages(nodes.find(i=>i.id===showdetail.id).data.messages)
            setResponses(nodes.find(i=>i.id===showdetail.id).data.responses)
            setEntity(nodes.find(i=>i.id===showdetail.id).data.entity)
            setCode(nodes.find(i=>i.id===showdetail.id).data.code)
          }
        },[])
        return (
        <div className='intent-d'>
            <div className='detail-h'>
              <h1>Node Detail</h1>
              <button onClick={save}>save</button>
            </div>
            <h2 className='subtitle'>Intent Name 1</h2>
            <div className='input-list'>
              <input type='name' className='name-inp' value={name} onChange={e=>setname(e.target.value)}/>
            </div>
            <h2 className='subtitle'>Training phrases</h2>
            <ListMessages value={messages} setValue={setmessages}/>      
            <h2 className='subtitle'>Responses</h2>
            <ListMessages value={responses} setValue={setResponses}/>    
            <h2 className='subtitle'>Entities</h2>
            <Entity entity={entity} setEntity={setEntity}/> 
            <h2 className='subtitle'>Code</h2>
            <div className='test'>
            <Editor
                language="javascript"
                displayName="JS"
                value={code}
                onChange={setCode}
              />
            </div>

        </div>
      );
}

      
function ListMessages({value,setValue}){
  const [v, setV] = useState("")
  return(
    <div className='input-list'>
      <input type='text' value={v}  className='messages'
      onChange={e=>setV(e.target.value)} onKeyDown={e=>{
        if(e.key === 'Enter'){
          setValue([...value,v])
          setV("")
        }
      }}/>
      {value.map((item,index)=>{
        return(
            <input className='messages' key={index} value={item} 
            onChange={e=>{
              setValue(value.map((i,k)=>{
                return k===index?e.target.value:i
              }))
            }}/>
        )
      })}
    </div>
  )
}




