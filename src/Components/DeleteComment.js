import React from "react";
import "./Styles/DeleteComment.css";

const DeleteComment = (props) => {
  //   props.displayModal(showModal, setShowModal);
  //   const cancelDelete = function () {
  //     setShowModal(false);
  //   };
  const deleteHandler = function () {
    props.deleteComment(props.id);
  };

  return (
    <div className="modal-container">
      <div className="modal-overlay">
        <h3>Delete comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <footer className="modal-footer">
          <button className="btn-cancel" onClick={props.displayModal}>
            NO, CANCEL
          </button>
          <button className="btn-delete" onClick={deleteHandler}>
            YES, DELETE
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteComment;
