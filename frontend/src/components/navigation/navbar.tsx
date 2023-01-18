import { NavLink } from "react-router-dom";
import "./navbar.scss";
interface UserType{
    isAdmin: boolean;
}

const NavigationBar: React.FC<UserType> = (props: UserType): JSX.Element => {
    return <header className="header"> 
        <div>
        <span style={{display: "flex", flexDirection:"row", justifyContent:"space-evenly"}}>
            {localStorage.length !== 0 && localStorage.length > 0 ?
            props.isAdmin 
                ? [ 
                    <NavLink style={{textDecoration: 'none'}} to="/devices"> DEVICES </NavLink>,
                    <NavLink style={{textDecoration: 'none'}} to="/users"> USERS </NavLink>, 
                    <NavLink style={{textDecoration: 'none'}} to="/create"> REGISTER NEW USER</NavLink>,
                    <NavLink style={{textDecoration: 'none'}} to="/devices/create">CREATE DEVICE</NavLink>,
                    <NavLink style={{textDecoration: 'none'}} to="/login"> Logout </NavLink>,
                    <NavLink style={{textDecoration: 'none'}} to="/chat"> Chat </NavLink>,
                ]
                :  [
                    <NavLink style={{textDecoration: 'none'}} to="/login"> Logout </NavLink>,
                    <NavLink style={{textDecoration: 'none'}} to="/chat"> Chat </NavLink>,
                ]
            : [
                <NavLink style={{textDecoration: 'none'}} to="/login"> Login </NavLink>,
                <NavLink style={{textDecoration: 'none'}} to="/create"> Register</NavLink>
            ]
            }
        </span>
    </div>
    </header>
}

export default NavigationBar;