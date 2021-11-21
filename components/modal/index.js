const Modal = ({ open, onConfirm, onCancel, children }) => {
  return (
    <div className={`modal z-100 ${open && "modal-open"}`}>
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <button class="btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export { Modal };
