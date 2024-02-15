// import ButtonLoader from "@/components/custom/ButtonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";
import { baseURL } from "@/constant/constant";
import { Socket, io } from "socket.io-client";
import { getSpecifChat, sendChat } from "@/redux/actions/Chat/getSpcificChat";
import { OnlineUsers, messagesType, sendChatBody } from "@/types/chatType";

import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { getMessage } from "@/redux/slices/chatSlice";
import ButtonLoader from "@/components/custom/ButtonLoader";
import { useNavigate } from "react-router-dom";
function MobileChatUI() {
  const dispatch: AppDispatch = useDispatch();
  const chatId: string = useSelector(
    (state: RootState) => state?.chat?.chat?.chatId
  );
  const [message, setMessage] = useState<string>("");
  const { loading } = useSelector((state: RootState) => state.chat);
  const [allChats, setAllChat] = useState<messagesType[]>([]);
  const [onlineusers, setOnlineUsers] = useState<OnlineUsers[]>([]);
  const [typings, setTypings] = useState<{ id: string; status: boolean }[]>([]);

  const chats = useSelector((state: RootState) => state?.chat?.chat?.messages);
  const scrollArea = useRef<HTMLDivElement>(null);
  const myDetails = useSelector((state: RootState) => state?.user?.user?.user);
  
  const handleMessageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const socket: Socket = io(baseURL);
    setMessage(e?.target?.value);
    socket.emit("typing", {
      msg: "typing",
      recipienId: selectedUser._id,
      name: myDetails.username,
      Id: myDetails._id,
    });
    setTimeout(() => {
      socket.emit("stoppedTyping", {
        msg: "typing",
        recipienId: selectedUser._id,
        name: myDetails.username,
        Id: myDetails._id,
      });
    }, 1200);
  };
  useEffect(() => {
    if (scrollArea.current) {
      scrollArea.current.scrollTop = scrollArea.current.scrollHeight;
    }
  }, [allChats, chats]);
  async function handleSendMessage() {
    if (message.trim()) {
      if (scrollArea.current) {
        scrollArea.current.scrollTop = scrollArea.current.scrollHeight;
      }
      const socket: Socket = io(baseURL);
      const body: sendChatBody = {
        chatId: chatId,
        content: message,
        senderId: myDetails._id,
      };

      socket.emit("send-message", {
        message,
        recipienId: selectedUser._id,
        chatId,
        senderId: myDetails._id,
      });
      const chatBody: messagesType = {
        _id: uuidv4(),
        content: message,
        senderId: myDetails._id,
        chatId: chatId,
        createdAt: new Date(),
        date: new Date(),
      };
      setAllChat((preve) => [...preve, chatBody]);
      await dispatch(sendChat(body));
      setMessage("");
    }
  }
  useEffect(() => {
    setAllChat(chats);
  }, [chats]);
  useEffect(() => {
    const socket: Socket = io(baseURL);
    async function selectChat() {
      const uesrDetails: string|null = localStorage.getItem("selecteUser");
      if (uesrDetails) {
        await dispatch(getSpecifChat(JSON.parse(uesrDetails)));
      }
    }
    selectChat();
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("getOnlineUsers", (data: OnlineUsers[]) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      setOnlineUsers(data);
    });
    socket?.emit("add-user", myDetails._id);
    socket.on("getMessage", async (res: messagesType) => {
      console.log("🚀 ~ socket.on ~ res:", res);
      const obj:string|null=localStorage.getItem("selecteUser")
      if(obj){
        const selectedUserData: {
          currentId: string;
          toId: string;
        } = JSON.parse(obj);
  
        if (selectedUserData.toId === res.senderId) {
          dispatch(getMessage(res));
          setAllChat((prev) => [...prev, res]);
        }
      }else{
        dispatch(getMessage(res));
        setAllChat((prev) => [...prev, res]);
      }

      toast.success(res.content);
    });

    socket.on("typing", (res) => {
      const typeSet = new Set(...typings.map((type) => type.id));
      if (!typeSet.has(res.Id)) {
        // alert("reach")
        console.log(res.Id);

        setTypings([...typings, { id: res.Id, status: true }]);
      }
    });
    socket.on("stoppedTyping", (res) => {
      setTypings((prevData) => {
        return prevData.map((typings) =>
          typings.id === res.Id ? { ...typings, status: false } : typings
        );
      });
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    return () => {
      socket.off("getMessage");
      socket.disconnect();
      socket.off("typing");
      setTypings([]);
    };
  }, []);
  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser
  );

  const navigate = useNavigate();
  return (
    <main className="sm:block h-screen w-full  p-3">
      <header className="w-full h-16  border-b flex items-center  overflow-hidden">
        <div className="flex gap-3 items-center h-full ">
          <div
            className="flex items-center gap-2 rounded-full active:bg-[#f9f0f01c] active:p-1 active:border cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="text-[20px] h-full">
              <IoMdArrowBack />
            </div>
            <Avatar className="w-10">
              <AvatarImage
                src={`${
                  selectedUser.profile
                    ? selectedUser.profile
                    : "https://github.com/shadcn.png"
                }`}
                className="rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col  w-full">
            <span className="font-semibold text-[18px]">
              {selectedUser.username}
            </span>
            <span className="text-sm flex items-center gap-1">
              {typings.find((typings) => typings.id === selectedUser._id)
                ?.status ? (
                <>
                  <span className="w-[8px] h-[8px] rounded-full bg-blue-500 block"></span>
                  <p>
                    typing<span className="animate-pulse">...</span>{" "}
                  </p>
                </>
              ) : onlineusers.find(
                  (data: OnlineUsers) => data?.userId === selectedUser._id
                ) ? (
                <>
                  <span className="w-[8px] h-[8px] rounded-full bg-green-500 block"></span>
                  Online
                </>
              ) : (
                <>
                  <span className="w-[8px] h-[8px] rounded-full bg-red-300 block"></span>
                  Offline
                </>
              )}
            </span>
          </div>
        </div>
      </header>
      <main className="w-full h-full space-y-1 ">
        <div
          className="w-full h-[85%]  overflow-auto py-2 pr-2"
          ref={scrollArea}
        >
          {allChats?.length <= 0 && (
            <div className="px-1  bg-gray-900 rounded-sm text-black flex flex-col  items-center max-w-[200px] flex-wrap break-words mx-auto">
              <div className="w-full  flex justify-center  text-white p-1">
                no message sended🚉
              </div>
            </div>
          )}
          {allChats?.map(
            (content: {
              _id: null | undefined | string;
              senderId: string;
              content: string | number | null | undefined;
              createdAt: string | number | Date;
            }) => (
              <div
                key={content._id}
                className={`w-full  flex ${
                  myDetails._id == content.senderId
                    ? "justify-end"
                    : "justify-start"
                }  py-2`}
              >
                <div
                  key={content._id}
                  className={`px-1  rounded-sm text-black flex flex-col  items-center max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] flex-wrap break-words ${myDetails._id == content.senderId?"bg-ternary text-white rounded-lg rounded-tr-none":"bg-slate-300  text-[black] rounded-lg rounded-tl-none"}`}
                >
                  <div className="w-full justify-start">{content.content}</div>
                  <div className={`text-sm flex  w-full ${myDetails._id == content.senderId?"justify-end":"justify-start"}`}>
                    {/* <span>10:22</span> */}
                    <span>{`${new Date(
                      content.createdAt
                    ).getHours()}:${new Date(
                      content.createdAt
                    ).getMinutes()}`}</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="h-[10%]  flex items-start justify-between gap-4">
          <div
            className="w-full h-[60%] rounded-md  flex pl-4 pr-1 bg-background border"
          >
            <Input
              type="text"
              placeholder="Send message.."
              value={message}
              className="h-full border-none outline-0 p-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={handleMessageInputChange}
            />
            <Button
              className="text-[18px] p-0 m-0 h-full px-4 bg-transparent text-white hover:bg-transparent"
              type="button"
            >
              <FaPaperclip />
            </Button>
          </div>
          <div
            onClick={handleSendMessage}
            className={`bg-background h-[60%] w-12 flex items-center justify-center rounded-md text-[18px] hover:bg-slate-950 border ${
              loading || message.trim().length > 0
                ? "cursor-pointer bg-ternary"
                : "cursor-not-allowed pointer-events-none"
            }`}
          >
            {loading ? <ButtonLoader /> : <IoSend />}
          </div>
        </div>
      </main>
    </main>
  );
}
export default MobileChatUI;
