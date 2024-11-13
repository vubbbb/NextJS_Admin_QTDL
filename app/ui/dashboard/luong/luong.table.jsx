"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import { EyeIcon } from "@/public/EyeIcon";
import ViewModal from "@/app/ui/dashboard/modal/viewInfo.modal";
import apiClient from "@/app/lib/api-client";

export default function Luong_Table({ data, rowkey, viewTableColumns }) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;

  const tableColumns = [
    { uid: "NV_Ma", name: "NV_Ma" },
    { uid: "NN_Ma", name: "NN_Ma" },
    { uid: "L_ThangNam", name: "L_ThangNam" },
    { uid: "L_SoBuoiLam", name: "L_SoBuoiLam" },
    { uid: "L_LuongThucLanh", name: "L_LuongThucLanh" },
    { uid: "actions", name: "Actions" },
  ];

  // Filtered Data based on Search Query
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  // Paginated Data based on Filtered Data
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [page, filteredData]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const generateRowKey = (item, rowkey) => {
    const keys = rowkey.split(" ");
    return keys.map((key) => item[key] || key).join("-");
  };

  const calculateSalary = async (employeeId, monthYear) => {
    try {
      const response = await apiClient.post(`/api/luongs/tinh-luong/${employeeId}`,{
        L_ThangNam: monthYear,
      });
      return response.data;
    } catch (error) {
      console.error("Error calculating salary:", error);
      return null;
    }
  };

  const handleCalculateSalary = async (item) => {
    const { NV_Ma, L_ThangNam } = item;
    const result = await calculateSalary(NV_Ma, L_ThangNam);
    if (result) {
      // Update the UI with the new salary data
      // This could involve updating the state or triggering a re-fetch of the data
      console.log("Salary calculation result:", result);
      // Update the data state here if necessary
    }
  };

  const renderCell = useCallback(
    (item, columnKey) => {
      const cellValue = item[columnKey];
      switch (columnKey) {
        case "actions":
          return (
            <div className="flex items-center gap-2 justify-center">
              <Tooltip content="View Details">
                <span className="cursor-pointer">
                  <ViewModal
                    func="View Details"
                    data={item}
                    columnName={
                      viewTableColumns?.length ? viewTableColumns : tableColumns
                    }
                    table="Lương"
                  />
                </span>
              </Tooltip>
              <Tooltip content="Calculate Salary">
                <span
                  className="cursor-pointer"
                  onClick={() => handleCalculateSalary(item)}
                >
                  Cập nhật lương
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [viewTableColumns, tableColumns]
  );

  return (
    <div className="w-full overflow-x-auto p-4">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4 text-black">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => {
            setPage(1); // Reset to first page on new search
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      <Table
        aria-label="Responsive table with pagination and search"
        bottomContent={
          <div className="flex w-full justify-center mt-4">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px] w-full",
        }}
      >
        <TableHeader columns={tableColumns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item, index) => (
            <TableRow key={`${generateRowKey(item, rowkey)}-${index}`}>
              {(columnKey) => (
                <TableCell className="text-black text-center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
