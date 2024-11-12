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
import DatePicker from "react-datepicker"; // Thêm thư viện DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Đảm bảo import css của react-datepicker
import { formatDateForMySQL } from "@/app/utils/Date";

export default function CT_AddModal({ func, add_route, onAddSuccess }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedPhongBan, setSelectedPhongBan] = useState("");
  const [selectedChucVu, setSelectedChucVu] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [phongbans, setPhongbans] = useState([]);
  const [chucvus, setChucvus] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchEmployees = async () => {
        try {
          const response = await apiClient.get("/api/nhanviens");
          // Lọc chỉ lấy NV_Ma và NV_TenNV
          const employeeData = response.data.map((employee) => ({
            NV_Ma: employee.NV_Ma,
            NV_TenNV: employee.NV_TenNV,
          }));
          setEmployees(employeeData);
          const response1 = await apiClient.get("/api/phongbans");
          const phongbanData = response1.data.map((phongban) => ({
            PB_Ma: phongban.PB_Ma,
            PB_TenPhongBan: phongban.PB_TenPhongBan,
          }));
          setPhongbans(phongbanData);
          const response2 = await apiClient.get("/api/chucvus");
          const chucvuData = response2.data.map((chucvu) => ({
            CV_Ma: chucvu.CV_Ma,
            CV_TenCV: chucvu.CV_TenCV,
          }));
          setChucvus(chucvuData);
        } catch (error) {
          console.error("Failed to fetch employees", error);
        }
      };
      fetchEmployees();
    }
  }, [isOpen]);

  const handleEmployeeChange = (value) => {
    setSelectedEmployee(value); // Cập nhật giá trị nhân viên được chọn
    // Có thể gọi API thêm ở đây nếu cần thiết
  };

  const handlePhongBanChange = (value) => {
    setSelectedPhongBan(value); // Cập nhật giá trị phòng ban được chọn
    // Có thể gọi API thêm ở đây nếu cần thiết
  };

  const handleChucVuChange = (value) => {
    setSelectedChucVu(value); // Cập nhật giá trị chức vụ được chọn
    // Có thể gọi API thêm ở đây nếu cần thiết
  };

  const onSubmit = async () => {
    if (!selectedEmployee || !startDate || !selectedPhongBan || !selectedChucVu) {
      setError("Vui lòng nhập đủ thông tin");
      return;
    }
    if (endDate & startDate > endDate) {
      setError("Ngày bắt đầu không được lớn hơn ngày kết thúc");
      return;
    }
    const formattedEndDate = endDate ? formatDateForMySQL(endDate) : null;
    setError("");

    try {
      const response = await apiClient.post(add_route, {
        NV_Ma: selectedEmployee,
        PB_Ma: selectedPhongBan,
        CV_Ma: selectedChucVu,
        CT_BatDau: formatDateForMySQL(startDate),
        CT_KetThuc: formattedEndDate,
      });

      if (response.status === 200) {
        alert(`Thêm mới thành công`);
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
                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Nhân Viên
                    </label>
                    <Select
                      isRequired
                      label="Chọn nhân viên"
                      placeholder="Chọn 1 nhân viên"
                      className="max-w-xs"
                      onChange={(e) => handleEmployeeChange(e.target.value)} // Thêm sự kiện onChange
                    >
                      {employees.map((employee) => (
                        <SelectItem
                          className="text-black"
                          key={employee.NV_Ma}
                          textValue={employee.NV_Ma} // Cung cấp textValue cho mỗi item
                        >
                          {employee.NV_Ma} {employee.NV_TenNV}
                        </SelectItem>
                      ))}
                    </Select>

                    <label className="block font-medium text-gray-600">
                      Phòng Ban
                    </label>
                    <Select
                      isRequired
                      label="Chọn phòng ban"
                      placeholder="Chọn 1 phòng ban"
                      className="max-w-xs"
                      onChange={(e) => handlePhongBanChange(e.target.value)} // Thêm sự kiện onChange
                    >
                      {phongbans.map((phongban) => (
                        <SelectItem
                          className="text-black"
                          key={phongban.PB_Ma}
                          textValue={phongban.PB_Ma} // Cung cấp textValue cho mỗi item
                        >
                          {phongban.PB_Ma} {phongban.PB_TenPhongBan}
                        </SelectItem>
                      ))}
                    </Select>

                    <label className="block font-medium text-gray-600">
                      Chức Vụ
                    </label>
                    <Select
                      isRequired
                      label="Chọn chức vụ"
                      placeholder="Chọn 1 chức vụ"
                      className="max-w-xs"
                      onChange={(e) => handleChucVuChange(e.target.value)} // Thêm sự kiện onChange
                    >
                      {chucvus.map((chucvu) => (
                        <SelectItem
                          className="text-black"
                          key={chucvu.CV_Ma}
                          textValue={chucvu.CV_Ma} // Cung cấp textValue cho mỗi item
                        >
                          {chucvu.CV_Ma} {chucvu.CV_TenCV}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Ngày Bắt Đầu
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày bắt đầu"
                      className="w-full p-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Ngày Kết Thúc
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày kết thúc"
                      className="w-full p-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </ModalBody>
              <ModalFooter>
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
