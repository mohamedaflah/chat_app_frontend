import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthProtectedRoutes({ element }: { element: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user);
  if (!user?.user) {
    return element;
  } else {
    <Navigate to={"/"} />;
  }
}
export default AuthProtectedRoutes;
