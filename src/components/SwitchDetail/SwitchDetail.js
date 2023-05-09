import React, { useRef, useState } from 'react';
// import '../../App.css';
import "./SwitchDetail.css"
import { useIntent } from '../../contexts/IntentContext';
import Editor from '../Editor/Editor';
export default function SwitchDetail() {

        // const {updateNode,setShowdetail}
        const [code, setCode] = useState("")
        // const {setShowSwitch,updateNode,showSwitch,nodes} = useIntent()
      
        const save=()=>{
          // updateNode(showSwitch.id,{code})
          // setShowSwitch({id:0,showdetail:0})
        }
        // React.useEffect(()=>{
        //   if(nodes.find(i=>i.id===showSwitch.id)){
        // //     // setname(nodes.find(i=>i.id===showSwitch.id).data.name)
        // //     // setmessages(nodes.find(i=>i.id===showSwitch.id).data.messages)
        // //     // setResponses(nodes.find(i=>i.id===showSwitch.id).data.responses)
        // //     // setEntity(nodes.find(i=>i.id===showSwitch.id).data.entity)
        //     setCode(nodes.find(i=>i.id===showSwitch.id).data.code)
        //   }
        // },[])
        return (
        <div className='intent-d'>
            <div className='detail-h'>
              <h1>Switch Detail</h1>
              <button onClick={save}>save</button>
            </div>
            <h2 className='subtitle'>Code</h2>
            <div className='test'>
            <Editor
                language="javascript"
                displayName="JS"
                value={code}
                onChange={setCode}
              />
            </div>

        </div>
      );
}

      




