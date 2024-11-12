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

export default function PB_AddModal({ func, add_route, onAddSuccess }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [maPhongBan, setMaPhongBan] = useState("");
  const [tenPhongBan, setTenPhongBan] = useState("");
  const [vanPhong, setVanPhong] = useState("");
  const [truongPhong, setTruongPhong] = useState("");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

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
        } catch (error) {
          console.error("Failed to fetch employees", error);
        }
      };
      fetchEmployees();
    }
  }, [isOpen]);

  const onSubmit = async () => {
    if (!maPhongBan || !tenPhongBan || !vanPhong || !truongPhong) {
      setError("Vui lòng nhập đủ thông tin");
      return;
    }
    setError("");

    try {
      console.log(maPhongBan, tenPhongBan, vanPhong, truongPhong, add_route);
      const response = await apiClient.post(add_route, {
        PB_Ma: maPhongBan,
        PB_TenPhongBan: tenPhongBan,
        PB_VanPhong: vanPhong,
        PB_MaTruongPhong: truongPhong,
      });

      if (response.status === 200) {
        alert("Thêm phòng ban thành công");
        console.log(response.data.updatedData);
        onAddSuccess(response.data.updatedData);
        onClose();
      } else {
        alert("Thêm phòng ban thất bại");
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
          <span>Thêm phòng ban</span>
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
                      Mã Phòng Ban
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập mã phòng ban"
                      value={maPhongBan}
                      onChange={(e) => setMaPhongBan(e.target.value)}
                      className="w-full p-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Tên Phòng Ban
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập tên phòng ban"
                      value={tenPhongBan}
                      onChange={(e) => setTenPhongBan(e.target.value)}
                      className="w-full p-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Văn Phòng
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập văn phòng"
                      value={vanPhong}
                      onChange={(e) => setVanPhong(e.target.value)}
                      className="w-full p-2 mt-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-gray-600">
                      Trưởng Phòng
                    </label>
                    <Select
                      isRequired
                      label="Chọn trưởng phòng"
                      placeholder="Chọn trưởng phòng"
                      className="max-w-xs"
                      onChange={(e) => setTruongPhong(e.target.value)}
                    >
                      {employees.map((employee) => (
                        <SelectItem
                          className="text-black"
                          key={employee.NV_Ma}
                          textValue={employee.NV_Ma}
                        >
                          {employee.NV_Ma} - {employee.NV_TenNV}
                        </SelectItem>
                      ))}
                    </Select>
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
