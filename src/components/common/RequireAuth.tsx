import React, { memo } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { LocalStorage } from '../../utils/Helper';

interface componentProps {
    allowedRoles: string[]
}

const RequireAuth: React.FC<componentProps> = ({ allowedRoles }) => {
    
    const auth: any = LocalStorage();

    return (
        allowedRoles?.includes(auth.role)
            ? <Outlet />
            : Object.keys(auth).length > 0
                ? <Navigate to={{ pathname: "/unauthorized" }} />
                : <Navigate to={{ pathname: "/" }} />
    )
}

export default memo(RequireAuth);