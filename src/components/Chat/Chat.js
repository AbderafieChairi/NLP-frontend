import React, { useState } from 'react'
import "./Chat.css"
import { useIntent } from '../../contexts/IntentContext';
export default function Chat() {
  const {usermsg, setUsermsg,ask,msgs} = useIntent()
  return (
    <div className='chat-container'>
        <div className='chat-header'>chat</div>
        <div className='chat-main'>
          {msgs.map((item,index)=>{
            return <div key={index} className={item.src==="bot"?'chat-msg':'user-msg'}>
              <div className='msg' style={item.src==="bot"?{backgroundColor:"#eaf8fa"}:{backgroundColor:"#f9e4db"}}>{item.msg}</div>
            </div>
          })}
        </div>
        <input type="text" 
        value={usermsg} 
        onChange={e=>setUsermsg(e.target.value)} 
        className='chat-input'
        onKeyDown={e=>{
          if(e.key === 'Enter'){
            ask()
            // setUsermsg("")
          }
        }}
        />
    </div>
  )
}
