"use client";
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState, useContext } from "react";
import apiClient from "@/app/lib/api-client";
import { CHUCVU_ROUTES } from "@/app/utils/constants";
import { CVcolumns,EditCVcolumns } from "@/app/ui/dashboard/table/tablecolums";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";
import { formatDatesInData, formatDate } from "@/app/utils/Date";

const DanhSachChucVu = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get(CHUCVU_ROUTES);
      const formattedData = formatDatesInData(res.data);
      setData(formattedData);
      console.log(formattedData);
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
        (item) => String(item.CV_Ma) === String(formattedNewData.CV_Ma)
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
        table="Chức vụ"
        tableColumns={CVcolumns}
        edit_route={CHUCVU_ROUTES}
        rowkey="CV_Ma"
        add_route={CHUCVU_ROUTES}
        onEditSuccess={handleEditSuccess}
        onAddSuccess={handleSuccess}
        viewTableColumns={CVcolumns}
        addTableColumns={CVcolumns}
        editTableColumns={EditCVcolumns}
      />
    </div>
  );
};

export default DanhSachChucVu;
