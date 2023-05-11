import { Node_,Point } from '../../../contexts/parser';
export class RefNode extends Node_{
	static id_=1
    static type = 'refNode';
    ref_point=""
	constructor(ref=''){
		const sourcePoint=[new Point({payload:null},'a')]
		const targetPoint=[new Point({payload:null},'a')]
		const id=`ref-${RefNode.id_++}`
		super(id,sourcePoint,targetPoint)
        this.ref_point=ref
	}
	async parse(point){
        console.log("return to :",this.ref_point)
        return Node_.parser.parseFlow(this.ref_point,point.msg.payload)
	}
    static create(position){
        const node = new RefNode()
        const id = node.id
        return {
            parsernode:node,
            node:{id:id,type:RefNode.type,position:position,data:{name:id,id:id}}
        }
    }
	update(data){
        this.ref_point=data.ref
        console.log(data.ref);
	}
}
