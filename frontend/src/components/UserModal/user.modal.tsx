import { useState } from "react";
import ChatBox from "../chatbox/chatbox";
import { User } from "../modal/modal";
import './user.modal.scss';

const UserModal:  React.FC<User> = (props: User): JSX.Element => {
    const [show, setShow] = useState(false);
    return <div className="userhead" onClick={() => setShow(true)}>
        {props.name}
        {show ? <ChatBox onClose={() => setShow(false)} username={props.name}/> : null}
    </div>
}

export default UserModal;