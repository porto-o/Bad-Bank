import React, { useEffect, useState } from "react";

export default function LoadingModal({ show, loading, message }) {
  const [modalShow, setModalShow] = useState(show);

  useEffect(() => {
    setModalShow(show);
  }, [show]);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div
      className={`modal ${modalShow ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: modalShow ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Bad Bank
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status"></div>
              </div>
            ) : message ? (
              <div className="alert alert-danger" role="alert">
                {message.message}
              </div>
            ) : (
              <div className="success">
                <div className="alert alert-success" role="alert">
                  Success!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
