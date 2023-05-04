import React, { useState } from 'react'
import './BankNode.css'
import { Handle, Position } from 'reactflow'
import { useIntent } from '../../../contexts/IntentContext'
export default function BankNode({data}) {
  const {bankIntent,updateNode} = useIntent();
  const [value, setValue] = useState(bankIntent[0].name)
  React.useEffect(()=>{
    updateNode(data.id,{value:value})
  },[value])
  return (
      <div className='bankIntent b-in'>
          <select value={value} onChange={e=>setValue(e.target.value)} className='var-select'>
              {bankIntent.map((i,k)=><option value={i.name} key={k}>{i.name}</option>)}
          </select>
          <Handle type="target" position={Position.Left} id="e" style={{top:20}}>
            <div className='point point-in'></div>
          </Handle>
      </div>
    )
  }
export function BankNodeOut({data}) {
  const {bankIntent,updateNode} = useIntent();
  const [value, setValue] = useState(bankIntent[0].name)
  React.useEffect(()=>{
    updateNode(data.id,{value:value})
  },[value])
    return (
      <div className='bankIntent b-out'>
          <select value={value} onChange={e=>setValue(e.target.value)}  className='var-select'>
              {bankIntent.map((i,k)=><option value={i.name} key={k}>{i.name}</option>)}
          </select>
          <Handle type="source" position={Position.Right} id="f" style={{top:20}}>
            <div className='point point-out'></div>
          </Handle>
      </div>
    )
  }
    