
interface Msg{
    payload:any;
}

class Parser{
    constructor(
        public nodes:Node_[],
        public edges:Edge[],
        public startPoint:Point
    ){
    }
    parse(){
        Edge.parser = this;
        this.parseFlow(this.nodes[0].targetPoint[0].id);
    }
    parseFlow(point_id:string) {
        const nextNodes = this.nextNodes(point_id);
        var out :Point[]=[];
        for (const nextNode of nextNodes) {
            out = nextNode.parse(nextNode.sourcePoint[0])
            if(out.length>0){
                return out[0] as NonNullable<Point>;
            }
        }
        return out;
    }
    nextNodes(point_id:string):Node_[]{
        const node= this.nodes.find(n=>n.targetPoint.map(i=>i.id).includes(point_id)) as NonNullable<Node_>;
        return Edge.parser.edges.filter(edge=>
            edge.source==node.id && point_id==edge.sourceHandle
        ).map(edge=>this.nodes.find(n=>n.id==edge.target)) as NonNullable<Node_>[]
    }
}

type out ={
    nextnode:Node_;
    points:Point[];
}

class Node_{
    constructor(public id:string,public sourcePoint:Point[],public targetPoint:Point[]){
    }
    parse(point :Point):Point[]{
        console.log(this.id);
        return [this.targetPoint[0]]
    }

    // nextNodes(points:Point[]):out[]{
        // const edges =Edge.parser.edges.filter(edge=>{
        //     edge.source==this.id && points.map(i=>i.id).includes(edge.sourceHandle)
        // })
    //     const nextnodes :out[]= edges.map(target=>
    //         {
    //             const node= Edge.parser.nodes.find(node=>node.id==target.target) as NonNullable<Node_>
    //             return{
    //                 nextnode:Edge.parser.nodes.find(node=>node.id==target.target),
    //                 points:node.sourcePoint.filter(p=>p.handle==target.targetHandle)
    //             }
    //         }
    //     ) as NonNullable<out>[]
    //     return nextnodes;
    // }
}

class Point{
    static id_=0;
	id=''
    constructor(
        public msg:Msg,
        public handle:string){
            this.id=`point-${Point.id_++}`
        }
}

class Edge{
    static parser:Parser;
    constructor(
        public id: string,
        public sourceHandle: string,
        public targetHandle: string,
        public source: string,
        public target: string,
    ){
    }
}


class Main{
    main(){
        const startPoint = new Point({payload:null},'a');
        const startingpoint = new Node_("start",[],[startPoint]);
        const intentNode=new Node_("intent-1",[new Point({payload:{msg:"hhhh"}},'b')],[new Point({payload:{msg:"ah bon"}},'a')]);
        const edges=[
            new Edge("e1",'point-0','point-1','start','intent-1'),
        ]
        // console.log([startingpoint,intentNode].map(i=>i.sourcePoint))
        
        const parser = new Parser([startingpoint,intentNode],edges,startPoint);
        Edge.parser=parser;
        console.log(parser.parseFlow(startPoint.id))
        // parser.parse();
    }
}


(new Main()).main()