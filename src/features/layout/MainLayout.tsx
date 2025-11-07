import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarMenu } from "./components/SideBarMenu";

export const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen surface-ground">
      <div className="w-16rem p-2 border-right-1 surface-border">
        <SidebarMenu />
      </div>
      <div className="grow p-3 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
