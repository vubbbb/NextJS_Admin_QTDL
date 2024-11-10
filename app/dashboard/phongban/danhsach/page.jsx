"use client";
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState, useCallback } from "react";
import apiClient from "@/app/lib/api-client";
import { PHONGBAN_ROUTES } from "@/app/utils/constants";
import { PBcolumns } from "@/app/ui/dashboard/table/tablecolums";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";
import { formatDatesInData, formatDate } from "@/app/utils/Date";
const DanhSachPhongBan = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    console.log("here");
    const fetchData = async () => {
      const res = await apiClient.get(PHONGBAN_ROUTES);
      const formattedData = formatDatesInData(res.data);
      setData(formattedData);
    };
    fetchData();
  }, []);
  const handleSuccess = (newData) => {
    // Cập nhật danh sách khi nhận dữ liệu mới
    setData((prevData) => [...prevData, newData]);
  };

  const handleEditSuccess = useCallback((newData) => {
    const formattedNewData = formatDatesInData([newData])[0];
    setData((prevData) => {
      const index = prevData.findIndex(
        (item) => String(item.PB_Ma) === String(formattedNewData.PB_Ma)
      );
      if (index !== -1) {
        const updatedData = [...prevData];
        updatedData[index] = formattedNewData;
        alert("Cập nhật thành công");
        return updatedData;
      }
      return prevData;
    });
  }, []);

  return (
    <div>
      <Custom_Table
        data={data}
        table="Phòng ban"
        tableColumns={PBcolumns}
        edit_route={PHONGBAN_ROUTES}
        rowkey="PB_Ma"
        onSuccess={handleEditSuccess}
      />
      <div className="flex justify-end mt-16">
        <button className="btn btn-primary border-1 rounded-full p-2 bg-green-600">
          <Addmodal
            func="Thêm mới"
            columnName={PBcolumns}
            table="Phòng ban"
            add_route={PHONGBAN_ROUTES}
            onSuccess={handleSuccess}
          />
        </button>
      </div>
    </div>
  );
};

export default DanhSachPhongBan;
