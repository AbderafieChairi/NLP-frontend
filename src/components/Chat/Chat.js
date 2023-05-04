import React, { useState } from 'react'
import "./Chat.css"
import { useIntent } from '../../contexts/IntentContext';
import Typewriter from 'typewriter-effect';
export default function Chat() {
  const {usermsg, setUsermsg,ask,msgs,loading,addMsg,clearChat} = useIntent()

  return (
    <div className='chat-container'>
        <div className='chat-header'><div>chatbot</div> <div onClick={clearChat} className='clearChat'>clear chat</div></div>
        <div className='chat-main'>
          {msgs.map((item,index)=>{
            return <div key={index} className={item.src==="bot"?'chat-msg':'user-msg'}>
              <div className='msg' style={item.src==="bot"?{backgroundColor:"#eaf8fa"}:{backgroundColor:"#f9e4db"}}>
                {index!==msgs.length-1?
                  item.msg:
                  <Typewriter
                  options={{
                    delay: item.src!=="bot"?30:100,
                    cursor: ""
                  }}
                  onInit={(typewriter) => {
                    typewriter.typeString(item.msg)
                    .callFunction(() => {
                      if(item.src!=="bot") ask()
                    })
                    .start();
                  }}
                />}
              </div>
            </div>
          })}
        </div>
        {loading&&<div className='loading'>loading ...</div>}
        <input type="text" 
        value={usermsg} 
        onChange={e=>setUsermsg(e.target.value)} 
        className='chat-input'
        onKeyDown={e=>{
          if(e.key === 'Enter'){
            addMsg()
            // setUsermsg("")
          }
        }}
        />
    </div>
  )
}
