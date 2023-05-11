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
  const {nodes, setNodes,edges, setEdges,showDetail, setParserNodes,addNode} = useFlow();
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
    return id
  }

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');
      if (targetIsPane) {

        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        // setId(i=>{
          const id_ = addIntent( project({ x: event.clientX - left , y: event.clientY - top- 45 }) )
          setEdges((eds) => eds.concat({ 
            id: id_, 
            sourceHandle: 'a',
            source: connectingNodeId.current.nodeId, 
            target: id_ ,
            targetHandle: 'a',
          }));
          // return i+1
        // });
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
          setParserNodes(nodes=>nodes.filter(i=>i.id!==node.id))
          setEdges(edges=>edges.filter(i=>i.target!==node.id&&i.source!==node.id))
        }}
      >
        <Controls/>
        <Background/>
        {menu&&<FlowMenu 
          setMenu={setMenu} 
          menuPos={menuPos} 
          bankPos={bankPos}
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
  const {addNode} = useFlow();
  const addRef=()=>{
    props.setMenu(false)
    addNode(props.bankPos,"refNode")
  }

  return (
    <div className='flow-menu' style={{top:`${props.menuPos.y}px`,left:`${props.menuPos.x}px`}}>
      {/* <div onClick={()=>props.addIntent(props.bankPos)}>add Intent</div> */}
      <div onClick={addRef}>add Reference</div>
    </div>
  )
}