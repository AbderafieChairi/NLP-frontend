import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


export default function TextUpdaterNode({ data }) {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={{backgroundColor:"white",padding:15}}>
        <div>Hello world</div>
        <div>Hello world</div>
        <div>Hello world</div>
        <input type="text" value={data.value} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" style={{left:10}}/>
      <Handle type="source" position={Position.Bottom} id="b"  />
    </>
  );
}