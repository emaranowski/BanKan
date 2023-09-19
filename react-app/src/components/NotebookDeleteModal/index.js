import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
// import { deleteImageFileNotebook } from "../../store/image";
import { thunkDeleteNotebook, thunkGetAllNotebooks } from "../../store/notebooks";
import "./NotebookDeleteModal.css";

export default function NotebookDeleteModal({ notebookId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id;

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
        dispatch(thunkGetAllNotebooks(userId))
        history.push(`/dashboard`);
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
        <div id='notebook-delete-modal-btns'>
          <button onClick={closeModal} id='notebook-cancel-delete-btn'>
            Cancel
          </button>
          <button onClick={handleDelete} id='notebook-confirm-delete-btn'>
            Delete
          </button>
        </div>
      </div>
    </>
  )
};
