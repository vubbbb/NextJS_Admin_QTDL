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
} from "@nextui-org/react";
import { useState } from "react";

export default function QLModal({ func }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataForm, setDataForm] = useState({
    maPhongBan: "",
    tenPhongBan: "",
    vanPhong: "",
    maTruongPhong: ""
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
      <Button onPress={onOpen}>{func} nhân viên</Button>
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
                  label="Mã phòng ban"
                  placeholder="Nhập vào mã phòng ban"
                  name="maPhongBan"
                  required
                  value={dataForm.maPhongBan}
                  onChange={onChangeText}
                />
                <Input
                  type="text"
                  label="Tên phòng ban"
                  placeholder="Nhập vào tên phòng ban"
                  name="tenPhongBan"
                  value={dataForm.tenPhongBan}
                  onChange={onChangeText}
                />
                <Input
                  type="text"
                  label="Văn phòng"
                  placeholder="Nhập vào văn phòng"
                  name="vanPhong"
                  value={dataForm.vanPhong}
                  onChange={onChangeText}
                />
                <Input
                  type="text"
                  label="Mã trưởng phòng"
                  placeholder="Nhập vào mã trưởng phòng"
                  name="maTruongPhong"
                  required
                  value={dataForm.maTruongPhong}
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
