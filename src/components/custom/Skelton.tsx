import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
export const UserSkelton = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-2 hover:bg-userHover cursor-pointer">
      <div className="relative">
        <span className="w-[10px] h-[10px] rounded-full bg-slate-200  absolute top-0 left-0 z-10 flex items-center justify-center">
          <span className="w-[6px] h-[6px] rounded-full bg-green-500"></span>
        </span>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Skeleton />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

{
  /* <div className="w-full h-16 border-b  flex items-center justify-between px-2 hover:bg-userHover cursor-pointer">
  <div className="relative">
    <span className="w-[10px] h-[10px] rounded-full bg-slate-200  absolute top-0 left-0 z-10 flex items-center justify-center">
      <span className="w-[6px] h-[6px] rounded-full bg-green-500"></span>
    </span>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
  <div className="w-full  flex flex-col px-2">
    <span className="font-semibold text-1xl ">Aflu</span>
    <span className="font-thin text-sm">Hi how are you </span>
  </div>
</div>; */
}
