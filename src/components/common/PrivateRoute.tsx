import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LocalStorage } from "../../utils/Helper";

function PrivateRoute() {
  let auth = LocalStorage();
  
  return Object.keys(auth).length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/" }} />
  );
}

export default PrivateRoute;
