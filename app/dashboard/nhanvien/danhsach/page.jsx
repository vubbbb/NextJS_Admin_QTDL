'use client'
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/api-client";
import { NHANVIEN_ROUTES } from "@/app/utils/constants";
import { NVcolumns } from "@/app/ui/dashboard/table/tablecolums";
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

    return <div>
        <Custom_Table data={data} table="Nhân viên" tableColumns={NVcolumns} rowkey="NV_MA"/>
    </div>;
  };
  
  export default DanhSachNhanVien;