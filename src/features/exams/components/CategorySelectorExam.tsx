import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import type { Category } from "../../../common/interfaces/categoryInterface";

type Props = {
  selectedCategory: number | null;
  onChange: (value: number | null) => void;
  onCreateCategory: () => void;
  categories: Category[]
};

export const CategorySelector: React.FC<Props> = ({
  categories,
  selectedCategory,
  onChange,
  onCreateCategory,
}) => {
  
  return (
    <div className="flex flex-col md:flex-row items-center gap-3">
      <Dropdown
        value={selectedCategory}
          options={categories.map(c => ({
          label: c.name,
          value: c.id
        }))}
        placeholder="Select Category"
        className="w-full md:w-8"
        onChange={(e) => onChange(e.value)}
      />

      <Button
        icon="pi pi-plus"
        label="Add Category"
        className="p-button-sm"
        onClick={onCreateCategory}
      />
    </div>
  );
};
