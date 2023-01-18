import { useContext, useEffect, useRef, useState } from "react";
import { WebsocketChatContext } from "../../context/WebsocketChatContext";
import "./chatbox.scss";
import jwt_decode from 'jwt-decode';
import { User } from "../modal/modal";

interface Chat{
    onClose: any;
    username: string;
}

interface Message{
    sender: string;
    receiver: string;
    message: string;
}

const ChatBox: React.FC<Chat> = (props: Chat):JSX.Element => {
    const [msgs, setMsgs] = useState<string[]>([]);
    const [msg, setMsg] = useState<Message>({sender:"", receiver:props.username, message:""});
    const username = useRef("");
    const receiver = useRef(props.username);
    const socket = useContext(WebsocketChatContext);
    const sent = useRef<Boolean>(false);
   

    useEffect(
        () => {
            username.current = jwt_decode<User>(JSON.parse(localStorage.getItem('user') || "")).name;
            socket.connect();
                socket.on('onSend', (data) => {
                    if((data.sender === username.current && data.receiver === receiver.current) || (data.receiver === username.current && data.sender === receiver.current)){
                        //const newMsgs = [...msgs,data.message];
                        setMsgs([...msgs,data.message]);
                       
                    }
                }); 
        },[]
    );

   

    const sendMessage = (event: any) => {
       // sent.current = true;
        console.log(sent);
        event.preventDefault();
        const mess: Message = {sender: username.current, receiver: receiver.current, message: event.target.chatbar.value};
        setMsg(mess);
        socket.emit('send', mess);
    }
    
    return <div className="chatbox">
        {msgs.map(msg =>{return <div className="msgblob">{msg}</div>})}
        <form className="typetxt" onSubmit={(event) => {sendMessage(event); event.preventDefault()}}>
            <input id="chatbar" name="chatbar" type="text" onChange={(event: any) =>{setMsg(event.target.value)}} />
        </form>
        <button className="close" onClick={()=>console.log(username.current)}>Close</button>
    </div>
}
export default ChatBox;