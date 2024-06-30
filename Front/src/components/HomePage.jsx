import React, { useContext, useEffect } from "react";
import { RoleContext } from "../App";
import ListOfShipments from "./ListOfShipments";
import AdminHomePage from "./AdminHomePage";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const path = useNavigate();
    const {role} = useContext(RoleContext);

    useEffect(() => {
        if(!localStorage.getItem('user'))   path('/');
    }, []);

    return (
        <>
            {role === 'user' ? (
                <ListOfShipments />
            ) : (
                <AdminHomePage />
            )}
        </>
    )
}

export default HomePage
