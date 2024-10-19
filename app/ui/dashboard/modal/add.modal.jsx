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
  colors,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import apiClient from "@/app/lib/api-client";

export default function Addmodal({
  func,
  table,
  columnName,
  add_route,
  onSuccess,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [dataForm, setDataForm] = useState({});
  const [error, setError] = useState("");

  // Khởi tạo form rỗng khi modal mở
  useEffect(() => {
    if (isOpen) {
      setError("");
      const form = columnName.reduce((acc, col) => {
        if (col.uid !== "actions") {
          acc[col.uid] = "";
        }
        return acc;
      }, {});
      setDataForm(form);
    }
  }, [isOpen, columnName]);

  const onSubmit = async () => {
    try {
      if (Object.values(dataForm).every((item) => item !== "")) {
        setError("");
        console.log(dataForm);
        const res = await apiClient.post(add_route, dataForm);
        if (res.status === 200) {
          alert(`Thêm mới ${table.toLowerCase()} thành công`);
          if (onSuccess) {
            onSuccess(res.data);
          }
        } else {
          alert(`Thêm mới ${table.toLowerCase()} thất bại`);
        }
        onClose();
      } else {
        setError("Vui lòng nhập đủ thông tin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeText = (e) => {
    setError("");
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
          <span>Thêm mới</span>
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
                  const column = columnName.find((col) => col.uid === key);
                  return (
                    <Input
                      key={key}
                      type="text"
                      label={
                        column ? (
                          <>
                            <span className="text-red-600">* </span>
                            {column.name}
                          </>
                        ) : (
                          key
                        )
                      }
                      placeholder={`Nhập vào ${
                        column
                          ? column.name.replace(/_/g, " ").toLowerCase()
                          : key
                      }`}
                      name={key}
                      required
                      value={dataForm[key]}
                      onChange={onChangeText}
                    />
                  );
                })}
              </ModalBody>
              <ModalFooter>
                {error && <p className="text-red-600 text-sm">{error}</p>}
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
