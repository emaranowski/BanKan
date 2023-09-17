import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { thunkDeleteNote } from "../../store/notes";
import { thunkGetOneNotebook } from "../../store/notebooks";
import "./NoteDeleteModal.css";

export default function NoteDeleteModal({ notebookId, noteId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(thunkDeleteNote(noteId));
      if (res.message) {
        closeModal();
        history.push(`/notebooks/${notebookId}`);
        dispatch(thunkGetOneNotebook(notebookId));
      }
    } catch {
      closeModal();
    }
  }

  return (
    <>
      <div id='note-delete-modal-outermost-box'>
        <div id='note-delete-modal-text'>
          Delete note?
        </div>
        <div id='note-delete-modal-btns'>
          <button onClick={closeModal} id='note-cancel-delete-btn'>
            No
          </button>
          <button onClick={handleDelete} id='note-confirm-delete-btn'>
            Yes
          </button>
        </div>
      </div>
    </>
  )
};
