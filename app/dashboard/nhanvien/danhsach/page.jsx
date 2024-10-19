"use client";
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/api-client";
import { NHANVIEN_ROUTES } from "@/app/utils/constants";
import { NVcolumns } from "@/app/ui/dashboard/table/tablecolums";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";
const DanhSachNhanVien = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get(NHANVIEN_ROUTES);
      setData(res.data);
      console.log(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Custom_Table
        data={data}
        table="Nhân viên"
        tableColumns={NVcolumns}
        rowkey="NV_MA"
      />
      <div className="flex justify-end mt-16">
        <button className="btn btn-primary border-1 rounded-full p-2 bg-green-600">
          <Addmodal func="Thêm mới" columnName={NVcolumns} table="Nhân viên" />
        </button>
      </div>
    </div>
  );
};

export default DanhSachNhanVien;
