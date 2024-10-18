'use client'
import Custom_Table from "@/app/ui/dashboard/table/table";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/api-client";
import { PHONGBAN_ROUTES } from "@/app/utils/constants";
import { PBcolumns } from "@/app/ui/dashboard/table/tablecolums";

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

    return <div>
        <Custom_Table data={data} table="Phòng ban" tableColumns={PBcolumns}  rowkey="PB_Ma"/>
    </div>;
  };
  
  export default DanhSachPhongBan;