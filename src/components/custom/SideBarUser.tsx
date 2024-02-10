import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function SideBarUser  ()  {
  return (
    <div className="w-full h-16 bg-chatBox  flex items-center justify-between px-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full  flex flex-col px-2">
        <span className="font-semibold text-1xl ">Aflu</span>
        <span className="font-thin text-sm">Hi how are you </span>
      </div>
    </div>
  );
}
export default SideBarUser;

