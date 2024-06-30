import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShipmentByWaybillRequest } from '../utils/queries';
import { checkError, isGetShipmentValidation } from '../utils/validations';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function ViewSingleShipment() {
    const path = useNavigate();
    const {waybill} = useParams();
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);


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
                checkError(msg, 'getShipment');
            } finally {
                setLoading(false);
            }
        }

        if(waybill)   getShipment();
    }, [waybill])

    const goBack = () => {
        path(-1);
    }

    return (
        <>
            {shipment ? (
                <div className="bg-white text-black rounded-lg shadow-lg p-4">
                    <div className="mb-4">
                        <p><strong>Waybill:</strong>{shipment.waybill}</p>
                        <p><strong>Customer Name:</strong> {shipment.customerName}</p>
                        <p><strong>Customer Address:</strong> {shipment.customerAddress}</p>
                        <p><strong>Customer Number:</strong> {shipment.customerNb}</p>
                    </div>
                    <button
                        className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-900 transition duration-300"
                        onClick={goBack}>Back
                    </button>
                </div>
            ) : loading ? (
                <div className="rounded-full border-t-black border-8 shadow-lg p-4 m-auto mt-16 h-16 w-16 animate-spin"></div>
            ) : (
                <div className="bg-white text-black rounded-lg shadow-lg p-4">
                    <p>You don't have a shipment with waybill {waybill}</p>
                    <button
                        className="bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-900 mt-4 transition duration-300"
                        onClick={() => path('/homepage')}>Go to Home Page
                    </button>
                </div>
            )}
        </>
    );
}

export default ViewSingleShipment