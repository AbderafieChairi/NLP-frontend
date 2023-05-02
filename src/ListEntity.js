import React, { useState } from 'react'
import "./entity.css"
export default function ListEntity({position,setType,sethasdetail}) {
    const [data, setData] = useState([
        {
            "entities": [
                {
                    "synonyms": [
                        "TV"
                    ],
                    "value": "TV"
                },
                {
                    "synonyms": [
                        "phone"
                    ],
                    "value": "phone"
                },
                {
                    "synonyms": [
                        "watch"
                    ],
                    "value": "watch"
                },
                {
                    "synonyms": [
                        "Wireless Router"
                    ],
                    "value": "Wireless Router"
                },
                {
                    "synonyms": [
                        "camera"
                    ],
                    "value": "camera"
                },
                {
                    "synonyms": [
                        "computer"
                    ],
                    "value": "computer"
                },
                {
                    "synonyms": [
                        "headpone"
                    ],
                    "value": "headpone"
                }
            ],
            "name": "projects/shopme-esid/agent/entityTypes/b3c55142-4215-488e-aace-015378040e8e",
            "displayName": "device",
            "kind": "KIND_LIST",
            "autoExpansionMode": "AUTO_EXPANSION_MODE_UNSPECIFIED",
            "enableFuzzyExtraction": false
        }
    ])
  return (
    <div className='entity-list' style={{left:position.x,top:position.y+20}}>
        <div style={{padding:7,textAlign:'left'}}>List of entities</div>
        {data.map((item,index)=>(
            <div key={index} className='entity-item' onClick={()=>{setType(item.displayName);sethasdetail(false)}}>{item.displayName}</div>
            ))}
    </div>
  )
}
