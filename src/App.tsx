import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Signup } from "./pages/user/Signup";
import { Login } from "./pages/user/Login";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication } from "./redux/actions/User/authAction";
import { RootState } from "./redux/store";
import MobileChatUI from "./pages/user/MobileChat";
import { Toaster } from "@/components/ui/toaster"
import ErrorPage from "./pages/Error";
const Chat = lazy(() => import("./pages/user/Chat"));

function App() {
  
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state?.user?.user); // Adjust RootState based on your actual state structure
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const fetchAuthentication = async () => {
      await dispatch(checkAuthentication());
      setLoading(false);
    };
    fetchAuthentication();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  if (loading) {
    // Return a loading indicator or null while authentication check is in progress
    return null;
  }

  return (
    <main className="overflow-hidden">
      
      <Toaster/>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route
              path="/"
              element={user?.user ? <Chat /> : <Navigate to="/login" />}
            >
              {/* <Route
                path="mobile"
                element={isMobile ?<MobileChatUI />:  <Navigate to="/" />}
                /> */}
            </Route>
            <Route
              path="/signup"
              element={user?.user ? <Navigate to={"/"} /> : <Signup />}
            />
            <Route
              path="/login"
              element={user?.user ? <Navigate to={"/"} /> : <Login />}
            />
            <Route
                path="/mobile"
                element={isMobile ?<MobileChatUI />:  <Navigate to="/" />}
            />
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </main>
  );
}

export default App;
