import { useState } from "react";
import getAxiosInstance from "../../axios.service";
import "./modal.scss";

interface ModalComp {
    data: any;
    onClose: any;
}

export interface User{
    id: string;
    name: string;
    password: string;
    isAdmin: boolean;
}

const Modal: React.FC<ModalComp> = (props: ModalComp): JSX.Element => {
    const [user, setUser] = useState<User>({id:props.data.id, name: props.data.name, password: props.data.password, isAdmin: props.data.isAdmin});

    async function editUser(data: User){
        await getAxiosInstance().put(`users/${user.id}`,user);
    }

    return <div className="modal">
        <label>Name</label>
        <input type="text" id="name-input" placeholder="Enter name" value={user.name} onChange={(event: any) => {user.name = event.target.value; setUser(user);}}/>
        <label>Password</label>
        <input type="password" id="password-input" placeholder="Enter password" value={user.password} onChange={(event: any) => {user.password = event.target.value; setUser(user);}}/>
        <label>Admin</label>
        <input type="checkbox" id="checkbox-admin" onChange={() => user.isAdmin ? setUser({...user, isAdmin: false}) : setUser({...user, isAdmin: true})}></input>
        <button type="button" onClick={() => editUser(user)}>Edit</button>
        <button type="button" onClick={props.onClose}>Close</button>
    </div>
}

export default Modal;