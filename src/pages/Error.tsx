import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate=useNavigate()
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] h-80 sm:w-[60%] md:w-[50%] lg:w-[40%]  flex items-center justify-center border border-ternary outline outline-ternary outline-offset-8 flex-col gap-7">
        <h1 className="text-5xl font-bold">404 Page not found</h1>
        <Button className="w-[50%] h-12 bg-ternary text-white text-lg capitalize hover:bg-blue-700" onClick={()=>navigate('/')}>back to home page</Button>
      </div>
    </main>
  );
}
export default ErrorPage;
