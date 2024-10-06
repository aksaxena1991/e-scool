import React from "react";
import { Outlet } from "react-router-dom";
import PageTitle from "../page-title/PageTitle";
import "./main.css";

const Main: React.FC = () => {
  return (
    <main id="main" className="main">
      <PageTitle page="Dashboard" />
      <Outlet />
    </main>
  );
};
export default Main;
