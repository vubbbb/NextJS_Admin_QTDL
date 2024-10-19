"use client";
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/api-client";
import { PHONGBAN_ROUTES } from "@/app/utils/constants";
import { PBcolumns } from "@/app/ui/dashboard/table/tablecolums";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";
const DanhSachPhongBan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get(PHONGBAN_ROUTES);
      setData(res.data);
      console.log(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Custom_Table
        data={data}
        table="Phòng ban"
        tableColumns={PBcolumns}
        rowkey="PB_Ma"
      />
      <div className="flex justify-end mt-16">
        <button className="btn btn-primary border-1 rounded-full p-2 bg-green-600">
          <Addmodal func="Thêm mới" columnName={PBcolumns} table="Phòng ban" />
        </button>
      </div>
    </div>
  );
};

export default DanhSachPhongBan;
