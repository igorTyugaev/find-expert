import React from "react";

import ReactDOM from "react-dom";

import UserFormPage from "./UserFormPage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<UserFormPage />, div);

  ReactDOM.unmountComponentAtNode(div);
});
