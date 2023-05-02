import React, { useState } from 'react';
import './Entity.css'

const prebuildList={
  "NOUN":"noun",
  "NUM":"Numeric",
  "ADJ":"Adjectif"
}

function Entity() {
//   const [inp, setInp] = useState("do you have a phone ?")
  const [varName, setVarName] = useState("")//this
  const [pattern, setPattern] = useState('word-list')//this
  const [wordList, setWordList] = useState(["",""])//this
  const [regex, setRegex] = useState('')//this
  const [prebuild, setPrebuild] = useState('NOUN')//this
  const [output, setOutput] = useState([])//this
  const [saved, setSaved] = useState(false)
  const onChange=(key,value)=>{
    const u = wordList.map((item,k)=>k===key?value:item)
    if (u?.at(-1)!=="")
    u.push('')
    setWordList(u)
  }
  const save=()=>{
    if (pattern==='word-list')
    setOutput([{"LEMMA": {"IN": wordList.slice(0,-1)}}])
    else if (pattern==='regex')
    setOutput([{"TEXT": {"REGEX": regex}}])
    else if (pattern==='prebuild')
    setOutput([{"POS": prebuild}])
    setSaved(true)
  }

//   const send=()=>{
//     fetch('http://127.0.0.1:5000/test',{
//       method:'POST',
//       headers:{
//         'Content-Type':'application/json'
//       },
//       body:JSON.stringify({
//         msg:inp,
//         pattern:output,
//         var_name:varName
//       })
//     })
//     .then(res=>res.json())
//     .then(json=>console.log(json))    
//   }


  React.useEffect(()=>console.log(output),[output])


  return (
    saved==false?<div>
      {/* <input value={inp} onChange={(e) => setInp(e.target.value)} /> */}
      <div className='pattern-list'>
        <div className='pattern-item'>
          <div>var name</div>
          <input value={varName} onChange={(e) => setVarName(e.target.value)} />
          <div>Pattern</div>
          <select value={pattern} onChange={(e) => setPattern(e.target.value)} className='select'>
            <option value="word-list">Word list</option>
            <option value="regex">Régular Expression</option>
            <option value="prebuild">PreBuild</option>
          </select>
        </div>
        {pattern==="word-list"&&<div className='word-list-conatiner'>
          <div className='word-list-header'>wordList</div>
          <div className='word-list'>
            {wordList.map((item, index) => (
              <input key={index} 
              value={item} 
              onChange={(e) => onChange(index,e.target.value)} 
              className='inp'
              placeholder='write here ...'
              onKeyUpCapture={(e)=>{
                //backspace
                if(e.key==='Backspace'){
                  if(index!==wordList.length-1){
                    if (item==""){
                      setWordList(wordList.filter((item,k)=>k!==index))
                    }
                  }
                }
              }}
              />
            ))}
          </div>
        </div>}

        {pattern==="regex"&&<div className='regex-container'>
              <div className='regex-header'>Régular Expression</div>
              <input value={regex} onChange={(e) => setRegex(e.target.value)} style={{width:"80%"}}/>
        </div>}
        {pattern==="prebuild"&&<div className='prebuild-container'>
              <div className='prebuild-header'>Prebuild Entity</div>
              <select className='select' value={prebuild} onChange={e=>setPrebuild(e.target.value)}>
                {
                  Object.keys(prebuildList).map((item,index)=>(
                    <option key={index} value={item}>{prebuildList[item]}</option>
                  ))
                }
              </select>

        </div>}
        
        <div className='btns-container'>
          {pattern!=="prebuild"&&<div>save as PreBuild</div>}
          <div onClick={save}>save</div>
        </div>
      </div>
      {/* <button onClick={send}>Send</button> */}
    </div>:
    <div className='varname-saved'>
        <div>{varName}</div>
        <div onClick={()=>setSaved(false)} className='varname-edit'>Edit</div>
    </div>
  );
}
export default Entity;
