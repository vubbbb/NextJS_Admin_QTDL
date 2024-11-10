"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { EditIcon } from "@/public/EditIcon";
import apiClient from "@/app/lib/api-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateForMySQL } from "@/app/utils/Date";

export default function EditModal({
  func,
  table,
  data,
  columnName,
  edit_route,
  rowkey,
  onSuccess,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataForm, setDataForm] = useState({});
  const [route, setRoute] = useState("");

  useEffect(() => {
    switch (table) {
      case "Nhân viên":
      case "Phòng ban":
      case "Chức vụ":
      case "Danh mục lương":
        setRoute(`${edit_route}/${dataForm[rowkey]}`);
        break;
      case "Công tác":
        setRoute(
          `${edit_route}/${dataForm.NV_Ma}/${dataForm.PB_Ma}/${dataForm.CV_Ma}`
        );
        break;
      case "Nghỉ phép":
        setRoute(`${edit_route}/${dataForm.NN_Ma}/${dataForm.NV_Ma}`);
        break;
      case "Lương":
        setRoute(`${edit_route}/${dataForm.NV_Ma}/${dataForm.NN_Ma}`);
        break;
      default:
        setRoute("");
    }
  }, [table, dataForm, rowkey, edit_route]);

  useEffect(() => {
    if (isOpen && data) {
      setDataForm(data);
    }
  }, [data, isOpen]);

  const onSubmit = () => {
    // Sao chép dataForm và chuyển đổi các trường ngày nếu cần
    const updatedData = { ...dataForm };
    columnName.forEach((col) => {
      if (col.name.toLowerCase().includes("date") || col.name.toLowerCase().includes("ngày")) {
        updatedData[col.uid] = formatDateForMySQL(updatedData[col.uid]);
      }
    });

    apiClient
      .put(route, updatedData)
      .then((res) => {
        onSuccess(res.data.updatedData);
        onOpenChange();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const onChangeText = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const onDateChange = (date, key) => {
    setDataForm({
      ...dataForm,
      [key]: date ? date.toISOString() : "",
    });
  };

  return (
    <div className="items-center">
      <Tooltip content={func} color="primary">
        <span
          className="text-lg cursor-pointer active:opacity-50"
          onClick={onOpen}
        >
          <EditIcon />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                {func} {table.toLowerCase()}
              </ModalHeader>
              <ModalBody className="text-black">
                {Object.keys(dataForm).map((key) => {
                  const column = columnName.find((col) => col.uid === key);
                  const isDateField =
                    column &&
                    (column.name.toLowerCase().includes("date") ||
                      column.name.toLowerCase().includes("ngày"));

                  return (
                    <div key={key} className="mb-4">
                      {isDateField ? (
                        <label className="block mb-1 text-gray-700">
                          {column ? column.name : key}
                          <DatePicker
                            selected={
                              dataForm[key] && !isNaN(new Date(dataForm[key]))
                                ? new Date(dataForm[key])
                                : null
                            }
                            onChange={(date) => onDateChange(date, key)}
                            dateFormat="dd/MM/yyyy"
                            className="mt-1 block w-full border-gray-300 rounded-md"
                          />
                        </label>
                      ) : (
                        <Input
                          type="text"
                          label={column ? column.name : key}
                          placeholder={`Nhập vào ${
                            column ? column.name.replace(/_/g, " ") : key
                          }`}
                          name={key}
                          required
                          value={dataForm[key]}
                          onChange={onChangeText}
                        />
                      )}
                    </div>
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Hủy {func.toLowerCase()} {table.toLowerCase()}
                </Button>
                <Button color="primary" onPress={onSubmit}>
                  {func}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
