import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUserShipmentsRequest } from "../utils/queries";
import { RoleContext } from "../App";
import { formatDate } from "../utils/functions";
import { checkError } from "../utils/validations";

function SingleUserShipments() {
    const path = useNavigate();
    const {email} = useParams();
    const {role} = useContext(RoleContext);
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        if(!localStorage.getItem('user'))   path('/');

        const fetchUserShipments = async () => {
            try {
                const resp = await getSingleUserShipmentsRequest(email, role);
                const data = resp.data;
                setShipments(data.data);
            }catch(err) {
                const msg = err.response.data.msg;
                checkError(msg);
            }
        }

        fetchUserShipments();
    }, [])


    return (
        <div className=' bg-gray-200 shadow-lg p-4'>
            <div className='text-lg sm:text-xl md:text-2xl text-center mb-8 mt-4 font-semibold'>
                {email} Shipments
            </div>
            {shipments.length !== 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4'>
                    {shipments.map((shipment, index) => (
                        <div
                            key={index}
                            className="mx-auto w-11/12 bg-white shadow-xl rounded-2xl overflow-hidden max-w-11/12 px-6 py-4">
                                <h2 
                                    className="font-bold text-center text-xl mb-2 text-black">
                                        Shipment {index + 1}
                                </h2>
                                <p className="text-black text-base">
                                    <strong>Waybill:</strong> {shipment.waybill}
                                </p>
                                <p className="text-black text-base truncate">
                                    <strong>Customer Name:</strong> {shipment.customerName}
                                </p>
                                <p className="text-black text-base truncate">
                                    <strong>Customer Address:</strong> {shipment.customerAddress}
                                </p>
                                <p className="text-black text-base truncate">
                                    <strong>Customer Number:</strong> {shipment.customerNb}
                                </p>
                                <p className="text-black text-base truncate">
                                    <strong>Created At:</strong> {formatDate(shipment.createdAt)}
                                </p>
                        </div>
                    ))}
                </div>
                ) : (
                    <p className='text-gray-600 text-xl sm:text-2xl md:text-3xl mt-10 md:mt-28 opacity-25 text-center'>No Shipments</p>
                )}
        </div>
    )
}

export default SingleUserShipments
