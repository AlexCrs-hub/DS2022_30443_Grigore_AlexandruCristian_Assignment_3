import { useEffect, useState } from "react";
import getAxiosInstance from "../axios.service";
import TableComp from "../components/tables/table";


const UsersPage = (): JSX.Element => {

    const [users, setUsers] = useState<any[]>([]);
    const headers = ["id","name","password", "actions"];
    

    useEffect( () => {
        getAxiosInstance().get('users').then(res => setUsers(res.data)).catch(err => console.log(err));
    },[users]);

    

    return <div>
        { users ?  <TableComp headers={headers} data={users}/> : <></>}
    </div>
}

export default UsersPage;