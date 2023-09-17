import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
// import { deleteImageFileNotebook } from "../../store/image";
import { thunkDeleteNotebook } from "../../store/notebooks";
import "./NotebookDeleteModal.css";

export default function NotebookDeleteModal({ notebookId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      //   const resDeleteImg = await dispatch(deleteImageFileNotebook(notebookId));
      const res = await dispatch(thunkDeleteNotebook(notebookId));
      //   if (resDeleteImg.message && res.message) {
      //     closeModal();
      //   }
      if (res.message) {
        closeModal();
        history.push(`/notebooks`);
      }
    } catch {
    }
  }

  return (
    <>
      <div id='notebook-delete-modal-outermost-box'>
        <div id='notebook-delete-modal-text'>
          Delete notebook?
        </div>
        <div id='notebook_delete_modal_btns'>
          <button onClick={closeModal} id='notebook-cancel-delete-btn'>
            No
          </button>
          <button onClick={handleDelete} id='notebook-confirm-delete-btn'>
            Yes
          </button>
        </div>
      </div>
    </>
  )
};
