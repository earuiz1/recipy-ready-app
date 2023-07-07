import { MdOutlineFoodBank } from "react-icons/md";

const Header = () => {
  return (
    <nav className="w-full">
      <div className="w-full flex justify-center items-center py-6 gap-x-2">
        <MdOutlineFoodBank size={50} className="fill-slate-100" />
        <h1 className="font-bold text-5xl text-slate-100">Recipy Ready</h1>
      </div>
    </nav>
  );
};

export default Header;
