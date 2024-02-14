import { oneUserType } from "@/types/Alluser";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  element,
  user,
}: {
  element: React.ReactNode;
  user: oneUserType;
}) {
  useEffect(() => {
    alert(JSON.stringify(user));
  });
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return element;
  }
}

export default ProtectedRoute;
