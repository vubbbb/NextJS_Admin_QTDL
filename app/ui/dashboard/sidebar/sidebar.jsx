'use client'
import { useState } from 'react';
import { MdDashboard } from 'react-icons/md';
import Link from 'next/link';

const menuItems = [
  { title: "Phòng ban", path: "/dashboard/phongban/danhsach", icon: <MdDashboard /> },
  { title: "Nhân viên", path: "/dashboard/nhanvien/danhsach", icon: <MdDashboard /> },
  { title: "Chức vụ", path: "/dashboard/chucvu/danhsach", icon: <MdDashboard /> },
  { title: "Quá trình công tác", path: "/dashboard/congtac/danhsach", icon: <MdDashboard /> },
  { title: "Lương", path: "/dashboard/luong/danhsach", icon: <MdDashboard /> },
  { title: "Nghỉ phép", path: "/dashboard/nghiphep/danhsach", icon: <MdDashboard /> },
  { title: "Danh mục lương", path: "/dashboard/dmluong/danhsach", icon: <MdDashboard /> },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-[#182237] h-screen ${
        isCollapsed ? 'w-16' : 'w-60'
      } transition-all duration-300 ease-in-out flex flex-col items-center`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="text-white p-2 mt-4 hover:bg-[#3b4a6b] rounded"
      >
        {isCollapsed ? '➡️' : '⬅️'}
      </button>

      {/* Sidebar Menu */}
      <ul className="mt-10 w-full">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-4">
            <Link href={item.path} className="flex items-center text-white p-2 hover:bg-[#3b4a6b] rounded transition-all duration-200 ease-in-out group">
              <div className="text-2xl mr-4">{item.icon}</div>
              {!isCollapsed && (
                <span className="text-sm font-medium group-hover:text-gray-300">
                  {item.title}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
