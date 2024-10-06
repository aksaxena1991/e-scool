import React from "react";
import "./pageTitle.css";

type PageTitleProps = {
    page:string;
};

const PageTitle: React.FC<PageTitleProps> = ({page}) => {
  return (
    <div className="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">
              <i className="bi bi-house-door"></i>
            </a>
          </li>
          <li className="breadcrumb-item active">{page}</li>
        </ol>
      </nav>
    </div>
  );
};

export default PageTitle;
