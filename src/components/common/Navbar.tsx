import { ModeToggle } from "../theme/mode-toggle";

function Navbar() {
  return (
    <header className="w-full h-16 border-b flex justify-end items-center hidden">
      <div className="mr-5">
        <ModeToggle />
      </div>
    </header>
  );
}

export default Navbar;
