import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { deleteShipmentRequest } from '../utils/queries';
import { formatDate } from '../utils/functions';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { UserShipmentsContext } from '../App';
import { checkError } from '../utils/validations';

function SingleShipment({ waybill, customerName, customerAddress, customerNb, createdAt, index }) {
    const {userShipments, setUserShipments} = useContext(UserShipmentsContext);


    const handleDeleteShipment = async () => {
        const confirmationResult = await Swal.fire({
            title: `Are you sure you want to delete the shipment with waybill ${waybill}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button'
            },
            buttonsStyling: false
        })

        if(confirmationResult.isConfirmed) {
            try{
                await deleteShipmentRequest(waybill);
                setUserShipments(userShipments.filter(s => s.waybill !== waybill));

                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Shipment Deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
            }catch(err) {
                const msg = err.response.data.msg;
                checkError(msg);
            }
        }
    }

    return (
        <div className="mx-auto w-11/12 bg-white shadow-xl rounded-2xl overflow-hidden max-w-11/12">
            <Link 
                to={`/shipment/view/${waybill}`} 
                className="block px-6 py-4">
                    <h2 className="font-bold text-center text-xl mb-2 text-black">Shipment {index + 1}</h2>
                    <p className="text-black text-base">
                        <strong>Waybill:</strong> {waybill}
                    </p>
                    <p className="text-black text-base truncate">
                        <strong>Customer Name:</strong> {customerName}
                    </p>
                    <p className="text-black text-base truncate">
                        <strong>Customer Address:</strong> {customerAddress}
                    </p>
                    <p className="text-black text-base truncate">
                        <strong>Customer Number:</strong> {customerNb}
                    </p>
                    <p className="text-black text-base truncate">
                        <strong>Created At:</strong> {formatDate(createdAt)}
                    </p>
            </Link>
            <div className="px-6 py-4 flex justify-between">
                <Link
                    className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-zinc-900 transition duration-300"
                    to={`/shipment/update/${waybill}`}>Edit
                </Link>
                <button 
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                    onClick={handleDeleteShipment}>Delete
                </button>
            </div>
        </div>
    );
}

export default SingleShipment
