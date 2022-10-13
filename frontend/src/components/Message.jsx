import './Message.css'
import { useEffect } from "react";
import { useState } from "react"

const Message = ({ msg }) => {

    const [dropMsg, setDropMsg] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setDropMsg(false);
        }, 2000)
    }, [msg])

    return(
        <>
            {dropMsg && (
                <div className="message">
                    <h3>{msg}</h3>    
                </div>
            )}
        </>
        
    )
}

export default Message;