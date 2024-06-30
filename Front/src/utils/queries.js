import axios from 'axios'
import { getUserToken } from './functions'

async function logInRequest(email, password) {
    return await axios.post('http://localhost:3000/api/users/log-in', {email, password})
}

async function registerRequest(email, password, passwordConfirm) {
    return await axios.post('http://localhost:3000/api/users/register', {email, password, passwordConfirm})
}

async function getUserShipmentsRequest(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const url = `http://localhost:3000/api/shipments/get-user-shipments${query ? `?${query}` : ''}`;

    return await axios.get(url, {
        headers: { Authorization: `Bearer ${getUserToken()}` }
    });
}

async function getShipmentByWaybillRequest(waybill) {
    return await axios.get(`http://localhost:3000/api/shipments/get-shipment-by-waybill/${waybill}`, {
        headers: { Authorization: `Bearer ${getUserToken()}`}
    })
}

async function createShipmentRequest(waybill, customerName, customerAddress, customerNb) {
    return await axios.post('http://localhost:3000/api/shipments/create-shipment', {
        waybill, customerName, customerAddress, customerNb }, {
            headers: { Authorization: `Bearer ${getUserToken()}`} 
        });
}

async function deleteShipmentRequest(waybill) {
    await axios.delete(`http://localhost:3000/api/shipments/delete-shipment/${waybill}`, {
            headers: {
                Authorization: `Bearer ${getUserToken()}`
            }
        });
}

async function deleteAccountRequest() {
    await axios.delete('http://localhost:3000/api/users/delete-user', {
        headers: { Authorization: `Bearer ${getUserToken()}`}
    })
}

async function updateShipmentRequest(waybill, shipmentData) {
    return await axios.patch(`http://localhost:3000/api/shipments/update-shipment/${waybill}`, shipmentData, {
        headers: { Authorization: `Bearer ${getUserToken()}`}
    });
}

async function getUsersDataRequest(role = 'user') {
    if(role !== 'admin')    return null;

    return await axios.get('http://localhost:3000/api/admins/get-all-users', {
        headers: { Authorization: `Bearer ${getUserToken()}`}
    })
}

async function getSingleUserShipmentsRequest(userEmail, role = 'user') {
    if(role !== 'admin')    return null;

    return await axios.get(`http://localhost:3000/api/admins/get-user-data/${userEmail}`, {
        headers: { Authorization: `Bearer ${getUserToken()}`}
    })
}


export {
    logInRequest,
    getUserShipmentsRequest,
    registerRequest,
    getShipmentByWaybillRequest,
    createShipmentRequest,
    deleteShipmentRequest,
    deleteAccountRequest,
    updateShipmentRequest,
    getUsersDataRequest,
    getSingleUserShipmentsRequest
}