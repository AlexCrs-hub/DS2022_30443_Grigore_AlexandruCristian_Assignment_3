import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { json } from "stream/consumers";
import getAxiosInstance from "./axios.service";
import DeviceCard from "./components/cards/deviceCard";
import DeviceForm from "./components/forms/device/device.form";
import LoginForm from "./components/forms/loginForm";
import { User } from "./components/modal/modal";
import NavigationBar from "./components/navigation/navbar";
import { chatSocket, WebsocketChatProvider } from "./context/WebsocketChatContext";
import { socket, WebsocketProvider } from "./context/WebsocketContext";
import ChatPage from "./pages/chat-page/chat.page";
import DevicePage from "./pages/device/devices.page";
import Login from "./pages/login";
import PageNotFound from "./pages/pagenotfound/pagenotfound";
import UsersPage from "./pages/users.page";
import jwt_decode from "jwt-decode";


const Main = (): JSX.Element => {

    const [user, setUser] = useState<User>({id: "", name: "", password: "", isAdmin: false});

    useEffect( () => {
        if(localStorage.length > 0){
            const jwt = JSON.parse(localStorage.getItem('user')|| " ");
            console.log(jwt);
            const parsed = jwt_decode<User>(jwt.access_token);
            console.log(parsed);
            setUser(parsed);
        }
    },[]);

    return  <div>
        <NavigationBar isAdmin={user.isAdmin}/>
        <Routes>
            <Route path="/devices" element={<DevicePage/>}/>
            <Route path="/users" element={user.isAdmin ? <UsersPage /> : <PageNotFound />}/> 
            <Route path="/login" element={<Login />}/>
            <Route path="/create" element={<LoginForm login={false}/>}/>
            <Route path="/devices/create" element={user.isAdmin ? <DeviceForm/> : <PageNotFound/>}/>
            <Route path="/chat" element ={<ChatPage/>}/>
        </Routes>
        <WebsocketProvider value={socket}></WebsocketProvider>
        <WebsocketChatProvider value ={chatSocket}></WebsocketChatProvider>
    </div>
}

export default Main;