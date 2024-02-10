import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, user }: { element: React.ReactNode }) {
  console.log("🚀 ~ ProtectedRoute ~ user:", user);
  useEffect(()=>{
    alert(JSON.stringify(user))
  })
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return element;
  }
}

export default ProtectedRoute;
