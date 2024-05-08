import TopNav from "@/components/layouts/TopNav";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopNav />
      {children}
    </div>
  );
};

export default Layout;
