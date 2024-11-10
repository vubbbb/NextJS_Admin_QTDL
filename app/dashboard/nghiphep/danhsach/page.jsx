"use client";
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/api-client";
import { NGHIPHEP_ROUTES } from "@/app/utils/constants";
import { NPcolumns } from "@/app/ui/dashboard/table/tablecolums";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";
const DanhSachPhongBan = () => {
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
      const res = await apiClient.get(NGHIPHEP_ROUTES);
      const formattedData = formatDatesInData(res.data);
      setData(formattedData);
    };
    fetchData();
  }, []);
  const handleSuccess = (newData) => {
    // Cập nhật danh sách khi nhận dữ liệu mới
    setData((prevData) => [...prevData, newData]);
  };

  return (
    <div>
      <Custom_Table
        data={data}
        table="Nghỉ phép"
        tableColumns={NPcolumns}
        edit_route={NGHIPHEP_ROUTES}
        rowkey="NN_Ma NV_Ma"
      />
      <div className="flex justify-end mt-16">
        <button className="btn btn-primary border-1 rounded-full p-2 bg-green-600">
          <Addmodal
            func="Thêm mới"
            columnName={NPcolumns}
            table="Nghỉ phép"
            add_route={NGHIPHEP_ROUTES}
            onSuccess={handleSuccess}
          />
        </button>
      </div>
    </div>
  );
};

export default DanhSachPhongBan;
