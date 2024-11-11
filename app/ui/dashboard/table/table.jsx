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
import { EditIcon } from "@/public/EditIcon";
import { DeleteIcon } from "@/public/DeleteIcon";
import { EyeIcon } from "@/public/EyeIcon";
import EditModal from "@/app/ui/dashboard/modal/edit.modal";
import Addmodal from "@/app/ui/dashboard/modal/add.modal";
import ViewModal from "@/app/ui/dashboard/modal/viewInfo.modal";

export default function Custom_Table({
  data,
  table,
  tableColumns,
  rowkey,
  edit_route,
  onEditSuccess,
  onAddSuccess,
}) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;

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
                    columnName={tableColumns}
                    table={table}
                  />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span className="cursor-pointer">
                  <EditModal
                    func="Edit"
                    data={item}
                    table={table}
                    columnName={tableColumns}
                    edit_route={edit_route}
                    rowkey={rowkey}
                    onEditSuccess={onEditSuccess}
                  />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span className="text-danger cursor-pointer">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [tableColumns, table, edit_route, rowkey, onEditSuccess]
  );

  const generateRowKey = (item, rowkey) => {
    const keys = rowkey.split(" ");
    return keys.map((key) => item[key] || key).join("-");
  };

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
        <button className="btn btn-primary border-1 rounded-full p-2 bg-green-600">
          <Addmodal
            func="Thêm mới"
            columnName={tableColumns}
            table="Chức vụ"
            add_route={edit_route}
            onAddSuccess={onAddSuccess}
          />
        </button>
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
