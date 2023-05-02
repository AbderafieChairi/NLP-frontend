import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import "./Node.css"
import { useIntent } from '../contexts/IntentContext';

const startColor = {backgroundColor:'#c2410c'}
const startBorder = {borderColor:'#c2410c'}
const nodeColor = {backgroundColor:'#00d3f2'}
const nodeBorder = {borderColor:'#00d3f2'}


export default function IntentNode({ data }) {
  return (
    <div style={{display:'block'}}>
      <div className='node'  style={data.start?startBorder:nodeBorder}>
        <div className='node-header' style={data.start?startColor:nodeColor}>
            {data.name}
        </div>
        <div className='node-content'>
          {data.messages?.length&&<div>questions ({data.messages.length})</div>}
          {data.responses?.length&&<div>responses ({data.responses.length})</div>}
        </div>    
      </div>
      {!data.start&&<Handle type="target" position={Position.Left} id="b" style={{top:45}}>
          <div className='point point-in'></div>
        </Handle>}
      <Handle type="source" position={Position.Right} id="b" style={{top:45}}>
        <div className='point point-out'></div>
      </Handle>
    </div>
  );
}


