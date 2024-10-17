import React from "react";
import QLModal from "@/app/ui/dashboard/nhanvien/quanlinhanvien.modal";

const QuanLiNhanVien = () => {
    return <div className="flex justify-around h-[100vh] mt-8">
        <QLModal func="Thêm"/>
        <QLModal func="Sửa"/>
        <QLModal func="Xóa"/>
    </div>;
  };
  
  export default QuanLiNhanVien;