import { Handle, Position } from 'reactflow';
import "./IntentNode.css"
import { useFlow } from '../../../contexts/FlowContext';
import React from 'react';


const startColor = {backgroundColor:'#c2410c'}
const startBorder = {borderColor:'#c2410c'}
const nodeColor = {backgroundColor:'#00d3f2'}
const nodeBorder = {borderColor:'#00d3f2'}



export default function IntentNode({ data }) {
  const {nodes,updateNode} = useFlow()
  React.useEffect(()=>{
        const node_data = nodes.filter(i=>i.id===data.id)[0].data
        updateNode(data.id,node_data)
  },[data.id,updateNode,nodes]) 
  return (
    <div style={{display:'block'}}>
      <div className='node'  style={data.start?startBorder:nodeBorder}>
        <div className='node-header' style={data.start?startColor:nodeColor}>
            {data.name?data.name:"new node"}
        </div>
        <div className='node-content' 
        // onClick={()=>console.log(data.entity?.varName)}
        >
          {data.entity?.varName&&<div className='intent-varName'>{data.entity?.varName}</div>}
        </div>    
      </div>
      {!data.start&&
        <>
        <Handle type="target" position={Position.Left} id="a" style={{top:45}}>
          <div className='point point-in'></div>
        </Handle>
        {/* <Handle type="target" position={Position.Left} id="d" style={{top:80}}>
          <div className='point point-in'></div>
        </Handle> */}
      </>  
      }
      <Handle type="source" position={Position.Right} id="b" style={{top:45}}>
        <div className='point point-out'></div>
      </Handle>
      {/* {data.entity?.varName&&<Handle type="source" position={Position.Right} id="c" style={{top:80}}>
        <div className='point point-out'></div>
      </Handle>}   */}
    </div>
  );
}






