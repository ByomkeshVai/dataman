import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
      mx-auto
      w-full
    "
    >
      <HashLoader size={100} color="#F13C5C" />
    </div>
  );
};

export default Loader;
