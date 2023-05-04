import React, { useState } from 'react'
import './SwitchNode.css'
import { Handle, Position } from 'reactflow'
import { useIntent } from '../../../contexts/IntentContext'


export default function SwitchNode({data}) {
  const {bankIntent,updateNode} = useIntent();
  const [value, setValue] = useState(bankIntent[0].name)
  const [outs, setOuts] = useState([
    {
        id:"s-0",
        value:0
    },
    {
        id:"s-1",
        value:1
    },
    {
      id:"s-2",
      value:2
    },
])
  React.useEffect(()=>{
    updateNode(data.id,{value:value})
  },[value])

  return (
      <div className='SwitchNode' style={{height:30*outs.length}}>
          <Handle type="target" position={Position.Left} id="s-i" style={{top:15}}>
            <div className='point point-in'></div>
          </Handle>         
          <Handle type="target" position={Position.Left} id="s-v" style={{top:45}}>
            <div className='point point-in'></div>
          </Handle>         
          {
            outs.map((i,k)=>(
                <Handle type="source" key={k} position={Position.Right} id={i.id} style={{top:30*(k)+15}}>
                <div className='point point-out'></div>
                <div className='switch-value'>{i.value}</div>
                </Handle>
            ))
          }
      </div>
    )
  }
