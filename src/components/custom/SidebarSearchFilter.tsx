import { IoFilterSharp, IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";
import { CiMenuKebab } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/actions/User/authAction";
import { useNavigate } from "react-router-dom";

function SidebarSearchFilter() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout = () => {
     dispatch(logoutUser()).then((res:any) => {
       console.log("🚀 ~ dispatch ~ res:", res)
     })
     navigate('/login')

  };
  return (
    <div className="w-full h-16  flex justify-between items-start border-b gap-1">
      <div className="flex items-center border  w-[87%] bg-background h-[70%] px-3 py-1 border-input rounded-md focus-within:outline hover:focus-visible:ring-offset-2 ">
        <Input
          type="search"
          placeholder="Search Someting"
          className="h-full border-none outline-0 p-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <IoSearch className="cursor-pointer ml-2 text-1xl" />
      </div>
      {/* filter section  */}

      {/* <div className="bg-background h-[70%] w-10 border flex items-center justify-center text-1xl rounded-md overflow-hidden active:outline cursor-pointer">
        <IoFilterSharp />
      </div> */}


      {/* filter section  */}
      <div className="bg-background h-[70%] w-10 border  text-1xl rounded-md overflow-hidden active:outline cursor-pointer p-0">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-full w-full flex items-center justify-center">
            <CiMenuKebab />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="bg-background h-[70%] w-10 border flex items-center justify-center text-1xl rounded-md overflow-hidden active:outline cursor-pointer">
        <AlertDialog>
          <AlertDialogTrigger className="w-full flex items-center h-full justify-center"><IoLogOutOutline /></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
export default SidebarSearchFilter;
