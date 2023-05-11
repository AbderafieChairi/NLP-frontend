import React, { useContext } from "react";
// import useLocalStorage from "./useLocalStorage";
// import { flushSync } from "react-dom";

const IntentContext = React.createContext({});




export function useIntent() {
    return useContext(IntentContext);
}

// const initialNodes = [
//     { id: 'node-1', type: 'intentNode', position: { x: 200, y: 300 }, data: { name: "starting-point",id: 'node-1',start:true} },
// ];
// const initialEdges = [

// ];

export default function IntentProvider({ children }) {
    // const [id_, setId] = useLocalStorage("id",1)
    // const [showdetail, setShowdetail] = useState({id:0,showdetail:false})
    // const [showSwitch, setShowSwitch] = useState({id:0,showdetail:false})
    // const [nodes, setNodes] = useLocalStorage("nodes",initialNodes)
    // const [edges, setEdges] = useLocalStorage("edges",initialEdges)
    // const [fp] = useState({x:0,y:0})
    // const [menuPosition, setMenuPosition] = useState({x:0,y:0})
    // const [showMenu, setShowMenu] = useState(false)
    // const [intentInput, setIntentInput] = useState(null)
    // const [currenIntent, setCurrenIntent] = useState({id:'node-1'})
    // const [usermsg, setUsermsg] = useState("do you have a laptop ?")
    // const [msgs, setMsgs] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [bankIntent, setBankIntent] = useState([
    //     {name:'var1'},
    //     {name:'var2'},
    //     {name:'var3'},
    //     {name:'var4'},
    //     {name:'var5'}
    // ])

    // //set bank varname to data variable automatically
    // React.useEffect(()=>{
    //     edges.forEach(element => {
    //         if(element.targetHandle=="e"){
    //             const value=nodes.filter(i=>i.id==element.source)[0].data.entity.value
    //             const name =nodes.filter(i=>i.id==element.target)[0].data.varName
    //             setBankIntent(bi=>{
    //                 return bi.map(i=>{
    //                     return i.name===name?{...i,['value']:value}:i
    //                 })
    //             })
    //         }
    //     });
    // },[edges])


    // const addNode=(x,y)=>{
    //     setNodes(nodes=>[...nodes,{id:`node-${nodes.length+1}`,type:'intentNode',position:{x:x+fp.x,y:y+fp.y},data:{name:`node-${nodes.length+1}`,id:`node-${nodes.length+1}`,start:false}}])
    // }
    // const initNodes =()=>{
    //     console.log("init nodes")
    //     setNodes(initialNodes)
    //     setEdges(initialEdges)
    //     setId(1)
    // }

    // const updateNode=(nodeId,data)=>{
    //     const d = nodes.map(node=>node.id===nodeId?{...node,['data']:{...node.data,...data}}:node)
    //     setNodes(d)
    // }
    // const addMsg=()=>{
    //     setMsgs([...msgs,{
    //         src:'user',
    //         msg:usermsg
    //     }])
    // }
    // const clearChat=()=>{
    //     setMsgs([])
    //     setCurrenIntent({id:'node-1'})
    //     setUsermsg("do you have a laptop ?")
    //     setLoading(false)
    // }
    // const ask=()=>{
    //         const entry = currenIntent.id
    //         const ns = edges.filter(i=>i.source===entry&&i?.sourceHandle!=="c").map(i=>i.target)
    //         if (ns.length===0) return;
    //         const nos = nodes.filter(i=>ns.includes(i.id)).map(i=>i.data)
    //         .map(i=>({
    //             id:i.id,
    //             messages:i.messages,
    //             pattern:i.entity?.output,
    //             required:i.entity?.required,
    //             pattern_name:i.entity?.varName
    //         }))
    //         const outJson = {   
    //             intents: nos,
    //             user_msg:usermsg,
    //         }
    //         console.log(outJson)
    //         setLoading(true)
    //         setUsermsg('')
    //         fetch("http://127.0.0.1:5000/test",{
    //             method:"POST",
    //             headers:{ 'Content-Type': 'application/json' },
    //             body:JSON.stringify(outJson)
    //         })
    //         .then(res=>res.json())
    //         .then(data=>{
    //             console.log(data)
    //             var id = data.id
    //             var node = nodes.filter(i=>i.id===id)[0]
    //             const varname = node.data.entity.varName
    //             if(varname!==""){
    //                 flushSync(()=>{
    //                     setNodes(nodes.map(i=>i.id===id?{...i,data:{...i.data,entity:{...i.data.entity,value:data.entities[varname]}}}:i))
    //                 })
    //             }
    //             var out_id = id;
    //             var context={}
    //             setNodes(nodes=>{
    //                 if (node.data.responses[0]==="pass"){

    //                     out_id = parseSwitch(id,nodes)
    //                     node = nodes.filter(i=>i.id===out_id)[0]
    //                     data["entities"]={}
    //                 }
    //                 context={...getContext(out_id,nodes),...data['entities']}

    //                 return nodes
    //             })
    //             console.log("context ->",context)

    //             setLoading(false)
    //             const str = `
    //             const context=${JSON.stringify(context)};
    //             ${nodes.filter(i=>i.id===data.id)[0].data.code}`
    //             eval(str)
    //             setCurrenIntent({id:data.id})
    //             var msg = node.data.responses[0]
    //             const replaceItems_ = replaceItems(context)
    //             for (let i in replaceItems_) {
    //                 msg = msg.replaceAll(replaceItems_[i][0],replaceItems_[i][1])
    //             }
    //             msgs.push({
    //                 src:'bot',
    //                 msg:msg
    //             })
    //             setUsermsg('')
    //         })
    //         .catch(e=>console.log(e))            
    // }

    // const getContext=(id,nodes)=>{
    //     const context={}
    //     console.log("out_id ->"+id)
    //     var eds = edges.filter(i=>i.targetHandle==="d"&&i.target===id)
    //     var varName=''// get entry bankout node varName
    //     if (eds.length>0){
    //         const ed = eds[0]
    //         varName = nodes.filter(i=>i.id===ed.source)[0].data.value
    //         context[varName]={}
    //     }// get all node assciate with bankIntent that have varName
    //     var nds=[]
    //     nodes.filter(i=>i.data?.value===varName&&i.type==="bankIntent").forEach(i=>{
    //         eds = edges.filter(j=>j.target===i.id).map(i=>i.source)
    //         nds = nds.concat(nodes.filter(j=>eds.includes(j.id)))
    //     })// get the values from extracted nodes
    //     nds.forEach(i=>{
    //         context[varName][i.data.entity.varName]=i.data.entity.value
    //     })
    //     return context;
    // }

    // const replaceItems=(context)=>{
    //     const a = context
    //     const b=[]
    //     for (let i in a){
    //         if (Array.isArray(a[i])){
    //             b.push([`$${i}`,a[i][0]])
    //         }else{
    //             for (let j in a[i]){
    //                 b.push([`$${i}.${j}`,a[i][j][0]])
    //             }
    //         }
    //     }
    //     return b
    // }
    // const parseSwitch=(id,nodes)=>{
    //     const sw_id = edges.filter(i=>i.targetHandle==="s-i"&&i.source===id)[0].target
    //     const context={}
    //     var varName=''// get entry bankout node varName
    //     var switch_ = nodes.filter(i=>i.id===sw_id)[0]
    //     var eds = edges.filter(i=>i.targetHandle==="s-v"&&i.target===sw_id)
    //     var varName=''// get entry bankout node varName
    //     if (eds.length>0){
    //         const ed = eds[0]
    //         varName = nodes.filter(i=>i.id===ed.source)[0].data.value
    //         context[varName]={}
    //     }// get all node assciate with bankIntent that have varName
    //     var nds=[]
    //     nodes.filter(i=>i.data?.value===varName&&i.type==="bankIntent").forEach(i=>{
    //         eds = edges.filter(j=>j.target===i.id).map(i=>i.source)
    //         nds = nds.concat(nodes.filter(j=>eds.includes(j.id)))
    //     })// get the values from extracted nodes
    //     nds.forEach(i=>{
    //         console.log(i.data)
    //         context[varName][i.data.entity.varName]=i.data.entity.value
    //     })        
    //     console.log(context)
    //     var out = 0;
    //     const str=`
    //     const context=${JSON.stringify(context)};
    //     ${switch_.data.code}`
    //     eval(str)
    //     console.log(out)
    //     const outEdge = edges.filter(i=>i.sourceHandle===`s-${out}`)[0] 
    //     const outNode = nodes.filter(i=>i.id===outEdge.target)[0]
    //     return outNode.id


    // }


    // const values={
    //     setId,
    //     showdetail,
    //     setShowdetail,
    //     showSwitch,
    //     setShowSwitch,
    //     nodes,
    //     setNodes,
    //     initNodes,
    //     edges,
    //     setEdges,
    //     addNode,
    //     updateNode,
    //     menuPosition,
    //     setMenuPosition,
    //     showMenu,
    //     setShowMenu,
    //     intentInput,
    //     setIntentInput,
    //     usermsg,
    //     setUsermsg,
    //     ask,
    //     msgs,
    //     loading,
    //     addMsg,
    //     clearChat,
    //     bankIntent,
    //     setBankIntent
    // }
    const values={

    }
    return (
    <IntentContext.Provider value={values}>{children}</IntentContext.Provider>
    );
}
