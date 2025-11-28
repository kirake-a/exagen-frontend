import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

type Props = {
  visible: boolean;
  onHide: () => void;
  onCreate: (name: string) => void;
};

export const CreateCategoryDialog: React.FC<Props> = ({
  visible,
  onHide,
  onCreate,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "") return;
    onCreate(name.trim());
    setName("");
    onHide();
  };

  return (
    <Dialog
      header="Create New Category"
      visible={visible}
      onHide={onHide}
      style={{ width: "30vw" }}
      modal
      className="p-4"
    >
      <div className="flex flex-col gap-4">
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="w-full"
        />

        <Button
          label="Create"
          icon="pi pi-check"
          className="p-button-success"
          onClick={handleSubmit}
        />
      </div>
    </Dialog>
  );
};
