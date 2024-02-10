import welcomeImage from "../../assets/Welcom.svg";
import chatIcon from "../../assets/chat.png";
function WelcomeSection() {
  return (
    <main className="hidden sm:flex h-full w-full flex-col p-2">
      <header className="w-full h-16   flex items-center">
        <img className="w-10" src={chatIcon} />
      </header>
      <main className="w-full h-full  flex flex-col">
        <div className="w-full h-full  overflow-auto py-2 flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold flex">
            Welcome to<span className="text-ternary ml-2"> A Chat</span>
          </h1>
          <img src={welcomeImage} className="w-[80%] md:w-1/2" />
        </div>
      </main>
    </main>
  );
}
export default WelcomeSection;
