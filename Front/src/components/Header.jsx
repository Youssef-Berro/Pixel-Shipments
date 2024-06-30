import React, { useContext, useEffect, useState } from 'react';
import logo from './../../public/logo.png';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { RoleContext, UserDataContext, UserShipmentsContext } from '../App';
import { deleteAccountRequest, getUserShipmentsRequest } from '../utils/queries';
import { removeUserData } from '../utils/functions';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { checkError } from '../utils/validations';

function Header() {
    const path = useNavigate();
    const location = useLocation();
    const [expandSettings, setExpandSettings] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [waybillSearch, setWaybillSearch] = useState('');
    const [customerNameSearch, setCustomerNameSearch] = useState('');
    const [customerAddressSearch, setCustomerAddressSearch] = useState('');
    const [customerNbSearch, setCustomerNbSearch] = useState('');
    const [filtersearch, setFilterSearch] = useState(false);
    const {setUser} = useContext(UserDataContext);
    const {role, setRole} = useContext(RoleContext);
    const {setUserShipments} = useContext(UserShipmentsContext);



    const handleLogOut = async () => {
        try {
            removeUserData();
            setUserShipments([]);
            setUser(null);
            setOpenSearch(false);
            setFilterSearch(false);
            setWaybillSearch('');
            setCustomerNameSearch('');
            setCustomerAddressSearch('');
            setCustomerNbSearch('')
            setRole('guest');

            path('/');
        }catch(err) {
            const msg = err.response.data.msg;
            checkError(msg);
        }
    }

    const handleDeleteAccount = async () => {
        const confirmationResult = await Swal.fire({
            title: `If you delete your account all your shipments will be deleted.\n Are you sure?`,
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
                await deleteAccountRequest();
                removeUserData();
                setUserShipments([]);
                setUser(null);
                setOpenSearch(false);
                setFilterSearch(false);
                setWaybillSearch('');
                setCustomerNameSearch('');
                setCustomerAddressSearch('');
                setCustomerNbSearch('');
                setRole('guest');

                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Account Deleted',
                    showConfirmButton: false,
                    timer: 1000
                })
                path('/register');
            }catch(err) {
                const msg = err.response.data.msg;
                checkError(msg);
            }
        }
    }

    const handleSearch = async () => {
        const filters = {}
        if(waybillSearch)  filters['waybill'] = waybillSearch;
        if(customerNbSearch)    filters['customerNb'] = customerNbSearch;
        if(customerNameSearch.length !== 0)  filters['customerName'] = customerNameSearch;
        if(customerAddressSearch.length !== 0)  filters['customerAddress'] = customerAddressSearch;
        if(Object.keys(filters).length === 0) {
            return;
        }

        try {
            const resp = await getUserShipmentsRequest(filters);
            const data = resp.data;
            setUserShipments(data.data);
            setOpenSearch(false);
            setFilterSearch(true);
        }catch(err) {
            const msg = err.response.data.msg;
            checkError(msg);
        }
    }

    const handleCancelSearch = async () => {
        try {
            const resp = await getUserShipmentsRequest();
            const data = resp.data;
            setUserShipments(data.data);
            setFilterSearch(false);
            setWaybillSearch('');
            setCustomerNameSearch('');
            setCustomerAddressSearch('');
            setCustomerNbSearch('')
        } catch(err) {
            const msg = err.response.data.msg;
            checkError(msg);
        }
    }


    useEffect(() => {
        const body = document.querySelector("body");
        if (openSearch) {
            body.style.overflow = "hidden";
            body.style.position = "fixed";
            body.style.top = "0px";
            body.style.width = "100%";
        } else {
            body.style.overflow = "auto";
            body.style.position = "static";
            body.style.top = "auto";
            body.style.width = "auto";
        }
    }, [openSearch]);


    return (
        <>
            <div className="bg-gray-600  p-4 shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-4 w-1/2">
                    <Link to='/homepage'>
                            <img src={logo} alt="Shipment Logo" className="ml-5 h-14 w-16" />
                    </Link>
                    {location.pathname.startsWith('/admin/shipments/') && (
                        <button 
                            className="bg-white text-black py-2 px-4 rounded hover:bg-zinc-400 transition duration-300"
                            onClick={() => path(-1)}>Back
                        </button>
                    )}
                    {role !== 'admin' && (
                        filtersearch ? (
                            <button
                                className='text-black bg-white p-2 rounded text-xs sm:text-base'
                                onClick={handleCancelSearch}>
                                Cancel Search
                            </button>
                        ) : (
                            <SearchOutlinedIcon
                                onClick={() => setOpenSearch(true)}
                                className='text-white cursor-pointer' />
                        )
                    )}
                </div>
                <div className="flex space-x-4 items-center">
                    {role !== 'admin' && (
                        location.pathname !== '/shipment/create' && (
                            <>
                                <button 
                                    className="hidden sm:block bg-white text-black py-2 px-4 rounded hover:bg-zinc-400 transition duration-300"
                                    onClick={() => path('/shipment/create')}>Create Shipment
                                </button>
                                <div className='sm:hidden cursor-pointer block'>
                                    <AddIcon
                                        className='text-white'
                                        onClick={() => path('/shipment/create')} />
                                </div>
                            </>
                        )
                    )}
                    {expandSettings && (
                        <div className="absolute flex flex-wrap flex-col z-10 top-16 right-0 bg-gray-600 text-white p-4 rounded-bl-lg shadow-lg">
                            <CloseIcon
                                className='text-white cursor-pointer self-end'
                                onClick={() => setExpandSettings(false)}/>
                            <div className="space-y-4">
                                <button
                                    className="w-4/5 p-2 bg-white text-black text-xs rounded-lg hover:bg-zinc-400 transition duration-300"
                                    onClick={handleLogOut}>Log Out
                                </button>
                                <button
                                    className="w-4/5 text-xs p-2 text-white bg-red-500 rounded-lg hover:bg-red-700 transition duration-300"
                                    onClick={handleDeleteAccount}>Delete Account
                                </button>
                            </div>
                        </div>
                    )}
                    <MenuOutlinedIcon 
                        className='text-white cursor-pointer'  
                        onClick={() => setExpandSettings(!expandSettings)}/>
                </div>
            </div>
            {openSearch && (
                <div
                    className='overflow-hidden rounded-xl bg-white shadow-xl absolute p-5 z-20 w-4/5 sm:w-3/5 translate-x-10 sm:translate-x-1/3 translate-y-1/5 h-60vh md:h-45vh lg:h-40vh sm:h-55vh'>
                    <div className='flex justify-between mb-3'>
                        <div className='text-xl uppercase'>Search</div>
                        <CloseIcon
                            className='cursor-pointer'
                            onClick={() => setOpenSearch(false)}/>
                    </div>
                    <div className='flex flex-wrap flex-col space-y-3'>
                        <div className='grid gap-y-2 md:grid-cols-2 md:gap-x-2'>
                            <TextField
                                type="number"
                                onChange={(e) => setWaybillSearch(e.target.value)}
                                id="outlined-basic" 
                                label="Waybill" 
                                variant="outlined"/>
                            <TextField
                                type="text"
                                onChange={(e) => setCustomerNameSearch(e.target.value)}
                                id="outlined-basic" 
                                label="Customer Name" 
                                variant="outlined"/>
                            <TextField
                                type="text"
                                onChange={(e) => setCustomerAddressSearch(e.target.value)}
                                id="outlined-basic" 
                                label="Customer Address" 
                                variant="outlined"/>
                            <TextField
                                type="number"
                                onChange={(e) => setCustomerNbSearch(e.target.value)}
                                id="outlined-basic" 
                                label="Customer Number" 
                                variant="outlined"/>
                        </div>
                        <button
                            className='bg-gray-600 p-2 justify-self-end text-white w-fit px-3 rounded hover:bg-zinc-900 transition duration-300'
                            onClick={handleSearch}>Search</button>
                    </div>
                </div>)
            }
            {openSearch && 
                <div
                    style={{height: '110vh'}}
                    className='bg-black opacity-60 -mt-24 absolute w-full z-10' 
                    onClick={() => setOpenSearch(false)} >
                </div>
            }
        </>
    );
}

export default Header;
