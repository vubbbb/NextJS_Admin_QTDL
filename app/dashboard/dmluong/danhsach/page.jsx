"use client";
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/api-client";
import { DMLUONG_ROUTES } from "@/app/utils/constants";
import { DMluongcolumns, ViewDMluongcolumns, EditDMluongcolumns } from "@/app/ui/dashboard/table/tablecolums";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";
const DanhSachNhanVien = () => {
  const [data, setData] = useState([]);
  // Hàm để định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Hàm kiểm tra và định dạng các trường ngày trong dữ liệu
  const formatDatesInData = (data) => {
    return data.map((item) => {
      const formattedItem = { ...item };
      for (const key in item) {
        if (typeof item[key] === "string" && !isNaN(Date.parse(item[key]))) {
          formattedItem[key] = formatDate(item[key]);
        }
      }
      return formattedItem;
    });
  };

  useEffect(() => {
    console.log("here");
    const fetchData = async () => {
      const res = await apiClient.get(DMLUONG_ROUTES);
      const formattedData = formatDatesInData(res.data);
      setData(formattedData);
    };
    fetchData();
  }, []);

  const handleSuccess = (newData) => {
    // Cập nhật danh sách khi nhận dữ liệu mới
    setData((prevData) => [...prevData, newData]);
  };

  const handleEditSuccess = (newData) => {
    console.log(newData);
    // Định dạng các trường ngày trong newData trước khi thêm vào
    const formattedNewData = formatDatesInData([newData])[0]; // Định dạng và lấy phần tử đầu tiên của mảng
  
    setData((prevData) => {
      const index = prevData.findIndex(
        (item) => String(item.NV_Ma) === String(formattedNewData.NV_Ma)
      );
  
      if (index !== -1) {
        // Nếu phần tử đã tồn tại, chỉ cập nhật các cột có dữ liệu mới
        const updatedData = [...prevData];
        updatedData[index] = {
          ...updatedData[index], // Giữ lại các giá trị cũ
          ...Object.keys(formattedNewData).reduce((acc, key) => {
            // Kiểm tra nếu giá trị mới khác giá trị cũ, chỉ cập nhật nếu có sự thay đổi
            if (formattedNewData[key] !== updatedData[index][key]) {
              acc[key] = formattedNewData[key];
            }
            return acc;
          }, {}),
        };
        alert("Cập nhật thành công");
        return updatedData;
      }
      return prevData; // Không thay đổi gì nếu không tìm thấy phần tử
    });
  };
  

  return (
    <div>
      <Custom_Table
        data={data}
        table="Danh mục lương"
        tableColumns={DMluongcolumns}
        viewTableColumns={ViewDMluongcolumns}
        editTableColumns={EditDMluongcolumns}
        edit_route={DMLUONG_ROUTES}
        onEditSuccess={handleEditSuccess}
        add_route={DMLUONG_ROUTES}
        onAddSuccess={handleSuccess}
        rowkey="NV_Ma"
      />
    </div>
  );
};

export default DanhSachNhanVien;
