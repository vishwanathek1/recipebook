import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const PRoutes = (props) => {

  const { user } = useContext(UserContext);
  const location = useLocation()
  return  user && user.loggedIn ? <Outlet /> : <Navigate to="/" replace state={{from: location}}/>;
};

export default PRoutes;