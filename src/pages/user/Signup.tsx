/* eslint-disable @typescript-eslint/no-explicit-any */
import { formSchema } from "@/Schema/SignupSchema";
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
// import axiosInstance from "@/constant/constant";
// import toast from "react-hot-toast";
import { userData } from "@/types/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/redux/actions/User/authAction";
import toast from "react-hot-toast";
export const Signup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: any) => state.user);
  function onSubmit(values: z.infer<typeof formSchema>) {
    const userCredentials: userData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    dispatch(signupUser(userCredentials))
      .then((res: any) => {
        console.log("🚀 ~ .then ~ res:", res.payload)
        if (res?.payload?.status) {
          toast.success(res?.payload?.message);
          navigate("/");
        }
      })
      .catch((err: any) => {
        console.log(err, " Err");
      });
  }
  return (
    <div className="darkBg w-full h-screen flex items-center justify-center">
      <div className="form w-[95%] border p-5 rounded-md sm:w-[60%] lg:w-[28%] mx-auto">
        {/* <h1 className="text-center text-3xl mb-5 font-semibold">Create An Account</h1> */}
        <h1 className="text-center text-3xl mb-5 font-semibold">
          Create An Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className=" flex flex-col  items-start">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username here.."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" flex flex-col  items-start">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email here.." {...field} />
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
                      to={"/login"}
                      className="text-blue-400 hover:text-blue-600 cursor-pointer"
                    >
                      Login
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full font-semibold ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={loading ? true : false}
            >
              {loading ? (
                <span>
                  Processing
                  <span className="animate-pulse font-semibold text-2xl">
                    ...
                  </span>
                </span>
              ) : (
                "Create An Account"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
