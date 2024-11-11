const Navbar = () => {
  return (
    <div className="bg-[#3f475a] text-white w-full px-4 py-2 flex justify-between items-center shadow-md">
      {/* Logo / Title */}
      <div className="text-lg font-semibold">
        MyDashboard
      </div>

      {/* Links for larger screens */}
      <div className="hidden md:flex space-x-6">
        <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
        <a href="/profile" className="hover:text-gray-300">Profile</a>
        <a href="/settings" className="hover:text-gray-300">Settings</a>
        <a href="/help" className="hover:text-gray-300">Help</a>
      </div>

      {/* Profile and Toggle Menu for Small Screens */}
      <div className="flex items-center space-x-4">
        {/* Profile Icon */}
        <div className="relative">
          <button className="flex items-center p-2 rounded-full hover:bg-gray-600 focus:outline-none">
            <img
              src="/path/to/profile-pic.jpg" // Replace with your profile picture path
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </button>
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10 hidden group-hover:block">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-200">View Profile</a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</a>
            <a href="/logout" className="block px-4 py-2 hover:bg-gray-200">Logout</a>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden p-2 rounded-md hover:bg-gray-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
