"use client";
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/api-client";
import { NHANVIEN_ROUTES } from "@/app/utils/constants";
import { NVcolumns } from "@/app/ui/dashboard/table/tablecolums";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";
import { formatDatesInData, formatDate } from "@/app/utils/Date";
const DanhSachNhanVien = () => {
  const [data, setData] = useState([]);

  

  useEffect(() => {
    console.log("here");
    const fetchData = async () => {
      const res = await apiClient.get(NHANVIEN_ROUTES);
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
        onSuccess={handleEditSuccess}
        rowkey="NV_Ma"
      />
      <div className="flex justify-end mt-16">
        <button className="btn btn-primary border-1 rounded-full p-2 bg-green-600">
          <Addmodal
            func="Thêm mới"
            columnName={NVcolumns}
            table="Nhân viên"
            add_route={NHANVIEN_ROUTES}
            onSuccess={handleSuccess}
          />
        </button>
      </div>
    </div>
  );
};

export default DanhSachNhanVien;
