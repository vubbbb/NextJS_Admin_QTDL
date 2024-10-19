"use client";
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/api-client";
import { CHUCVU_ROUTES } from "@/app/utils/constants";
import { CVcolumns } from "@/app/ui/dashboard/table/tablecolums";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";

const DanhSachChucVu = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get(CHUCVU_ROUTES);
      setData(res.data);
      console.log(res.data);
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
        table="Chức vụ"
        tableColumns={CVcolumns}
        rowkey="CV_MA"
      />
      <div className="flex justify-end mt-16">
        <button className="btn btn-primary border-1 rounded-full p-2 bg-green-600">
          <Addmodal
            func="Thêm mới"
            columnName={CVcolumns}
            table="Chức vụ"
            add_route={CHUCVU_ROUTES}
            onSuccess={handleSuccess}
          />
        </button>
      </div>
    </div>
  );
};

export default DanhSachChucVu;
