"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { EyeIcon } from "@/public/EyeIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateForMySQL } from "@/app/utils/Date";

export default function ViewModal({ func, table, data, columnName }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    if (isOpen && data) {
      setDataForm(data);
    }
  }, [data, isOpen]);

  return (
    <div className="items-center">
      <Tooltip content={func} color="primary">
        <span
          className="text-lg cursor-pointer active:opacity-50"
          onClick={onOpen}
        >
          <EyeIcon />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-2 text-xl font-semibold text-gray-800">
                <span>{func}</span>
                <span className="text-sm text-gray-500">
                  {table ? table.toLowerCase() : "Unknown Table"}
                </span>
              </ModalHeader>
              <ModalBody className="text-gray-700 max-h-[70vh] overflow-y-auto">
                {/* Grid Layout for displaying fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.keys(dataForm).map((key) => {
                    const column = columnName.find((col) => col.uid === key);
                    const isDateField =
                      column && column.name.toLowerCase().includes("ngày");

                    return (
                      <div key={key} className="mb-6">
                        <div className="flex items-center justify-between">
                          <label className="block font-medium text-gray-600">
                            {column ? column.name : key}
                          </label>
                        </div>
                        <div className="mt-2">
                          {isDateField ? (
                            <DatePicker
                              selected={
                                dataForm[key] && !isNaN(new Date(dataForm[key]))
                                  ? new Date(dataForm[key])
                                  : null
                              }
                              dateFormat="dd/MM/yyyy"
                              className="w-full p-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              readOnly
                            />
                          ) : (
                            <div className="text-lg font-medium text-gray-900">
                              {dataForm[key]}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="w-full py-2 bg-red-500 text-white font-semibold hover:bg-red-600"
                >
                  Đóng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
