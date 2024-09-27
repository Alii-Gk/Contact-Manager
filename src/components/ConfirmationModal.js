import React from 'react';

function ConfirmationModal({ onClose, onConfirm }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>آیا مطمئن هستید؟</h2>
        <button onClick={onConfirm}>بله</button>
        <button onClick={onClose}>خیر</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
