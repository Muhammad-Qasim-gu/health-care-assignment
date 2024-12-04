"use client";
import React, { ReactNode } from "react";
import Header from "../_components/header";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <Header />

      <div>{children}</div>
    </div>
  );
};

export default RootLayout;
