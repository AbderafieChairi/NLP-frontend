import React, { useContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const IntentContext = React.createContext({});




export function useIntent() {
    return useContext(IntentContext);
}

const initialNodes = [
    { id: 'node-1', type: 'intentNode', position: { x: 200, y: 300 }, data: { name: "starting-point",id: 'node-1',start:true} },
];
const initialEdges = [

];

export default function IntentProvider({ children }) {
    const [id_, setId] = useLocalStorage("id",1)
    const [showdetail, setShowdetail] = useState({id:0,showdetail:false})
    const [nodes, setNodes] = useLocalStorage("nodes",initialNodes)
    const [edges, setEdges] = useLocalStorage("edges",initialEdges)
    const [fp] = useState({x:0,y:0})
    const [menuPosition, setMenuPosition] = useState({x:0,y:0})
    const [showMenu, setShowMenu] = useState(false)
    const [intentInput, setIntentInput] = useState(null)
    const [currenIntent, setCurrenIntent] = useState({id:'node-1'})
    const [usermsg, setUsermsg] = useState("do you have a laptop ?")
    const [msgs, setMsgs] = useState([])



    const addNode=(x,y)=>{
        setNodes(nodes=>[...nodes,{id:`node-${nodes.length+1}`,type:'intentNode',position:{x:x+fp.x,y:y+fp.y},data:{name:`node-${nodes.length+1}`,id:`node-${nodes.length+1}`,start:false}}])
    }
    const initNodes =()=>{
        console.log("init nodes")
        setNodes(initialNodes)
        setEdges(initialEdges)
        setId(1)
    }

    const updateNode=(nodeId,data)=>{
        const d = nodes.map(node=>node.id===nodeId?{...node,['data']:{...node.data,...data}}:node)
        setNodes(d)
    }

    const ask=()=>{
        msgs.push({
            src:'user',
            msg:usermsg
        })
            const entry = currenIntent.id
            const ns = edges.filter(i=>i.source===entry).map(i=>i.target)
            if (ns.length===0) return;
            const nos = nodes.filter(i=>ns.includes(i.id)).map(i=>i.data)
            .map(i=>({
                name:i.name,
                id:i.id,
                messages:i.messages,
                responses:i.responses,
                entities:i.entities
            }))
            const outJson = {   
                intents: nos,
                user_msg:usermsg,
                required_entities:nos.map(i=>i.entities)?.reduce((a,b)=>a.concat(b))
            }
            fetch("https://natural-language-processing.onrender.com/data",{
                method:"POST",
                headers:{ 'Content-Type': 'application/json' },
                body:JSON.stringify(outJson)
            })
            .then(res=>res.json())
            .then(data=>{
                const entities = data['entities']
                const str = `
                const entities=${JSON.stringify(entities)}
                ${nodes.filter(i=>i.id===data.id)[0].data.code}`
                eval(str)
                setCurrenIntent({id:data.id})
                msgs.push({
                    src:'bot',
                    msg:data['msg']
                })
                setUsermsg('')
            })
            .catch(e=>console.log(e))            
    }






    const values={
        setId,
        showdetail,
        setShowdetail,
        nodes,
        setNodes,
        initNodes,
        edges,
        setEdges,
        addNode,
        updateNode,
        menuPosition,
        setMenuPosition,
        showMenu,
        setShowMenu,
        intentInput,
        setIntentInput,
        usermsg,
        setUsermsg,
        ask,
        msgs
    }
    return (
    <IntentContext.Provider value={values}>{children}</IntentContext.Provider>
    );
}
