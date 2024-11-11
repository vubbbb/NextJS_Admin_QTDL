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
import { EditIcon } from "@/public/EditIcon"; // Đảm bảo rằng bạn đã có Icon này
import apiClient from "@/app/lib/api-client"; // Đảm bảo rằng apiClient được định nghĩa đúng
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateForMySQL } from "@/app/utils/Date"; // Đảm bảo có hàm này để định dạng ngày tháng

export default function EditModal({
  func,
  table,
  data,
  columnName,
  edit_route,
  rowkey,
  onEditSuccess,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [dataForm, setDataForm] = useState({});
  const [route, setRoute] = useState("");
  const [error, setError] = useState("");

  // Cập nhật route cho API khi có thay đổi
  useEffect(() => {
    if (table) {
      switch (table) {
        case "Nhân viên":
        case "Phòng ban":
        case "Chức vụ":
        case "Danh mục lương":
          setRoute(`${edit_route}/${dataForm[rowkey]}`);
          break;
        case "Công tác":
          setRoute(`${edit_route}/${dataForm.NV_Ma}/${dataForm.PB_Ma}/${dataForm.CV_Ma}`);
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
    }
  }, [table, dataForm, rowkey, edit_route]);

  // Khởi tạo dữ liệu khi modal mở
  useEffect(() => {
    if (isOpen && data) {
      setDataForm(data);
    }
  }, [data, isOpen]);

  // Hàm gửi API để cập nhật dữ liệu
  const onSubmit = async () => {
    try {
      // Sao chép dataForm và chuyển đổi các trường ngày nếu có
      const updatedData = { ...dataForm };
      columnName.forEach((col) => {
        if (col.name.toLowerCase().includes("date") || col.name.toLowerCase().includes("ngày")) {
          updatedData[col.uid] = formatDateForMySQL(updatedData[col.uid]);
        }
      });

      // Gọi API PUT để cập nhật dữ liệu
      const res = await apiClient.put(route, updatedData);
      if (res.status === 200) {
        onEditSuccess(res.data.updatedData); // Gọi callback thành công
        onClose(); // Đóng modal
      } else {
        alert(`Cập nhật ${table.toLowerCase()} thất bại!`);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu: ", error);
      alert("Đã xảy ra lỗi khi cập nhật dữ liệu.");
    }
  };

  // Hàm thay đổi giá trị input
  const onChangeText = (e) => {
    setError("");
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  // Hàm thay đổi giá trị của DatePicker
  const onDateChange = (date, key) => {
    setDataForm({
      ...dataForm,
      [key]: date ? date.toISOString() : "", // Đảm bảo rằng ngày được lưu dưới định dạng chuẩn
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
