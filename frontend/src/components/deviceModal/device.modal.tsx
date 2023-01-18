import { useState } from "react";
import getAxiosInstance from "../../axios.service";
import { Device } from "../cards/deviceCard";
import "../modal/modal.scss"

interface ModalDev {
    device: Device;
    onClose: any;
}

const DeviceModal: React.FC<ModalDev> = (props: ModalDev): JSX.Element => {
    
    const [device, setDevice] = useState<Device>(props.device);

    async function editDevice(){
        await getAxiosInstance().put(`devices/${device.id}`,device);
    }

    return <div className="modal">
        <label>Description</label>
        <input type="text" id="description" name="description" defaultValue={ device.description} onChange={(event: any) => {device.description = event.target.value;setDevice(device)}}/>
        <label>Address</label>
        <input type="text" id="address" name="address" defaultValue={ device.address} onChange={(event: any) => {device.address = event.target.value;setDevice(device)}}/>
        <label>MaxHrEnergyConsumption</label>
        <input type="text" id="MaxHrEnergyConsumption" name="MaxHrEnergyConsumption" defaultValue={ device.maxHrEnergyConsumption} onChange={(event: any) => {device.maxHrEnergyConsumption = event.target.value; setDevice(device)}}/>
        <label>UserId</label>
        <input type="text" id="userID" name="userId" value={ device.userId} onChange={(event: any) => {device.userId = event.target.value; setDevice(device)}}/>
        <button type="button" onClick={() => editDevice()}>Edit</button>
        <button type="button" onClick={props.onClose}>Close</button>
    </div>
}

export default DeviceModal;