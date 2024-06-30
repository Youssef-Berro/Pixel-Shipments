import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isShipmentValidation, isEmpty, isNegativeNum, checkError } from '../utils/validations';
import { createShipmentRequest } from '../utils/queries';
import { readRequiredData } from '../utils/functions';
import { UserShipmentsContext } from '../App';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import TextFeild  from '@mui/material/TextField';

function CreateShipment() {
    const path = useNavigate();
    const [waybill, setWaybill] = useState('');
    const [customerName, setCustomerName] = useState(''); 
    const [customerAddress, setCustomerAddress] = useState(''); 
    const [customerNb, setCustomerNb] = useState('');
    const {userShipments, setUserShipments} = useContext(UserShipmentsContext);


    useEffect(() => {
        if(!localStorage.getItem('user'))   path('/');
    }, [])

    const goToPrevPage = () => {
        path(-1);
    }

    const handleCreateShipment = async () => {
        if(isEmpty(waybill, 'Waybill') || isEmpty(customerName, 'Customer Name') || 
            isEmpty(customerAddress, 'Customer Address') || isEmpty(customerNb, 'Customer Number') || 
            isNegativeNum(waybill, 'Waybill'))
                return;

        try {
            const resp = await createShipmentRequest(waybill, customerName, customerAddress, customerNb);
            const data = resp.data;
            const newShipment = readRequiredData(data.data);

            setUserShipments([...userShipments, newShipment]);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Shipment Created',
                showConfirmButton: false,
                timer: 1000
            })

            path('/homepage');
        }catch(err) {
            const msg = err.response.data.msg;
            checkError(msg, 'createShipment');
        }
    }


    return (
        <>
            <div className="bg-white text-black rounded-lg shadow-lg p-4">
                <div className="text-xl font-bold mb-4">Create Shipment</div>
                <div className="flex flex-wrap flex-col space-y-3 mb-4">
                    <TextFeild
                        required={true}
                        type="number"
                        onChange={(e) => setWaybill(e.target.value)}
                        id="outlined-basic" 
                        label="Waybill" 
                        variant="outlined"/>
                    <TextFeild
                        required={true}
                        type="text"
                        onChange={(e) => setCustomerName(e.target.value)}
                        id="outlined-basic" 
                        label="Customer Name" 
                        variant="outlined"/>
                    <TextFeild
                        required={true}
                        type="text"
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        id="outlined-basic" 
                        label="Customer Address" 
                        variant="outlined"/>
                    <TextFeild
                        required={true}
                        type="number"
                        onChange={(e) => setCustomerNb(e.target.value)}
                        id="outlined-basic" 
                        label="Customer Number" 
                        variant="outlined"/>
                </div>
                <div className="flex space-x-3 justify-end">
                    <button
                        className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow hover:bg-zinc-900 transition duration-300"
                        onClick={handleCreateShipment}>Create
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition duration-300"
                        onClick={goToPrevPage}>Cancel
                    </button>
                </div>
            </div>
            <div className='lg:w-3/5 flex justify-start m-auto content-center items-center flex-wrap p-14 lg:text-xl text-gray-400 opacity-60'>
                <p>
                    • waybill value must be unique, for example if you have a shipment with waybill = 5,
                    so you cannot create a new shipment with waybill = 5 <br />
                </p>
                <p>
                    • the customer number must be a lebanese number, means of 8 numbers
                </p>
            </div>
        </>
    );
}

export default CreateShipment