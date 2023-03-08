import React from "react";
import Modal from "./Modal";
import ErrorMsg from "./ErrorMsg";

const ErrorDlg = (props) => {
  const { open, close, error } = props;

  return (
    <Modal
      variant="danger"
      header="Error!"
      footer="Sorry, but it happens sometimes"
      show={open}
    >
      <div className="modal-body">
        <ErrorMsg msg={error.msg} />
        <div className="modal-body__button-container">
          <button className="modal-body__button" onClick={close}>
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorDlg;
