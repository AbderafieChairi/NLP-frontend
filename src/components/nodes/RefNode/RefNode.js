import React, { useState } from 'react'
import './BankNode.css'
import { Handle, Position } from 'reactflow'
import { useFlow } from '../../../contexts/FlowContext'
export default function RefNode({data}) {
  const {nodes} = useFlow()
  const [value, setValue] = useState(nodes[0].name)
  React.useEffect(()=>{
    updateNode(data.id,{value:value})
  },[value])
  return ( 
      <div className='bankIntent b-in'>
          <select value={value} onChange={e=>setValue(e.target.value)} className='var-select'>
              {nodes.map((i,k)=><option value={i.name} key={k}>{i.name}</option>)}
          </select>
          <Handle type="target" position={Position.Left} id="e" style={{top:20}}>
            <div className='point point-in'></div>
          </Handle>
      </div>
    )
  }

    


