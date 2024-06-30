import { toast } from "react-toastify"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const isEmpty = (attrbVal, attrbName) => {
    if(attrbVal.length === 0) {
        toast.error(`${attrbName} cannot be empty`);
        return true;
    }

    return false;
}

const equalFields = (feild1, feild2, feild1Name, feild2Name) => {
    if(feild1 !== feild2) {
        toast.error(`${feild1Name} and ${feild2Name} must be the same`);
        return false;
    }

    return true;
}

const isUniqueValidation = (msg, value) => {
    if(msg.includes('must be unique')) {
        toast.error(`${value} are already used`);
        return true;
    }

    return false;
}

const isPasswordValidation = (msg) => {
    if(msg.includes('Password must contain at least 8 characters') ||
        msg.includes('Password must contain numbers and special characters')) {
            toast.error(msg);
            return true;
    }

    return false;
}

const isGetShipmentValidation = (msg) => {
    return msg.includes("doesn't have shipment with waybill");
}

const isShipmentValidation = (msg) => {
    if(msg.includes('Customer number must be exactly')) {
        toast.error("Customer number must be exactly 8 characters long");
        return true;
    }
    else if(msg.includes('must be unique')) {
        toast.error('waybill must be unique');
        return true;
    }

    return false;
}

const isMoreThanMaxNum = (attrbVal, maxNum, attrbName) => {
    if(attrbVal >= maxNum) {
        toast.error(`${attrbName} must be lower than ${maxNum}`)
        return true;
    }

    return false;
}


const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)) {
        toast.error('enter a valid email address')
        return false;
    }

    return true;
}

const isNegativeNum = (attrbVal, attrbName) => {
    if(attrbVal <= 0) {
        toast.error(`${attrbName} cannot be negative or 0`);
        return true;
    }

    return false;
}


const checkError = (msg, requestType = 'default', ...restParams) => {
    const showError = (text) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: text,
        showConfirmButton: false,
        timer: 2000
    })}


    const errorMessages = {
        'too many requests': 'Too many requests in a short time\nTry again later',
        'login': 'Incorrect email or password',
        'default': 'Internal error\nTry again later'
    };

    const validations = {
        'register': [isUniqueValidation, isPasswordValidation],
        'createShipment': [isShipmentValidation],
        'updateShipment': [isShipmentValidation],
        'getShipment': [isGetShipmentValidation]
    };


    if(msg.includes('too many request in short time'))  showError(errorMessages['too many requests']);
    else if(validations[requestType]) {
        const validationFcts = validations[requestType];
        for(const validate of validationFcts)
            if(validate(msg, ...restParams)) 
                return;

        showError(errorMessages['default']);
    }
    else if(requestType === 'login') showError(errorMessages['login']);
    else  showError(errorMessages['default']);
}


export {
    isEmpty,
    equalFields,
    isUniqueValidation,
    isPasswordValidation,
    isGetShipmentValidation,
    isMoreThanMaxNum,
    isNegativeNum,
    isShipmentValidation,
    isValidEmail,
    checkError
}