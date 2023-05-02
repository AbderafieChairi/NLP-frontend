import React from 'react'
import './Entity.css'
export default function Entity(props) {
  return (
    <div className='entities-container'>
        <div className='entities-list'>
            <div className='entities-list-header'>Entities List</div>
            <div>
                <div className='entity-name'>device</div>
                <div className='entity-name'>depLVL</div>
                <div className='entity-name'>job</div>
                <div className='entity-name entity-name-add'>Add +</div>
            </div>

        </div>
        <div className='entities-main'>

        </div>
        
    </div>
  )
}
