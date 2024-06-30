import './App.css'
import React, { createContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import LogIn from './components/LogIn'
import UpdateShipment from './components/UpdateShipment'
import Header from './components/Header'
import { getUserData } from './utils/functions'
import ViewSingleShipment from './components/ViewSingleShipment'
import CreateShipment from './components/CreateShipment'
import HomePage from './components/HomePage'
import usePersistedRole from './utils/usePersistedRole'
import SingleUserShipments from './components/SingleUserShipments'

const UserDataContext = createContext();
const UserShipmentsContext = createContext();
const RoleContext = createContext();

function App() {
    const [user, setUser] = useState(null);
    const [userShipments, setUserShipments] = useState([]);
    const [role, setRole] = usePersistedRole('guest');

    useEffect(() => {
        setUser(getUserData());
    }, [])


    return (
        <>
        <UserShipmentsContext.Provider value={{userShipments, setUserShipments}}>
        <UserDataContext.Provider value={{user, setUser}}>
        <RoleContext.Provider value={{role, setRole}}>
            {user && <Header />}
            <Routes>
                <Route path='/' element={<LogIn/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/homepage' element={<HomePage />} />
                <Route path='/shipment/view/:waybill' element={<ViewSingleShipment/>} />
                <Route path='/shipment/create' element={<CreateShipment/>} />
                <Route path='/shipment/update/:waybill' element={<UpdateShipment/>} />
                <Route path='/admin/shipments/:email' element={<SingleUserShipments />}/>
            </Routes>
            <ToastContainer position="top-center"  autoClose={2000}/>
        </RoleContext.Provider>
        </ UserDataContext.Provider>
        </UserShipmentsContext.Provider>
        </>
    )
}

export {
    App,
    UserDataContext,
    UserShipmentsContext,
    RoleContext
}
