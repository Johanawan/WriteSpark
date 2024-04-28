import "./ConfirmationModal.css"

function ConfirmModal({ isOpen, onClose, onConfirm, blogName }) {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete "{blogName}"?</p>
          <button onClick={onConfirm}>Yes, Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  }

export default ConfirmModal