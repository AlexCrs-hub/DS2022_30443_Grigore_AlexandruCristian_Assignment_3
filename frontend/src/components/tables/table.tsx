import { useState } from "react";
import { Table } from "reactstrap";
import getAxiosInstance from "../../axios.service";
import Modal, { User } from "../modal/modal";

interface TableComponent {
    headers: string[];
    data: any[];
}

const TableComp: React.FC<TableComponent> = (props: TableComponent): JSX.Element => {

    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState<User>({id: "", name: "", password: "", isAdmin: false});

    async function deleteUser(id: any) {
        await getAxiosInstance().delete(`users/${id}`);
    }

    return <div>
        <Table striped bordered border={2} >
            <thead>
                <tr>
                    {props.headers.map(header => <th>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.data.map(elem => <tr>{props.headers.map(header => header !== "actions" ? <td>{elem[header]}</td> : <td><button type="button" onClick={() => {setShow(true); setModalData(elem); console.log(modalData)}}>Edit</button> <button type="button" onClick={() => deleteUser(elem.id)}>Delete</button></td>)}</tr>)}
            </tbody>
        </Table>
        {show ? <Modal data={modalData} onClose={() => setShow(false)}/> : null}
    </div>
}

export default TableComp;