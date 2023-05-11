import React, { useState } from 'react'
import './BankNode.css'
import { Handle, Position } from 'reactflow'
import { useFlow } from '../../../contexts/FlowContext'
export default function RefNode({data}) {
  const {nodes,updateNode,parserNodes} = useFlow()
  const [value, setValue] = useState(nodes[0].data.name)
  React.useEffect(()=>{
        const node_id = nodes.filter(i=>i.data.name===value)[0].id
        const ref_point = parserNodes.filter(i=>i.node.id===node_id)[0].node.targetPoint[0].id
        updateNode(data.id,{ref:ref_point})
        // console.log(parserNodes);
  },[value,updateNode,nodes,parserNodes,data.id]) 
  return ( 
      <div className='bankIntent b-in'>
          <select value={value} onChange={e=>setValue(e.target.value)} className='var-select'>
              {nodes.map(i=>i.data).map((i,k)=><option value={i.name} key={k}>{i.name}</option>)}
          </select>
          <Handle type="target" position={Position.Left} id="e" style={{top:20}}>
            <div className='point point-in'></div>
          </Handle>
      </div>
    )
  }

    


