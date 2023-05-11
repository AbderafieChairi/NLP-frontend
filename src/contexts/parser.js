export class Parser{
	node=[]
	edges=[]
	attList=[]
    constructor(nodes,edges){
		this.nodes=nodes
		this.edges=edges
    }
    parse(){
        Edge.parser = this;
		Node_.parser=this;
        this.parseFlow(this.nodes[0].targetPoint[0].id);
    }
    async parseFlow(point_id,payload) {
		const point = this.nodes.find(n=>n.targetPoint.map(i=>i.id).includes(point_id)).targetPoint[0];
		point.msg.payload={...point.msg.payload,...payload};
        const nextNodes = this.nextNodes(point_id);
        var out =[];
        for (const nextNode of nextNodes) {
            out = await nextNode.parse(point)
            if(out.length>0){
                return out[0];
            }
        }
        return out;
    }
    nextNodes(point_id){
        const node= this.nodes.find(n=>n.targetPoint.map(i=>i.id).includes(point_id)) 
        return Edge.parser.edges
			.filter(edge=>edge.source===node.id && point_id===edge.sourceHandle)
			.map(edge=>this.nodes.find(n=>n.id===edge.target)) 
    }
}

export class Node_{
    static parser;
	id=''
	sourcePoint=[]
	targetPoint=[]
    constructor(id,sourcePoint,targetPoint){
		this.id=id
		this.sourcePoint=sourcePoint
		this.targetPoint=targetPoint
    }
    async parse(point){
		console.log(this.id)
        this.targetPoint[0].msg=point.msg;
        return [this.targetPoint[0]]
    }
	getId(){
		return this.id;
	}
	update(data){
		
	}

}

export class Point{
	msg=''
	handle=''
	static id_=0;
	id=''
    constructor(msg,handle){
			this.msg=msg
			this.handle=handle
			this.id=`point-${Point.id_++}`
			// console.log(this.id)
		}
}

export class Edge{
    static parser;
	id=''
	sourceHandle=''
	targetHandle=''
	source=''
	target=''
    constructor(id,sourceHandle,targetHandle,source,target){
		this.id=id
		this.sourceHandle=sourceHandle
		this.targetHandle=targetHandle
		this.source=source
		this.target=target
    }
}