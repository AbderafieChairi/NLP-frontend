import React, { useContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { useFlow } from "./FlowContext";

const ChatContext = React.createContext({});


export function useChat() {
    return useContext(ChatContext);
}



export default function ChatProvider({ children }) {
    const [showChat, setShowChat] = useLocalStorage("show-chat",false)
    const [chat, setChat] = useLocalStorage("chat",false)
    const [usermsg, setUsermsg] = useState("do you have a laptop ?")
    const [msgs, setMsgs] = useState([])
    const [loading, setLoading] = useState(false)
    const {parse,initFlowParse} = useFlow()
 

    const ask=()=>{
        setLoading(true)
        parse(usermsg)
        .then(res=>{
            setLoading(false)
            if (res!==undefined){
                setMsgs(msgs=>[...msgs,...res.toString().split('","').map(i=>({
                    src:'bot',
                    msg:i
                }))])
            }

            
        })
    }

    const addMsg=()=>{
        setMsgs([...msgs,{
            src:'user',
            msg:usermsg
        }])
    }
    const clearChat=()=>{
        setMsgs([])
        // setCurrenIntent({id:'node-1'})
        setUsermsg("do you have a laptop ?")
        setLoading(false)
        initFlowParse()
    }
    const values={
        showChat,
        setShowChat,
        chat,
        setChat,
        usermsg,
        setUsermsg,
        loading,
        addMsg,
        clearChat,
        msgs,
        ask
    }

    return (
    <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
    );
}
