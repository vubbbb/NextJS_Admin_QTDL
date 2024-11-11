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
import apiClient from "@/app/lib/api-client";
import DatePicker from "react-datepicker"; // Thêm thư viện DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Đảm bảo import css của react-datepicker
import { formatDateForMySQL } from "@/app/utils/Date";

export default function AddModal({
  func,
  table,
  columnName,
  add_route,
  onAddSuccess,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [dataForm, setDataForm] = useState({});
  const [error, setError] = useState("");

  // Khởi tạo form rỗng khi modal mở
  useEffect(() => {
    if (isOpen) {
      setError("");
      const form = columnName.reduce((acc, col) => {
        if (col.uid !== "actions") {
          acc[col.uid] = "";
        }
        return acc;
      }, {});
      setDataForm(form);
    }
  }, [isOpen, columnName]);

  const onSubmit = async () => {
    try {
      if (Object.values(dataForm).every((item) => item !== "")) {
        setError("");
        // Sao chép dataForm và chuyển đổi các trường ngày nếu có
        const updatedData = { ...dataForm };
        columnName.forEach((col) => {
          if (
            col.name.toLowerCase().includes("date") ||
            col.name.toLowerCase().includes("ngày")
          ) {
            updatedData[col.uid] = formatDateForMySQL(updatedData[col.uid]);
          }
        });

        const res = await apiClient.post(add_route, updatedData);
        if (res.status === 200) {
          alert(`Thêm mới ${table.toLowerCase()} thành công`);
          if (onAddSuccess) {
            onAddSuccess(res.data);
          }
        } else {
          alert(`Thêm mới ${table.toLowerCase()} thất bại`);
        }
        onClose();
      } else {
        setError("Vui lòng nhập đủ thông tin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeText = (e) => {
    setError("");
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
          <span>Thêm mới</span>
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                <span>{func}</span>
                <span className="text-sm text-gray-500">
                  {table ? table.toLowerCase() : "Unknown Table"}
                </span>
              </ModalHeader>
              <ModalBody className="text-gray-700 max-h-[70vh] overflow-y-auto">
                {/* Grid Layout for displaying fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.keys(dataForm).map((key) => {
                    const column = columnName.find((col) => col.uid === key);
                    const isDateField =
                      column &&
                      (column.name.toLowerCase().includes("date") ||
                        column.name.toLowerCase().includes("ngày"));

                    return (
                      <div key={key} className="mb-6">
                        <div className="flex items-center justify-between">
                          <label className="block font-medium text-gray-600">
                            {column ? (
                              <>
                                <span className="text-red-600">*</span>{" "}
                                {column.name}
                              </>
                            ) : (
                              key
                            )}
                          </label>
                        </div>
                        <div className="mt-2">
                          {isDateField ? (
                            <DatePicker
                              selected={
                                dataForm[key] ? new Date(dataForm[key]) : null
                              }
                              onChange={(date) => onDateChange(date, key)}
                              dateFormat="dd/MM/yyyy"
                              className="w-full p-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <Input
                              type="text"
                              placeholder={`Nhập vào ${
                                column
                                  ? column.name.replace(/_/g, " ").toLowerCase()
                                  : key
                              }`}
                              name={key}
                              required
                              value={dataForm[key]}
                              onChange={onChangeText}
                              className="w-full p-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="w-full py-2 bg-red-500 text-white font-semibold hover:bg-red-600"
                >
                  Hủy
                </Button>
                <Button
                  color="primary"
                  onPress={onSubmit}
                  className="w-full py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600"
                >
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
