import React, { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import type { SelectableQuestion } from '../../../common/types/selectedQuestion';

type Props = {
  visible: boolean;
  onHide: () => void;
};

export const QuestionSelectorDialog: React.FC<Props> = ({ visible, onHide }) => {
  const toast = useRef<Toast>(null);
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<'open' | 'closed' | null>(null);

  const allQuestions: SelectableQuestion[] = [
    { id: 1, text: 'What is React?', category: 1, type: 'open' },
    { id: 2, text: 'Tailwind question', category: 2, type: 'closed' },
    { id: 3, text: 'useState hook', category: 1, type: 'open' },
  ];

  const filtered = allQuestions.filter((q) => {
    const cat = categoryFilter === null || q.category === categoryFilter;
    const type = typeFilter === null || q.type === typeFilter;
    return cat && type;
  });

  const categoryOptions = [
    { label: 'All Categories', value: null },
    { label: 'Category 1', value: 1 },
    { label: 'Category 2', value: 2 },
  ];

  const typeOptions = [
    { label: 'All Types', value: null },
    { label: 'Open', value: 'open' },
    { label: 'Closed', value: 'closed' },
  ];

  return (
    <Dialog
      header="Select Existing Questions"
      visible={visible}
      onHide={onHide}
      style={{ width: '50vw' }}
      modal
      className="p-4"
    >
      <Toast ref={toast} />

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Dropdown
          value={categoryFilter}
          options={categoryOptions}
          onChange={(e) => setCategoryFilter(e.value)}
          placeholder="Filter by Category"
          className="w-full md:w-1/2"
        />

        <Dropdown
          value={typeFilter}
          options={typeOptions}
          onChange={(e) => setTypeFilter(e.value)}
          placeholder="Filter by Type"
          className="w-full md:w-1/2"
        />
      </div>

      <DataTable value={filtered} paginator rows={5} emptyMessage="No questions found.">
        <Column field="id" header="ID" />
        <Column field="text" header="Question" />
        <Column field="category" header="Category" />
        <Column field="type" header="Type" />
        <Column
          header="Select"
          body={(row) => (
            <Button
              label="Select"
              icon="pi pi-check"
              className="p-button-sm p-button-success"
              onClick={() =>
                toast.current?.show({
                  severity: 'info',
                  summary: 'Question Selected',
                  detail: row.text,
                  life: 2000,
                })
              }
            />
          )}
        />
      </DataTable>

      <div className="flex justify-end mt-4">
        <Button label="Close" icon="pi pi-times" className="p-button-text" onClick={onHide} />
      </div>
    </Dialog>
  );
};
