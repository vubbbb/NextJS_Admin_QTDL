"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import apiClient from "@/app/lib/api-client";
import { NGHIPHEP_ROUTES, NHANVIEN_ROUTES } from "@/app/utils/constants";
import { formatDatesInData } from "../utils/Date";

export default function Dashboard() {
  const [nghipheps, setNghiPheps] = useState([]);
  const [NVDangky, setNVDangKy] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await apiClient.get(NGHIPHEP_ROUTES);
        const filteredData = response.data.filter(
          (item) => item.NN_KiemDuyet === 0
        );
        const finaldata = formatDatesInData(filteredData);
        const sortedData = finaldata.sort((a, b) =>
          b.NN_Ma.localeCompare(a.NN_Ma)
        );
        setNghiPheps(sortedData);
      } catch (error) {
        console.error("Failed to fetch leave data", error);
      }
    };
    const fetchDonDK = async () => {
      try {
        const response = await apiClient.get(NHANVIEN_ROUTES);
        const filteredData = response.data.filter(
          (item) => item.NV_KiemDuyet === 0
        );
        const finaldata = formatDatesInData(filteredData);
        setNVDangKy(finaldata);
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };
    fetchLeaveData();
    fetchDonDK();
  }, []);

  const handleApproveLeave = async (NN_Ma, NV_Ma) => {
    try {
      await apiClient.put(`${NGHIPHEP_ROUTES}/${NN_Ma}/${NV_Ma}`, {
        NN_KiemDuyet: 1,
      });
      setNghiPheps((prev) =>
        prev.map((leave) =>
          leave.NN_Ma === NN_Ma ? { ...leave, NN_KiemDuyet: 1 } : leave
        )
      );
    } catch (error) {
      console.error("Failed to approve leave", error);
    }
  };

  const handleApproveEmployee = async (NV_Ma) => {
    try {
      await apiClient.put(`${NHANVIEN_ROUTES}/kiemduyet/${NV_Ma}`, {
        NV_KiemDuyet: 1,
      });
      setNVDangKy((prev) =>
        prev.map((employee) =>
          employee.NV_Ma === NV_Ma ? { ...employee, NV_KiemDuyet: 1 } : employee
        )
      );
    } catch (error) {
      console.error("Failed to approve employee", error);
    }
  };

  return (
    <div className="flex space-x-6">
      {/* Phần bên trái: Bảng dữ liệu nghỉ phép */}
      <div className="flex-1 overflow-auto h-[85vh]">
        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold mb-4">Dữ liệu nghỉ phép</h2>
            <Table aria-label="Leave Data Table">
              <TableHeader>
                <TableColumn>Mã Nhân Viên</TableColumn>
                <TableColumn>Ngày Nghỉ</TableColumn>
                <TableColumn>Ghi chú</TableColumn>
                <TableColumn>Trạng thái</TableColumn>
                <TableColumn>Hành động</TableColumn>
              </TableHeader>
              <TableBody>
                {nghipheps.map((leave) => (
                  <TableRow key={leave.NN_Ma}>
                    <TableCell>{leave.NV_Ma}</TableCell>
                    <TableCell>{leave.NN_NgayNghi}</TableCell>
                    <TableCell>{leave.NN_GhiChu}</TableCell>
                    <TableCell>
                      {leave.NN_KiemDuyet === 0 ? "Chưa duyệt" : "Đã duyệt"}
                    </TableCell>
                    <TableCell>
                      {leave.NN_KiemDuyet === 0 && (
                        <Button
                          auto
                          onClick={() =>
                            handleApproveLeave(leave.NN_Ma, leave.NV_Ma)
                          }
                        >
                          Duyệt
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>

      {/* Phần bên phải: Bảng dữ liệu nhân viên đăng ký */}
      <div className="flex-1 overflow-auto h-[85vh]">
        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold mb-4">
              Dữ liệu nhân viên đăng ký
            </h2>
            <Table aria-label="Employee Registration Data Table">
              <TableHeader>
                <TableColumn>Mã Nhân viên</TableColumn>
                <TableColumn>Tên nhân viên</TableColumn>
                <TableColumn>Địa chỉ</TableColumn>
                <TableColumn>Số điện thoại</TableColumn>
                <TableColumn>Mức độ tài khoản</TableColumn>
                <TableColumn>Trạng thái</TableColumn>
                <TableColumn>Hành động</TableColumn>
              </TableHeader>
              <TableBody>
                {NVDangky.map((employee) => (
                  <TableRow key={employee.NV_Ma}>
                    <TableCell>{employee.NV_Ma}</TableCell>
                    <TableCell>{employee.NV_TenNV}</TableCell>
                    <TableCell>{employee.NV_DiaChi}</TableCell>
                    <TableCell>{employee.NV_SDT}</TableCell>
                    <TableCell>{employee.NV_Role}</TableCell>
                    <TableCell>
                      {employee.NV_KiemDuyet === 0 ? "Chưa duyệt" : "Đã duyệt"}
                    </TableCell>
                    <TableCell>
                      {employee.NV_KiemDuyet === 0 && (
                        <Button
                          auto
                          onClick={() => handleApproveEmployee(employee.NV_Ma)}
                        >
                          Duyệt
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
