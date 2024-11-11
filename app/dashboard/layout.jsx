import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";

const layout = ({ children }) => {
  return (
    <div className="flex flex-raw">
      <div>
        <Sidebar />
      </div>
      <div className="justify-center items-center w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default layout;
