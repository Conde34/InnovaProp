import { Outlet, Navigate } from "react-router-dom"

const PrivateRoute = () => {

    const permiso = true

    return permiso ? <Outlet /> : <Navigate to={'/'} replace/>
}

export default PrivateRoute