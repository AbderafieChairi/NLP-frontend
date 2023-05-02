import React from 'react'
import "./Editable.css"
import { AutoSizeInput } from './AutoSizeInput'
// import ListEntity from './ListEntity'
export default function TrainingPhrase({value,setValue,onKeyDown,...props}) {
    // const [position, setPosition] = useState({x:0,y:0})
    // const [key, setKey] = useState(null)
    // const change=(e,key)=>{
    //     setKey(key)
    //     setPosition({x:e.clientX,y:e.clientY})
    //     const h = window.getSelection().toString()
    //     if (h!=="")
    //     {
    //         setValue(d=>{
    //             const li=[]
    //             for (const key in d) {
    //                 const element = d[key];
    //                 if(element.text.includes(h)){
    //                     const j = element.text.split(h)
    //                     if (j[0]!==''&&j[0]!==' ') li.push({...element,['text']:j[0]})
    //                     li.push({text:h,datatype:'costumed',hasdetail:true})
    //                     if (j[1]!==''&&j[1]!==' ') li.push({...element,['text']:j[1]})
    //                 }else{
    //                     li.push(element)
    //                 }
    //             }
    //             return li
    //         }
    //         );
    //     }else{
    //         return setValue(d=>d.map((i,k)=>key===k?{...i,['hasdetail']:false}:i))
    //     }
    // }
    const setV=(key,value)=>{       
        // eslint-disable-next-line no-useless-computed-key
        setValue(d=>d.map((i,k)=>key===k?value:i))
    }
    // const setType=(value)=>{
    //     setValue(d=>d.map((i,k)=>key===k?{...i,['datatype']:value}:i))
    // }
    // const sethasdetail=(key,value)=>{
    //     setValue(d=>d.map(i=>({...i,['hasdetail']:value})))
    // }
    return (
        <div className='row-input-container' onKeyDown={onKeyDown}>
            {
                value.map((i,k)=>(
                    <AutoSizeInput key={k} value={i.text} 
                        onChange={e=>setV(k,e.target.value)}
                        // onSelect={e=>change(e,k)}
                        className={'row-input'}
                        // style={i.datatype===""?{}:{backgroundColor:'yellow',border:"solid 1px gray",borderRadius:'3px',margin:'0px 2px 0px 0px'}}
                        {...props}
                        />
                ))
            }
            {/* {value.filter(i=>i.hasdetail).length>0 &&<>
                <ListEntity  
                position={position} 
                setType={value=>setType(value)} sethasdetail={value=>sethasdetail(key,value)} 
                />
            </>} */}
        </div>
    )
}
