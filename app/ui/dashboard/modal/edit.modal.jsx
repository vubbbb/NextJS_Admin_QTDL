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
import { EditIcon } from "@/public/EditIcon";

export default function EditModal({ func, table, data, columnName }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (data) {
        console.log("du lieu nhan duoc o modal ", func, columnName);
        setDataForm(data); // Đặt dữ liệu ban đầu từ prop data
      }
    }
  }, [data, isOpen]);

  const onSubmit = () => {
    console.log(dataForm);
    // Thêm mã để gửi dữ liệu form đến API hoặc xử lý khác
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
                {func} {table.toLowerCase()}
              </ModalHeader>
              <ModalBody className="text-black">
                {Object.keys(dataForm).map((key) => {
                  // Tìm 'name' tương ứng với 'uid'
                  const column = columnName.find((col) => col.uid === key);
                  return (
                    <Input
                      key={key}
                      type="text"
                      label={column ? column.name : key} // Hiển thị name làm label
                      placeholder={`Nhập vào ${column ? column.name.replace(/_/g, " ") : key}`}
                      name={key}
                      required
                      value={dataForm[key]}
                      onChange={onChangeText}
                    />
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Hủy {func.toLowerCase()} {table.toLowerCase()}
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
