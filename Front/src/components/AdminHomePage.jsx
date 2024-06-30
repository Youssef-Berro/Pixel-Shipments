import React, { useContext, useEffect, useState } from "react";
import { RoleContext } from "../App";
import { getUsersDataRequest } from "../utils/queries";
import { Link } from "react-router-dom";
import { checkError } from "../utils/validations";

function AdminHomePage() {
    const [usersData, setUsersData] = useState([]);
    const {role} = useContext(RoleContext);


    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const resp = await getUsersDataRequest(role);
                const data = resp.data;
                setUsersData(data.data);
            }catch(err) {
                const msg = err.response.data.msg;
                checkError(msg);
            }
        }

        fetchUsersData();
    }, [])


    return (
        <div className="bg-gray-200 space-y-3 shadow-lg pt-4 px-10">
            <div className="flex sm:w-11/12 w-full m-auto justify-between sm:text-lg text-md text-center mt-4 uppercase font-semibold">
                <p>Email</p>
                <p>Number of Shipments</p>
            </div>
            {usersData.length !== 0 && (
                <div className="space-y-2 pb-4">
                    {usersData.map((user, index) => (
                        <Link
                            to={`/admin/shipments/${user.email}`}
                            className="sm:text-md text-sm flex justify-between bg-gray-100 py-2 px-3 rounded-md"
                            key={index}> 
                                <p>{user.email}</p>
                                <p className="sm:mr-36 mr-20">{user.shipmentCount}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminHomePage
