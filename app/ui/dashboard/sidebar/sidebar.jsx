'use client'
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdOutlineSettings,
  MdHelpCenter,
} from "react-icons/md";
import Link from "next/link";

const menuItems = [
  {
    title: "Phòng ban",
    list: [
      {
        title: "Danh sách",
        path: "/dashboard/phongban/danhsach",
        icon: <MdDashboard />,
      },
    ],
  },
  {
    title: "Nhân viên",
    list: [
      {
        title: "Danh sách",
        path: "/dashboard/nhanvien/danhsach",
        icon: <MdDashboard />,
      },
    ],
  },
  {
    title: "Chức vụ",
    list: [
      {
        title: "Danh sách",
        path: "/dashboard/chucvu/danhsach",
        icon: <MdDashboard />,
      },
    ],
  },
  {
    title: "Quá trình công tác",
    list: [
      {
        title: "Danh sách",
        path: "/dashboard/congtac/danhsach",
        icon: <MdDashboard />,
      },
    ],
  },
  {
    title: "Lương",
    list: [
      {
        title: "Danh sách",
        path: "/dashboard/luong/danhsach",
        icon: <MdDashboard />,
      },
    ],
  },
  {
    title: "Nghỉ phép",
    list: [
      {
        title: "Danh sách",
        path: "/dashboard/nghiphep/danhsach",
        icon: <MdDashboard />,
      },
    ],
  },
  {
    title: "Danh mục lương",
    list: [
      {
        title: "Danh sách",
        path: "/dashboard/dmluong/danhsach",
        icon: <MdDashboard />,
      },
    ],
  },
];

const Sidebar = () => {

  // const router = useRouter();

  return (
    <div className="bg-[#182237] w-[15vw] h-[100vh]">
      <ul>
        {menuItems.map((item, index) => (
          <div key={index}>
            <li>{item.title}</li>
            {item.list.map((subItem, subIndex) => (
              <li key={subIndex} className="pl-8">
                <Link href={subItem.path} className="flex flex-row items-center">
                  {subItem.icon}
                  <p className="text-center">{subItem.title}</p>
                </Link>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
