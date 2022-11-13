import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
    const location =useLocation();
  const token = useSelector((store) => store.AuthReducer.token);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" state={{from: location}} replace />; 
  }
}



export default RequireAuth;