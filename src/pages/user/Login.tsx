import { loginFormSchema } from "@/Schema/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/actions/User/authAction";
import { userloginCredentials } from "@/types/userAuth";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/redux/store";

export const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {toast}=useToast()
  const {loading}=useSelector((state:RootState)=>state.user)
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const userCredentials:userloginCredentials={
      email:values.email,
      password:values.password
    }
    dispatch(loginUser(userCredentials)).then((res:{payload:{status:boolean}}) => {
     
      if(res?.payload?.status){
        toast({description:"Login Succesfull"})
        navigate('/')
      }
      
    })
  }
  return (
    <div className="darkBg w-full h-screen flex items-center justify-center">
      <div className="form w-[95%] border p-5 rounded-md sm:w-[60%] lg:w-[28%] mx-auto">
        {/* <h1 className="text-center text-3xl mb-5 font-semibold">Create An Account</h1> */}
        <h1 className="text-center text-3xl mb-5 font-semibold">Welcome back</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" flex flex-col  items-start">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email here.." {...field} type="email" />
                  </FormControl>
                  <FormDescription>
                    This is your public display email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className=" flex flex-col  items-start">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter you password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between w-full">
                    <span>This is your Securable password</span>
                    <Link
                      to={"/signup"}
                      className="text-blue-400 hover:text-blue-600 cursor-pointer"
                    >
                      Signup
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={`w-full font-semibold text-1xl ${loading&&"pointer-events-none bg-gray-400"}`}>
              {loading?"Processing...":"Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
