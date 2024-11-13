'use client';
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateForMySQL } from "@/app/utils/Date";
import { EditIcon } from "@/public/EditIcon";

export default function SalaryEditModal({
  func,
  data,
  edit_route,
  onEditSuccess,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Khởi tạo state với giá trị mặc định
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [basicSalary, setBasicSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [taxDeduction, setTaxDeduction] = useState("");
  const [error, setError] = useState("");

  // Gán giá trị mặc định từ `data` khi modal mở lần đầu
  useEffect(() => {
    if (isOpen && data) {
      setStartDate(data.LUONG_BatDau ? new Date(data.LUONG_BatDau) : null);
      setEndDate(data.LUONG_KetThuc ? new Date(data.LUONG_KetThuc) : null);
      setBasicSalary(data.LUONG_LuongCoBan || "");
      setAllowance(data.LUONG_PhuCap || "");
      setTaxDeduction(data.LUONG_KhauTruThue || "");
    }
  }, [isOpen, data]);

  const onSubmit = async () => {
    if (!basicSalary || !startDate) {
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
        `${edit_route}/${data.NV_Ma}`,
        {
          LUONG_LuongCoBan: basicSalary,
          LUONG_PhuCap: allowance,
          LUONG_KhauTruThue: taxDeduction,
          LUONG_BatDau: formatDateForMySQL(startDate),
          LUONG_KetThuc: formattedEndDate,
        }
      );

      if (response.status === 200) {
        alert("Chỉnh sửa thành công");
        console.log(response.data.updatedData);
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
                <span>Chỉnh sửa lương</span>
              </ModalHeader>
              <ModalBody className="text-gray-700 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Mã nhân viên
                    </label>
                    <Input isDisabled placeholder={data.NV_Ma} />

                    <label className="block font-medium text-gray-600">
                      Tên nhân viên
                    </label>
                    <Input isDisabled placeholder={data.NV_TenNV} />
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Lương cơ bản
                    </label>
                    <Input
                      type="number"
                      value={basicSalary}
                      onChange={(e) => setBasicSalary(e.target.value)}
                    />

                    <label className="block font-medium text-gray-600">
                      Phụ cấp
                    </label>
                    <Input
                      type="number"
                      value={allowance}
                      onChange={(e) => setAllowance(e.target.value)}
                    />

                    <label className="block font-medium text-gray-600">
                      Khấu trừ thuế
                    </label>
                    <Input
                      type="number"
                      value={taxDeduction}
                      onChange={(e) => setTaxDeduction(e.target.value)}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Ngày bắt đầu
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
                      Ngày kết thúc
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
