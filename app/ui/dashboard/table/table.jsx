"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Pagination,
} from "@nextui-org/react";
import { EditIcon } from "@/public/EditIcon";
import { DeleteIcon } from "@/public/DeleteIcon";
import { EyeIcon } from "@/public/EyeIcon";
import EditModal from "@/app/ui/dashboard/modal/edit.modal";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function Custom_Table({ data, table, tableColumns, rowkey, edit_route, onSuccess }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    console.log(cellValue);
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditModal func="Chỉnh sửa" data={item} table={table} columnName={tableColumns} edit_route={edit_route} rowkey={rowkey} onSuccess={onSuccess}/>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const generateRowKey = (item, rowkey) => {
    const keys = rowkey.split(" ");
    const keyParts = keys.map(key => {
      if (item[key] === undefined) {
        console.warn(`Key "${key}" is missing on item`, item);
        return key; // Fallback to the key name as a part of the identifier
      }
      return item[key];
    });
    console.log("here",keyParts);
    return keyParts.join("-");
  };
  

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
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
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={tableColumns}>
        {(column) => (
          <TableColumn key={column.uid} align="center">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
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
  );
}
