import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <Link to="/clients/add" className="btn btn-success btn-block">
        <li className="fas fa-plus" /> New
      </Link>
    </div>
  );
};
