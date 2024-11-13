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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import apiClient from "@/app/lib/api-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateForMySQL } from "@/app/utils/Date";

export default function DMLuong_AddModal({ func, add_route, onAddSuccess }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [LUONG_LuongCoBan, setLuongCoBan] = useState("");
  const [LUONG_PhuCap, setPhuCap] = useState("");
  const [LUONG_KhauTruThue, setKhauTruThue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  // Lấy dữ liệu nhân viên khi mở modal
  useEffect(() => {
    if (isOpen) {
      const fetchEmployees = async () => {
        try {
          const response = await apiClient.get("/api/nhanviens");
          setEmployees(
            response.data.map(({ NV_Ma, NV_TenNV }) => ({
              NV_Ma,
              NV_TenNV,
            }))
          );
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
        }
      };
      fetchEmployees();
    }
  }, [isOpen]);

  const handleEmployeeChange = (value) => setSelectedEmployee(value);

  const onSubmit = async () => {
    if (!selectedEmployee || !LUONG_LuongCoBan || !LUONG_PhuCap || !LUONG_KhauTruThue || !startDate) {
      setError("Vui lòng nhập đủ thông tin");
      return;
    }
    if (endDate && startDate > endDate) {
      setError("Ngày bắt đầu không được lớn hơn ngày kết thúc");
      return;
    }

    setError("");

    try {
      const response = await apiClient.post(add_route, {
        NV_Ma: selectedEmployee,
        LUONG_LuongCoBan,
        LUONG_PhuCap,
        LUONG_KhauTruThue,
        LUONG_BatDau: formatDateForMySQL(startDate),
        LUONG_KetThuc: endDate ? formatDateForMySQL(endDate) : null,
      });

      if (response.status === 200) {
        alert("Thêm mới thành công");
        onAddSuccess(response.data.updatedData);
        onClose();
      } else {
        alert("Thêm mới thất bại");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Đã xảy ra lỗi khi thêm mới");
    }
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
              </ModalHeader>
              <ModalBody className="text-gray-700 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-gray-600">Nhân Viên</label>
                    <Select
                      isRequired
                      placeholder="Chọn 1 nhân viên"
                      label="Chọn nhân viên"
                      onChange={(e) => handleEmployeeChange(e.target.value)}
                    >
                      {employees.map((employee) => (
                        <SelectItem key={employee.NV_Ma} textValue={employee.NV_Ma} className="text-black">
                          {employee.NV_Ma} {employee.NV_TenNV}
                        </SelectItem>
                      ))}
                    </Select>

                    <label className="block font-medium text-gray-600">Lương Cơ Bản</label>
                    <Input
                      type="number"
                      value={LUONG_LuongCoBan}
                      onChange={(e) => setLuongCoBan(e.target.value)}
                      placeholder="Nhập lương cơ bản"
                    />

                    <label className="block font-medium text-gray-600">Phụ Cấp</label>
                    <Input
                      type="number"
                      value={LUONG_PhuCap}
                      onChange={(e) => setPhuCap(e.target.value)}
                      placeholder="Nhập phụ cấp"
                    />

                    <label className="block font-medium text-gray-600">Khấu Trừ Thuế</label>
                    <Input
                      type="number"
                      value={LUONG_KhauTruThue}
                      onChange={(e) => setKhauTruThue(e.target.value)}
                      placeholder="Nhập khấu trừ thuế"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-600">Ngày Bắt Đầu</label>
                    <DatePicker
                      selected={startDate}
                      onChange={setStartDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày bắt đầu"
                    />

                    <label className="block font-medium text-gray-600">Ngày Kết Thúc</label>
                    <DatePicker
                      selected={endDate}
                      onChange={setEndDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày kết thúc"
                    />
                  </div>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>Hủy</Button>
                <Button color="primary" onPress={onSubmit}>{func}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
