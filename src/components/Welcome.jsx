import React from "react";

const Welcome = () => {
  return (
    <div className="company-presentation py-5">
      <div className="container">
        <div className="row">
          <div>
            <img
              src="https://www.svgrepo.com/show/9509/bank.svg"
              alt="bank-welcome"
              className="img-fluid"
              width="1000"
              height="1000"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "60%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
