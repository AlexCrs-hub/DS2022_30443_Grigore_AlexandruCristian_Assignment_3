import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import getAxiosInstance from "../../axios.service";
import "./formstyle.scss"

interface formFields {
    login: boolean;
    id?: string;
    name?: string;
    password?: string;
    isAdmin?: boolean;
}


function LoginForm (props: formFields): JSX.Element {
    useEffect(
        () => {
            if(props.login){
                localStorage.clear();
            }
        }
    );

    const [data, setData] = useState({
        //id: "",
        name: "",
        password: "",
        isAdmin: false,
    });

    const navigate = useNavigate();

    async function logIn() {
        const response = await getAxiosInstance().post('auth/login',{"name": data.name, "password": data.password});
        console.log(response);
        if(response.data){
            console.log(JSON.stringify(response.data));
            localStorage.setItem('user',JSON.stringify(response.data.access_token));
            navigate('/devices');
        }
    }

    async function register() {
        await getAxiosInstance().post('users',data);
    }
    
    return <div>
        <form className="formcss">
        {
            props.login 
            ? [
            <label>Name</label>,
            <input type="text" name='name' id="name-input" placeholder="Enter name" onChange={(event: any) => {data.name = event.target.value; setData(data);}}/>,
            <label>Password</label>,
            <input type="password" name='password' id="password-input" placeholder="Enter password" onChange={(event: any) => {data.password = event.target.value; setData(data);}}/>,
            <button type="button" onClick={() => logIn()}>Login</button>
            ]
            :
            [   
                <label>Name</label>,
                <input type="text" id="name-input" placeholder="Enter name" value={props.name} onChange={(event: any) => {data.name = event.target.value; setData(data);}}/>,
                <label>Password</label>,
                <input type="password" id="password-input" placeholder="Enter password" value={props.password} onChange={(event: any) => {data.password = event.target.value; setData(data);}}/>,
                <label>Admin</label>,
                <input type="checkbox" id="checkbox-admin" onChange={() => data.isAdmin ? setData({...data, isAdmin: false}) : setData({...data, isAdmin: true})}></input>,
                <button type="button" onClick={() => register()}>Register</button>
            ]
        }
        </form>
    </div>
}

export default LoginForm;