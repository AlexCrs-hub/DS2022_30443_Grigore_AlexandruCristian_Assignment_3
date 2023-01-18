import { useState } from "react";
import getAxiosInstance from "../../../axios.service";
import { Device } from "../../cards/deviceCard";
import "../formstyle.scss"

const DeviceForm = (): JSX.Element => {
    
    const [device, setDevice] = useState<Partial<Device>>({description: "", address: "", maxHrEnergyConsumption: 0});

    async function createDevice(){
        await getAxiosInstance().post('devices',device);
    }

    return <div className="formcss">
        <label>Description</label>
        <input type="text" id="description" name="description" onChange={(event: any) => {device.description = event.target.value; setDevice(device)}}/>
        <label>Address</label>
        <input type="text" id="address" name="address" onChange={(event: any) => {device.address = event.target.value; setDevice(device)}}/>
        <label>MaxHrEnergyConsumption</label>
        <input type="text" id="MaxHrEnergyConsumption" name="MaxHrEnergyConsumption" onChange={(event: any) => {device.maxHrEnergyConsumption = event.target.value; setDevice(device)}}/>
        <button type="button" onClick={() => createDevice()}>Create</button>
    </div>
}

export default DeviceForm;