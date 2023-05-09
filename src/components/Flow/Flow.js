/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
  import ReactFlow, {
    Controls, 
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
  } from 'reactflow';
import 'reactflow/dist/style.css';
import IntentNode from '../nodes/IntentNode/IntentNode';
// import { useIntent } from '../../contexts/IntentContext';
import "./Flow.css"
import { useFlow } from '../../contexts/FlowContext';
import RefNode from '../nodes/RefNode/RefNode';


const nodeTypes = {
    intentNode:IntentNode,
    refNode:RefNode  
  };




function Flow() {
  const {nodes, setNodes,edges, setEdges,showDetail, setShowdetail,setId,setShowSwitch,addNode} = useFlow();
  const [menu, setMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({x:0,y:0})
  const [bankPos, setBankPos] = useState({x:0,y:0})
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);



  const { project } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => {console.log(changes);setEdges((eds) => applyEdgeChanges(changes, eds))},
    []
  );

  const onConnectStart = useCallback((_, { nodeId ,handleId,handleType}) => {
    connectingNodeId.current = { nodeId, handleId, handleType };


  }, []);
  const addIntent=(position)=>{
    const id = addNode(position,'intentNode')
    // var id = "0"
    // setId(i=>{
    //   id= `${i+1}`
    //   setNodes(nodes=>[...nodes,{id:id,type:'intentNode',position:position,data:{displayName:id,id:id,start:false}}])
    //   return id
    // })
    return id
  }

  const addBank=(position)=>{
    var id = '0'
    setId(i=>{
       id = `${i+1}`
      setNodes(nodes=>[...nodes,{id:id,type:'bankIntent',position:position,data:{id}}])
      return id
    })
    return id 
  }
  const addBankOut=(position)=>{
    setId(i=>{
      const id = `${i+1}`
      setNodes(nodes=>[...nodes,{id:id,type:'bankIntentOut',position:position,data:{id}}])
      return parseInt(id)
    })

  }
  const addSwitch=(position)=>{
    setId(i=>{
      const id = `${i+1}`
      setNodes(nodes=>[...nodes,{id:id,type:'switchNode',position:position,data:{id}}])
      return parseInt(id)
    })

  }

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');
      if (targetIsPane && connectingNodeId.current.handleId==="b") {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        // setId(i=>{
          const id_ = addIntent( project({ x: event.clientX - left , y: event.clientY - top- 45 }) )
          setEdges((eds) => eds.concat({ 
            id: id_, 
            sourceHandle: 'b',
            source: connectingNodeId.current.nodeId, 
            target: id_ ,
            targetHandle: 'a',
          }));
          // return i+1
        // });
      }
      if (targetIsPane && connectingNodeId.current.handleId==="c"){
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        setId(i=>{
          const id_ = `${i+1}`
          addBank( project({ x: event.clientX - left , y: event.clientY - top- 45 }),id_ )
          setEdges((eds) => eds.concat({ 
            id: id_, 
            sourceHandle: 'c',
            source: connectingNodeId.current.nodeId, 
            target: id_ ,
            targetHandle: 'e'
          }));
          return i+1
        });
      }
      if (targetIsPane && connectingNodeId.current.handleId.at(0)==="s") {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        setId(i=>{
          const id_ = `${i+1}`
          addIntent( project({ x: event.clientX - left , y: event.clientY - top- 45 }),id_ )
          setEdges((eds) => eds.concat({ 
            id: id_, 
            sourceHandle: connectingNodeId.current.handleId,
            source: connectingNodeId.current.nodeId, 
            target: id_ ,
            targetHandle: 'a',
          }));
          return i+1
        });
      } 
    },
    [project]
  );

  const onNodeClick=(e,node)=>{
    if (node.type==="intentNode")
    showDetail(node.id)
    // setShowdetail({id:node.id,showdetail:!showdetail.showdetail});
    // else if (node.type==="switchNode")
    // setShowSwitch({id:node.id,showdetail:!showdetail.showdetail});
  }
  const onEdgeClick=(e,edge)=>{
    setEdges(edges=>edges.filter(i=>i.id!==edge.id));
  }
  const onContextMenu=useCallback((event)=>{
    event.preventDefault()
    const targetIsPane = event.target.classList.contains('react-flow__pane');
    if (targetIsPane)
    {
      const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
      setBankPos(project({ x: event.clientX - left , y: event.clientY - top}))
      const p = {x:event.clientX,y:event.clientY}
      setMenuPos(p)
      setMenu(true)
    }
  })
  
  return (
    <div className="wrapper wrper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onContextMenu={onContextMenu}
        onClick={()=>{setMenu(false)}}
        onNodeContextMenu={(e,node)=>{
          e.preventDefault()
          setNodes(nodes=>nodes.filter(i=>i.id!==node.id))
          setEdges(edges=>edges.filter(i=>i.target!==node.id&&i.source!==node.id))
        }}
      >
        <Controls/>
        <Background/>
        {menu&&<FlowMenu 
          setMenu={setMenu} 
          menuPos={menuPos} 
          addBankOut={addBankOut} 
          bankPos={bankPos}
          addSwitch={addSwitch}
          addIntent={addIntent}
          />}
      </ReactFlow>
    </div>
  );
}




// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);




function FlowMenu(props){
  const addBankout=()=>{
    props.setMenu(false)
    props.addBankOut(props.bankPos)
  }
  const addSwitch=()=>{
    props.setMenu(false)
    props.addSwitch(props.bankPos)
  }
  const addIntent=()=>{
    props.setMenu(false)
    props.addIntent(props.bankPos)
  }
  
  return (
    <div className='flow-menu' style={{top:`${props.menuPos.y}px`,left:`${props.menuPos.x}px`}}>
      <div onClick={addIntent}>add Intent</div>
      <div onClick={addBankout}>add bank out</div>
      <div onClick={addSwitch}>add Switch</div>
    </div>
  )
}