import { useState, useEffect } from "react";

function usePersistedRole(defaultRole) {
    const [role, setRole] = useState(() => {
        const storedRole = localStorage.getItem("role");
        return storedRole ? storedRole : defaultRole;
    });

    useEffect(() => {
        localStorage.setItem("role", role);
    }, [role]);

    return [role, setRole];
}

export default usePersistedRole
