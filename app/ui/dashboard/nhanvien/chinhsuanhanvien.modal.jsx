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
  FormData,
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { EditIcon } from "@/public/EditIcon";

export default function EditNVModal({ func }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataForm, setDataForm] = useState({
    maNhanVien: "",
    tenNhanVien: "",
    ngaySinh: "",
    diaChi: "",
    soDienThoai: ""
  });

  const onSubmit = () => {
    console.log(dataForm);
  };

  const onChangeText = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
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
                {func} nhân viên
              </ModalHeader>
              <ModalBody className="text-black">
                <Input
                  type="text"
                  label="Mã nhân viên"
                  placeholder="Nhập vào mã nhân viên"
                  name="maNhanVien"
                  required
                  value={dataForm.maNhanVien}
                  onChange={onChangeText}
                />
                <Input
                  type="text"
                  label="Tên nhân viên"
                  placeholder="Nhập vào tên nhân viên"
                  name="tenNhanVien"
                  required
                  value={dataForm.tenNhanVien}
                  onChange={onChangeText}
                />
                <Input
                  type="text"
                  label="Ngày sinh"
                  placeholder="Nhập vào ngày sinh"
                  name="ngaySinh"
                  required
                  value={dataForm.ngaySinh}
                  onChange={onChangeText}
                />
                <Input
                  type="text"
                  label="Địa chỉ"
                  placeholder="Nhập vào địa chỉ"
                  name="diaChi"
                  required
                  value={dataForm.diaChi}
                  onChange={onChangeText}
                />
                <Input
                  type="text"
                  label="Số điện thoại"
                  placeholder="Nhập vào Số điện thoại"
                  name="soDienThoai"
                  required
                  value={dataForm.soDienThoai}
                  onChange={onChangeText}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Hủy {func.toLowerCase()} nhân viên
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
