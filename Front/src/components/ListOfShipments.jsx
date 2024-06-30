import React, { useContext, useEffect } from 'react';
import SingleShipment from './SingleShipment';
import { getUserShipmentsRequest } from '../utils/queries';
import { UserShipmentsContext } from '../App';
import { checkError } from '../utils/validations';


function ListOfShipments() {
    const {userShipments, setUserShipments} = useContext(UserShipmentsContext);

    useEffect(() => {
        const getShipments = async () =>  {
            try {
                const resp = await getUserShipmentsRequest();
                const data = resp.data;
                setUserShipments(data.data);
            }catch(err) {
                const msg = err.response.data.msg;
                checkError(msg);
            }
        }

        getShipments();
    }, [])

    return (
        <div className='bg-gray-200 shadow-lg p-4'>
            <div className='text-3xl text-center mb-8 mt-4 uppercase font-semibold'>Your Shipments</div>
            {userShipments.length !== 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4'>
                    {userShipments.map((shipment, index) => (
                        <SingleShipment
                            index={index}
                            key={index}
                            waybill={shipment.waybill}
                            customerName={shipment.customerName}
                            customerAddress={shipment.customerAddress}
                            customerNb={shipment.customerNb}
                            createdAt={shipment.createdAt}/>
                    ))}
                </div>
                ) : (
                    <p className='text-gray-600 text-xl sm:text-2xl md:text-3xl mt-10 md:mt-28 opacity-25 text-center'>No Shipments</p>
                )}
        </div>
    );
}

export default ListOfShipments