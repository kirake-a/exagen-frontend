import React from "react";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: "pi pi-home", path: "dashboard" },
    { label: "Exams", icon: "pi pi-pencil", path: "exams" },
    { label: "Questions", icon: "pi pi-question", path: "questions" },
    { label: "Surveys", icon: "pi pi-chart-bar", path: "surveys" },
  ];

  return (
    <Panel header="Menu" className="h-full shadow-2 surface-card">
      <div className="flex flex-column gap-2 p-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate(item.path)}
              className={`w-full justify-content-start ${
                isActive ? "bg-secondary border-primary" : "p-button-outlined"
              }`}
            />
          );
        })}
      </div>
    </Panel>
  );
};
