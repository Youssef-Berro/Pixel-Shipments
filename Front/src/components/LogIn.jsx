import React, {useContext, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logInRequest } from '../utils/queries';
import { setUserData } from '../utils/functions';
import {checkError, isEmpty, isValidEmail} from '../utils/validations';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { RoleContext, UserDataContext } from '../App';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function LogIn() {
    const path = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {setUser} = useContext(UserDataContext);
    const {setRole} = useContext(RoleContext);


    useEffect(() => {
        if(localStorage.getItem('user'))   path('/homepage');
    }, [])



    const logIn = async () => {
        if(isEmpty(email, 'email') || isEmpty(password, 'password') || !isValidEmail(email))  return;

        try {
            const resp = await logInRequest(email, password);
            const data = resp.data;
            setUserData(data.data);
            setUser(data.data);
            setRole(data.data.role);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login successfully',
                showConfirmButton: false,
                timer: 1000
            })
            path('/homepage');
        }catch(err) {
            const msg = err.response.data.msg;
            checkError(msg, 'login');
        }
    }

    return (
        <div className="reg-log bg-white text-black min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-gray-600 text-white p-8 rounded shadow-lg w-full max-w-sm">
                <p className="text-2xl font-bold mb-6 text-center">Log In</p>
                <div className="flex relative flex-col space-y-4">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="p-3 bg-gray-200 text-black rounded border-none border-gray-400 focus:outline-none"/>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="p-3 bg-gray-200 text-black rounded border border-gray-400 focus:outline-none"/>
                        { showPassword ? (
                            <VisibilityOffOutlinedIcon
                                className='absolute right-3 top-16 text-black cursor-pointer'
                                onClick={() => setShowPassword(false)}/>
                        ) : (
                            <RemoveRedEyeOutlinedIcon
                                className='absolute right-3 top-16 text-black cursor-pointer'
                                onClick={() => setShowPassword(true)}/>
                        )}
                    <button
                        onClick={logIn}
                        className='bg-gray-500 self-center w-1/2 p-1 rounded items-center'>Submit
                    </button>
                </div>
                <div className="mt-6 text-center">
                    <Link to='/register' className="text-white underline hover:text-gray-400 transition duration-300">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
