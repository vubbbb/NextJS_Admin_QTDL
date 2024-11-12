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
      // const formattedData = formatDatesInData(res.data);
      setData(res.data);
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
        add_route={PHONGBAN_ROUTES}
        edit_route={PHONGBAN_ROUTES}
        rowkey="PB_Ma"
        onEditSuccess={handleEditSuccess}
        onAddSuccess={handleSuccess}
        addTableColumns={PBcolumns}
        editTableColumns={PBcolumns}
        viewTableColumns={PBcolumns}
      />
    </div>
  );
};

export default DanhSachPhongBan;
