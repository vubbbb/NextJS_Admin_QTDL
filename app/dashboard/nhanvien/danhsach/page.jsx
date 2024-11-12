"use client";
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/api-client";
import { NHANVIEN_ROUTES } from "@/app/utils/constants";
import { NVcolumns, ViewNVcolumns, AddNVcolumns, EditNVcolumns } from "@/app/ui/dashboard/table/tablecolums";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";
import { formatDatesInData, formatDate } from "@/app/utils/Date";
const DanhSachNhanVien = () => {
  const [data, setData] = useState([]);

  

  useEffect(() => {
    console.log("here");
    const fetchData = async () => {
      const res = await apiClient.get(NHANVIEN_ROUTES);
      // const formattedData = formatDatesInData(res.data);
      setData(res.data);
    };
    fetchData();
  }, []);

  const handleSuccess = (newData) => {
    // Cập nhật danh sách khi nhận dữ liệu mới
    setData((prevData) => [...prevData, newData]);
  };

  const handleEditSuccess = (newData) => {
    // Định dạng các trường ngày trong newData trước khi thêm vào
    const formattedNewData = formatDatesInData([newData])[0]; // Định dạng và lấy phần tử đầu tiên của mảng
    setData((prevData) => {
      const index = prevData.findIndex(
        (item) => String(item.NV_Ma) === String(formattedNewData.NV_Ma)
      );

      if (index !== -1) {
        // Nếu phần tử đã tồn tại, cập nhật phần tử đó
        const updatedData = [...prevData];
        updatedData[index] = formattedNewData;
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
        table="Nhân viên"
        tableColumns={NVcolumns}
        edit_route={NHANVIEN_ROUTES}
        add_route={NHANVIEN_ROUTES}
        onEditSuccess={handleEditSuccess}
        onAddSuccess={handleSuccess}
        viewTableColumns={ViewNVcolumns}
        addTableColumns={AddNVcolumns}
        editTableColumns={EditNVcolumns}
        rowkey="NV_Ma"
      />
    </div>
  );
};

export default DanhSachNhanVien;
