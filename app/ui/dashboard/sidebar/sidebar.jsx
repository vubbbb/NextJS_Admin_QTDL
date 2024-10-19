import {
  MdDashboard,
  MdSupervisedUserCircle,
  //   MdShoppingBag,
  //   MdAttachMoney,
  //   MdWork,
  //   MdAnalytics,
  //   MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  // MdLogout,
} from "react-icons/md";

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
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
  {
    title: "Lương",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
  {
    title: "Ngày nghỉ phép",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="bg-[#182237] w-[15vw] h-[100vh]">
      <ul>
        {menuItems.map((item, index) => (
          <div key={index}>
            <li>{item.title}</li>
            {item.list.map((subItem, index) => (
              <li key={index} className="pl-8 ">
                <a href={subItem.path} className="flex flex-row items-center">
                  {subItem.icon}
                  <p className="text-center">{subItem.title}</p>
                </a>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
