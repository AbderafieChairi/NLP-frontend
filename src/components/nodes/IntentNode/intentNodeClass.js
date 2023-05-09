import { Node_,Point } from '../../../contexts/parser';
export class IntentNode extends Node_{
	static id_=1
    static type = 'intentNode';
	messages=[]
	responses=[]
	code=''
	entity=[]
	constructor(messages=[''],responses=['']){
		const sourcePoint=[new Point({payload:null},'a')]
		const targetPoint=[new Point({payload:null},'a')]
		const id=`intent-${IntentNode.id_++}`
        localStorage.setItem('id_',id)
		super(id,sourcePoint,targetPoint)
		this.responses=responses
		this.messages=messages
	}
	async parse(point){
		const outJson={
			intent:{
				messages:this.messages,
				pattern:this.entity?.output,
				pattern_name:this.entity?.varName,
			},
			user_msg:point.msg.payload.user_msg
		}
		const res = await fetch("http://127.0.0.1:5000/test",{
			method:"POST",
			headers:{ 'Content-Type': 'application/json' },
			body:JSON.stringify(outJson)
		})
		const json = await res.json();
		var response = this.responses[0].toString()
		if (json.entities==undefined){
			return [];
		}else if (Object.keys(json.entities).length>0){
			console.log(json.entities)
			for (let ent in json.entities){
				response=response.replace('$'+ent,json.entities[ent][0])
			}
		}
		eval(this.code)
		const out = this.targetPoint[0]
		out.msg.payload = {...out.msg.payload,response:response}
		return [out]
	}
    static create(position){
        const node = new IntentNode()
        const id = node.id
        return {
            parsernode:node,
            node:{id:id,type:IntentNode.type,position:position,data:{name:id,id:id,start:false,detail:false}}
        }
    }
	update(data){
		this.responses=data.responses;
		this.messages=data.messages;
		this.code=data.code;
		this.entity=data.entity
	}
}
