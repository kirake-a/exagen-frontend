import React, { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useQuestions } from '../../../../hooks/useQuestion';

type Props = {
  visible: boolean;
  onHide: () => void;
  onSelect: (questionId: number) => void;
};

export const ClosedQuestionSelectorDialog: React.FC<Props> = ({
  visible,
  onHide,
  onSelect
}) => {
  const toast = useRef<Toast>(null);
  const { questions, loading } = useQuestions();

  const closedQuestions = questions?.closedQuestions ?? [];

  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);

  const filtered = closedQuestions.filter((q) => {
    const cat = categoryFilter === null || q.categoryId === categoryFilter;
    return cat;
  });

  const categoryOptions = [
    { label: 'All Categories', value: null },
    ...Array.from(new Set(closedQuestions.map((q) => q.categoryId))).map(
      (cat) => ({
        label: `Category ${cat}`,
        value: cat
      })
    )
  ];

  return (
    <Dialog
      header="Select Closed Questions"
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
      </div>

      <DataTable
        value={filtered}
        paginator
        rows={5}
        loading={loading}
        emptyMessage="No closed questions found."
      >
        <Column field="id" header="ID" />
        <Column field="statement" header="Question" />
        <Column field="categoryId" header="Category" />

        <Column
          header="Select"
          body={(row) => (
            <Button
              label="Select"
              icon="pi pi-check"
              className="p-button-sm p-button-success"
              onClick={() => {
                onSelect(row.id);

                toast.current?.show({
                  severity: 'success',
                  summary: 'Closed Question Added',
                  detail: row.statement,
                  life: 2000
                });
              }}
            />
          )}
        />
      </DataTable>

      <div className="flex justify-end mt-4">
        <Button
          label="Close"
          icon="pi pi-times"
          className="p-button-text"
          onClick={onHide}
        />
      </div>
    </Dialog>
  );
};
