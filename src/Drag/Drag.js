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
import TextUpdaterNode from './TextUpdaterNode';
import IntentNode from './IntentNode';
import { useIntent } from '../contexts/IntentContext';
import "./Drag.css"
import useLocalStorage from '../contexts/useLocalStorage';


const nodeTypes = { textUpdater:TextUpdaterNode,intentNode:IntentNode };




function Flow() {
  const {nodes, setNodes,edges, setEdges,showdetail, setShowdetail,setId} = useIntent();
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);



  const { project } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => {console.log("onEdgesChange");setEdges((eds) => applyEdgeChanges(changes, eds))},
    []
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);
  const addNode=(position,id)=>{
    setNodes(nodes=>[...nodes,{id:id,type:'intentNode',position:position,data:{displayName:id,id:id,start:false}}])
    return id
  }
  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        setId(i=>{
          const id_ = `${i+1}`
          console.log(id_)
          addNode( project({ x: event.clientX - left , y: event.clientY - top- 45 }),id_ )
          setEdges((eds) => eds.concat({ id: id_, source: connectingNodeId.current, target: id_ }));
          return i+1
        });

 
      }
    },
    [project]
  );

  const onNodeClick=(e,node)=>{
    setShowdetail({id:node.id,showdetail:!showdetail.showdetail});
  }
  const onEdgeClick=(e,edge)=>{
    setEdges(edges=>edges.filter(i=>i.id!==edge.id));
  }

  
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
      >
        <Controls/>
        <Background/>
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
