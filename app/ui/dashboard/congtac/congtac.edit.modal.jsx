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
  table,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import apiClient from "@/app/lib/api-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateForMySQL } from "@/app/utils/Date";
import { EditIcon } from "@/public/EditIcon";

export default function CT_EditModal({
  func,
  data,
  edit_route,
  onEditSuccess,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Khởi tạo state với giá trị mặc định rỗng
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedPhongBan, setSelectedPhongBan] = useState("");
  const [selectedChucVu, setSelectedChucVu] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [phongbans, setPhongbans] = useState([]);
  const [chucvus, setChucvus] = useState([]);
  const [error, setError] = useState("");

  // Gán giá trị mặc định từ `data` khi modal mở lần đầu
  useEffect(() => {
    if (isOpen && data) {
      setSelectedEmployee(data.NV_Ma || "");
      setSelectedPhongBan(data.PB_Ma || "");
      setSelectedChucVu(data.CV_Ma || "");
      setStartDate(data.CT_BatDau ? new Date(data.CT_BatDau) : null);
      setEndDate(data.CT_KetThuc ? new Date(data.CT_KetThuc) : null);
    }
  }, [isOpen, data]);

  useEffect(() => {
    if (isOpen) {
      const fetchEmployees = async () => {
        try {
          const response = await apiClient.get("/api/nhanviens");
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

  const handleEmployeeChange = (value) => setSelectedEmployee(value);
  const handlePhongBanChange = (value) => setSelectedPhongBan(value);
  const handleChucVuChange = (value) => setSelectedChucVu(value);

  const onSubmit = async () => {
    if (
      !selectedEmployee ||
      !startDate ||
      !selectedPhongBan ||
      !selectedChucVu
    ) {
      setError("Vui lòng nhập đủ thông tin");
      return;
    }
    if (endDate && startDate > endDate) {
      setError("Ngày bắt đầu không được lớn hơn ngày kết thúc");
      return;
    }
    const formattedEndDate = endDate ? formatDateForMySQL(endDate) : null;
    setError("");

    try {
      const response = await apiClient.put(
        `${edit_route}/${selectedEmployee}/${selectedPhongBan}/${selectedChucVu}`,
        {
          CT_BatDau: formatDateForMySQL(startDate),
          CT_KetThuc: formattedEndDate,
        }
      );

      if (response.status === 200) {
        alert("Chỉnh sửa thành công");
        onEditSuccess(response.data.updatedData);
        onClose();
      } else {
        alert("Chỉnh sửa thất bại");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Đã xảy ra lỗi khi chỉnh sửa");
    }
  };

  return (
    <div className="items-center">
      <Tooltip content={func} color="primary">
        <span
          className="text-lg cursor-pointer active:opacity-50"
          onClick={onOpen}
        >
          <EditIcon/>
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                <span>Chỉnh sửa công tác</span>
              </ModalHeader>
              <ModalBody className="text-gray-700 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Nhân Viên
                    </label>
                    <Select
                      isRequired
                      isDisabled
                      placeholder={selectedEmployee}
                      className="max-w-xs"
                      value={selectedEmployee}
                      onChange={(e) => handleEmployeeChange(e.target.value)}
                    >
                      {employees.map((employee) => (
                        <SelectItem
                          className="text-black"
                          key={employee.NV_Ma}
                          textValue={employee.NV_Ma}
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
                      isDisabled
                      placeholder={selectedPhongBan}
                      className="max-w-xs"
                      value={selectedPhongBan}
                      onChange={(e) => handlePhongBanChange(e.target.value)}
                    >
                      {phongbans.map((phongban) => (
                        <SelectItem
                          className="text-black"
                          key={phongban.PB_Ma}
                          textValue={phongban.PB_Ma}
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
                      isDisabled
                      placeholder={selectedChucVu}
                      className="max-w-xs"
                      value={selectedChucVu}
                      defaultSelectedKeys={selectedChucVu}
                      onChange={(e) => handleChucVuChange(e.target.value)}
                    >
                      {chucvus.map((chucvu) => (
                        <SelectItem
                          className="text-black"
                          key={chucvu.CV_Ma}
                          textValue={chucvu.CV_Ma}
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
                      value={endDate}
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
