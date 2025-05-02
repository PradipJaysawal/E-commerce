import { useContext } from "react"
import { AdminAuthContext } from "../context/AdminAuth"
import { Navigate } from "react-router-dom";
import { adminRole, adminToken, userToken } from "../common/http";

export const AdminRequireAuth = ({children}) => {
    const {user} = useContext(AdminAuthContext);

    if (localStorage.getItem('adminInfo') === null)
    {
        return <Navigate to={`/account/login`} />
    }
    if(adminRole() !== 'admin')
    {
        return <Navigate to={`/`} />
    }
    return children;
}