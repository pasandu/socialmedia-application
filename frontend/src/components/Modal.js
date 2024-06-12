import React from 'react';
import '../css/Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Success!</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;