import React from "react";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { useNavigate } from "react-router-dom";

export const SidebarMenu: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Exams", icon: "pi pi-pencil", path: "/exams" },
    { label: "Questions", icon: "pi pi-question", path: "/questions" },
    { label: "Surveys", icon: "pi pi-chart-bar", path: "/surveys" },
    { label: "Users", icon: "pi pi-users", path: "/users" },
  ];

  return (
    <Panel header="Menu" className="h-full p-3 shadow-2 surface-card">
      <div className="flex flex-column gap-3">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            label={item.label}
            icon={item.icon}
            className="p-button-outlined w-full justify-content-start"
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </Panel>
  );
};
