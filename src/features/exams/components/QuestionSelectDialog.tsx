import React, { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { useQuestions } from '../../../hooks/useQuestion';

type Props = {
  visible: boolean;
  onHide: () => void;
  onSelect: (questionId: number, type: 'open' | 'closed') => void;
};

export const QuestionSelectorDialog: React.FC<Props> = ({ visible, onHide, onSelect }) => {
  const toast = useRef<Toast>(null);

  const { questions, loading } = useQuestions();

  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<'open' | 'closed' | null>(null);

  const allQuestions = [
    ...(questions?.openQuestions ?? []).map((q) => ({
      ...q,
      type: 'open' as const,
    })),
    ...(questions?.closedQuestions ?? []).map((q) => ({
      ...q,
      type: 'closed' as const,
    })),
  ];
  const filtered = allQuestions.filter((q) => {
    const cat = categoryFilter === null || q.categoryId === categoryFilter;
    const type = typeFilter === null || q.type === typeFilter;
    return cat && type;
  });


  const categoryOptions = [
    { label: 'All Categories', value: null },
    ...Array.from(new Set(allQuestions.map((q) => q.categoryId))).map((cat) => ({
      label: `Category ${cat}`,
      value: cat,
    })),
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

      <DataTable
        value={filtered}
        paginator
        rows={5}
        loading={loading}
        emptyMessage="No questions found."
      >
        <Column field="id" header="ID" />
        <Column field="statement" header="Question" />
        <Column field="categoryId" header="Category" />
        <Column field="type" header="Type" />

        <Column
          header="Select"
          body={(row) => (
            <Button
              label="Select"
              icon="pi pi-check"
              className="p-button-sm p-button-success"
              onClick={() => {
                onSelect(row.id, row.type);

                toast.current?.show({
                  severity: 'success',
                  summary: 'Question Added',
                  detail: row.statement,
                  life: 2000,
                });
              }}
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
