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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    maPhongBan: "",
    tenPhongBan: "",
    vanPhong: "",
    maTruongPhong: "",
  });

  const onSubmit = () => {
    const { maPhongBan, maTruongPhong } = dataForm;

    if (!maPhongBan && !maTruongPhong) {
      setError("Mã phòng ban và mã trưởng phòng là bắt buộc.");
      return;
    } else if (!maPhongBan) {
      setError("Mã phòng ban là bắt buộc.");
      return;
    } else if (!maTruongPhong) {
      setError("Mã trưởng phòng là bắt buộc.");
      return;
    }
    setError("");
    // Xử lý logic khi form hợp lệ
    console.log("Dữ liệu form:", dataForm);
    onClose();
  };

  const onChangeText = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="items-center">
      <Button onPress={onOpen}>{func} phòng ban</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                {func} phòng ban
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
                {error && <p className="text-red-500">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Hủy {func.toLowerCase()} phòng ban
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
