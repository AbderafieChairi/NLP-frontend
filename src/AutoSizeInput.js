import {
    useCallback,
    useEffect,
    useRef,
    useState,
  } from "react";
  

  const baseStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    visibility: "hidden",
    height: 0,
    width: "auto",
    whiteSpace: "pre",
  };
  
const  InpContainer=()=>{
    const [data, setData] = useState('')
    return(
        <AutoSizeInput 
        value={data}
        onChange={e=>setData(e.target.value)}
        />
    )
  }
export default InpContainer;

  export const  AutoSizeInput = ({
    minWidth = 5,
    ...props
  }) => {
    const inputRef = useRef(null);
    const measureRef = useRef(null);
    const [styles, setStyles] = useState({});
  
    // grab the font size of the input on ref mount
    const setRef = useCallback((input) => {
      if (input) {
        const styles = window.getComputedStyle(input);
        setStyles({
          fontSize: styles.getPropertyValue("font-size"),
          paddingLeft: styles.getPropertyValue("padding-left"),
          paddingRight: styles.getPropertyValue("padding-right"),
        });
      }
      inputRef.current = input;
    }, []);
  
    // measure the text on change and update input
    useEffect(() => {
      if (measureRef.current === null) return;
      if (inputRef.current === null) return;
  
      const width = measureRef.current.clientWidth;
      inputRef.current.style.width = Math.max(minWidth, width) + "px";
    }, [props.value, minWidth, styles]);
  
    return (
      <>
        <input ref={setRef} {...props} />
        <span ref={measureRef} style={{ ...baseStyles, ...styles }}>
          {props.value}
        </span>
      </>
    );
  };
  