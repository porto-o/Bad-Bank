import React from "react";
import CreateForm from "./Forms/create";
import "../styles/createForm.css" // Import the CSS styles

const CreateAccount = () => {
  return (
    <div className="container create-account">
      <CreateForm />
    </div>
  );
};

export default CreateAccount;
