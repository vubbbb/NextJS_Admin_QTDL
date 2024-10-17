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

export default function QLModal({ func }) {
  // todo: lấy dữ liệu văn phòng từ api
  // thay phần này bằng dữ liệu văn phòng
  const vanphong = [
    { label: "Dog", value: "dog" },
    { label: "Cat", value: "cat" },
    { label: "Horse", value: "horse" },
    { label: "Turtle", value: "turtle" },
    { label: "Elephant", value: "elephant" },
    { label: "Squirrel", value: "squirrel" },
    { label: "Giraffe", value: "giraffe" },
    { label: "Lion", value: "lion" },
    { label: "Pig", value: "pig" },
    { label: "Rabbit", value: "rabbit" },
    { label: "Bear", value: "bear" },
    { label: "Deer", value: "deer" },
    { label: "Fox", value: "fox" },
    { label: "Wolf", value: "wolf" },
    { label: "Dolphin", value: "dolphin" },
    { label: "Shark", value: "shark" },
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                />
                <Input
                  type="text"
                  label="Tên phòng ban"
                  placeholder="Nhập vào tên phòng ban"
                />
                <Input
                  type="text"
                  label="Văn phòng"
                  placeholder="Nhập vào tên phòng ban"
                />
                <Autocomplete
                  defaultItems={vanphong}
                  label="Favorite Animal"
                  placeholder="Search an animal"
                  className="max-w-xs "
                >
                  {(animal) => (
                    <AutocompleteItem key={animal.value} className="text-black">
                      {animal.label}  
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Hủy {func.toLowerCase()} phòng ban
                </Button>
                <Button color="primary" onPress={onClose}>
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
