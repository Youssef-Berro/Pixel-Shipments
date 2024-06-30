import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getShipmentByWaybillRequest, updateShipmentRequest } from '../utils/queries';
import { checkError, isEmpty, isGetShipmentValidation, isShipmentValidation } from '../utils/validations';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { UserShipmentsContext } from '../App';
import TextFeild from '@mui/material/TextField'

function UpdateShipment() {
    const path = useNavigate();
    const {waybill} = useParams();
    const [loading, setLoading] = useState(true);
    const [shipment, setShipment] = useState(null);
    const {userShipments, setUserShipments} = useContext(UserShipmentsContext);


    useEffect(() => {
        if(!localStorage.getItem('user'))   path('/');
    }, [])

    useEffect(() => {
        const getShipment = async () => {
            setLoading(true);

            try {
                const resp = await getShipmentByWaybillRequest(waybill);
                const data = resp.data;
                setShipment(data.data);
            } catch(err) {
                const msg = err.response.data.msg;
                if(isGetShipmentValidation(msg))  return;

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Internal error, try again later',
                    showConfirmButton: false,
                    timer: 2000
                })
            } finally {
                setLoading(false);
            }
        }

        if(waybill)   getShipment();
    }, [waybill])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShipment(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSaveChanges = async () => {
        if(isEmpty(shipment.customerName, 'Customer Name') || 
            isEmpty(shipment.customerAddress, 'Customer Address') || 
            isEmpty(shipment.customerNb, 'Customer Number'))
                return;

        try{
            await updateShipmentRequest(waybill, shipment);
            Swal.fire({
                icon: 'success',
                title: 'Changes Saved',
                showConfirmButton: false,
                timer: 1000
            })

            const updatedShipments = userShipments.map( s =>  {
                return s.waybill == waybill ? shipment : s
            })

            setUserShipments([...updatedShipments])


            path('/homepage');
        }catch (err) {
            const msg = err.response.data.msg;
            checkError(msg, 'updateShipment');
        }
    }

    const goBack = () => {
        path(-1);
    }

    return (
        <>
            {shipment ? (
                <div className="bg-white text-black rounded-lg shadow-lg p-4">
                    <div className="flex flex-wrap flex-col space-y-3 mb-4">
                        <TextFeild
                            value={shipment.waybill}
                            readOnly
                            type="number"
                            id="outlined-basic" 
                            label="Waybill" 
                            variant="outlined"/>
                        <TextFeild
                            value={shipment.customerName}
                            name="customerName"
                            type="text"
                            onChange={handleInputChange}
                            id="outlined-basic" 
                            label="Customer Name" 
                            variant="outlined"/>
                        <TextFeild
                            value={shipment.customerAddress}
                            name="customerAddress"
                            type="text"
                            onChange={handleInputChange}
                            id="outlined-basic" 
                            label="customer Address" 
                            variant="outlined"/>
                        <TextFeild
                            value={shipment.customerNb}
                            name="customerNb"
                            type="number"
                            onChange={handleInputChange}
                            id="outlined-basic" 
                            label="customer Number" 
                            variant="outlined"/>
                    </div>
                    <div className='flex space-x-3 justify-end'>
                        <button
                            className='bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-zinc-900 transition duration-300'
                            onClick={handleSaveChanges}>Save Changes
                        </button>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition duration-300"
                            onClick={goBack}>Back
                        </button>
                    </div>
                </div>
            ) : loading ? (
                <div className="rounded-full border-t-black border-8 shadow-lg p-4 m-auto mt-16 h-16 w-16 animate-spin"></div>
            ) : (
                <div className="bg-white text-black rounded-lg shadow-lg p-4">
                    <p>You don't have a shipment with waybill {waybill}</p>
                    <button
                        className="bg-zinc-600 text-white py-2 px-4 rounded-lg shadow hover:bg-black mt-4 transition duration-300"
                        onClick={() => path('/')}>Go to Home Page
                    </button>
                </div>
            )}
        </>
    );
}

export default UpdateShipment