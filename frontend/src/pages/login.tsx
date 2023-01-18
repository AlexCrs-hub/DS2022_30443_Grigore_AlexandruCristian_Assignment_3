import { useEffect } from "react";
import LoginForm from "../components/forms/loginForm";


function Login() {

    useEffect(
        () => {
            localStorage.clear();
        }
    )
    
    return <div>
        <LoginForm login={true}/>
    </div>
}

export default Login;