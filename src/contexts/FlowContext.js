import React, { useContext, useMemo, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { Parser,Edge,Node_,Point } from "./parser";
import { IntentNode } from "../components/nodes/IntentNode/intentNodeClass";
const FlowContext = React.createContext({});



const types={
    "intentNode":IntentNode,
    "Node_":Node_
}



export function useFlow() {
    return useContext(FlowContext);
}

const initialNodes = [
    { id: 'start', type: 'intentNode', position: { x: 200, y: 300 }, data: { name: "starting-point",id: 'node-1',start:true} },
];
const initialParserNode =[
    {
        type:"Node_",
        node:new Node_("start",[],[new Point({payload:null},'a')])
    }
]
const initialPoint=initialParserNode.find(n=>n.node.id=='start').node.targetPoint[0].id;
const initialEdges = [

];

export default function FlowProvider({ children }) {

    const [nodes, setNodes] = useLocalStorage("flow-nodes",initialNodes)
    const [parserNodes, setParserNodes] = useLocalStorage("flow-p-nodes",initialParserNode)
    const [edges, setEdges] = useLocalStorage("flow-edges",initialEdges)
    // const [currentPoint, setCurrentPoint] = useLocalStorage('flow-point',initialPoint)
    const [currentPoint, setCurrentPoint] = useState(initialPoint)
    const parser = useMemo(() => {
        var sourceNode=null;var targetNode=null;
        const edges_=edges.map(edge=> {
            sourceNode=parserNodes.find(pn=>pn.node.id===edge.source).node
            targetNode=parserNodes.find(pn=>pn.node.id===edge.target).node
            return new Edge(edge.id,sourceNode.targetPoint[0].id,targetNode.sourcePoint[0].id,edge.source,edge.target)
        })
            return new Parser(parserNodes.map(i=>i.node),edges_)
    }, [parserNodes,edges.length])

    React.useEffect(()=>{
        setParserNodes(ps=>ps.map(pn=>({
            type:pn.type,
            node:Object.assign(new types[pn.type], pn.node)
            // node : Object.setPrototypeOf(pn.node, types[pn.type].prototype)
        }))
        
        )
    },[])
    React.useEffect(()=>console.log(currentPoint),[currentPoint])
    const addNode=(position,type)=>{
        const out_ = types[type].create(position)
        setParserNodes(parserNodes=>[...parserNodes,{type:type,node:out_.parsernode}])
        setNodes(nodes=>[...nodes,out_.node])
        return out_.parsernode.id
    }
    const initNodes =()=>{
        setNodes(initialNodes)
        setEdges(initialEdges)
        setParserNodes(initialParserNode)
    }

    const initFlowParse=()=>{
        setParserNodes(initialParserNode)
    }
    const showDetail =(node_id)=>{
        const show = nodes.find(i=>i.id===node_id).data.detail
        setNodes(nodes=>nodes.map(i=>i.id===node_id?
            {...i,data:{...i.data,detail:!show}}:
            {...i,data:{...i.data,detail:false}}
            ))
    }

    const updateNode=(nodeId,data)=>{
        console.log("update node id");
        const d = nodes.map(node=>node.id===nodeId?{...node,['data']:{...node.data,...data}}:node)
        parserNodes.find(pn=>pn.node.id===nodeId).node?.update(data)
        setNodes(d)
    }
    const  parse=async (user_msg)=>{
        // console.log(parserNodes)
        // console.log(parser.edges)
        Edge.parser=parser

        const res = await parser.parseFlow(currentPoint,{user_msg})
        if (res.msg===undefined){
            return "sorry I dont recognize what do you want to say !"
        }
        console.log(res.msg.payload.response)
        setCurrentPoint(res.id)
        return res.msg.payload.response
    }
    // React.useEffect(()=>console.log(currentPoint),[currentPoint])


    const values={
        nodes,
        setNodes,
        edges,
        setEdges,
        addNode,
        initNodes,
        updateNode,
        parse,
        showDetail,
        initFlowParse,
        parserNodes
    }
    return (
    <FlowContext.Provider value={values}>{children}</FlowContext.Provider>
    );
}
