import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Signup } from "./pages/user/Signup";
import { Login } from "./pages/user/Login";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { store } from "./redux/store"; // Assuming you have a RootState type defined
import { checkAuthentication } from "./redux/actions/User/authAction";
import { RootState } from "./redux/store";

const Chat = lazy(() => import("./pages/user/Chat"));

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state:RootState) => state?.user?.user); // Adjust RootState based on your actual state structure
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthentication = async () => {
      await dispatch(checkAuthentication());
      setLoading(false);
    };

    fetchAuthentication();
  }, [dispatch]);

  if (loading) {
    // Return a loading indicator or null while authentication check is in progress
    return null;
  }

  return (
    <main className="overflow-hidden">
      <Toaster position="top-center" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route
              path="/"
              element={user?.user ? <Chat /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={user?.user ? <Navigate to={"/"} /> : <Signup />}
            />
            <Route
              path="/login"
              element={user?.user ? <Navigate to={"/"} /> : <Login />}
            />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </main>
  );
}

export default App;
