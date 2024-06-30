function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}


function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
}


function removeUserData() {
    localStorage.removeItem('user');
}


function getUserEmail() {
    return JSON.parse(localStorage.getItem('user')).email;
}

function getUserToken() {
    return JSON.parse(localStorage.getItem('user')).token;
}

function formatDate(isoDate) {
    const date = new Date(isoDate);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}


function readRequiredData(data) {
    return {
        waybill: data.waybill,
        userEmail: data.userEmail,
        customerName: data.customerName,
        customerAddress: data.customerAddress,
        customerNb: data.customerNb,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
}


export {
    getUserData,
    setUserData,
    removeUserData,
    getUserEmail,
    getUserToken,
    formatDate,
    readRequiredData
}