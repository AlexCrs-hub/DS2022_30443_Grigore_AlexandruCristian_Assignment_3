import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import getAxiosInstance from "../../axios.service";
import { User } from "../../components/modal/modal";
import UserModal from "../../components/UserModal/user.modal";
import './chat.scss';
import jwt_decode from 'jwt-decode';

const ChatPage = ():JSX.Element => {
    const user = jwt_decode<User>(JSON.parse(localStorage.getItem('user') || ""));
    const [users, setUsers] = useState<User[]>([]);

    useEffect(
        () => {
            if(user.isAdmin) {
                getAxiosInstance().get("users/regular").then(res => setUsers(res.data));
            }
            else{
                getAxiosInstance().get("users/admins").then(res => setUsers(res.data));
            }
        },[users]
    );


    return <div className="chatheads">
        {users.map(user => {return <UserModal id={user.id} name={user.name} password={user.password} isAdmin={user.isAdmin} />})}
    </div>
}

export default ChatPage;