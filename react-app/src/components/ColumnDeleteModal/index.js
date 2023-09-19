import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { thunkDeleteColumn } from "../../store/columns";
import "./ColumnDeleteModal.css";

export default function ColumnDeleteModal({ columnId, boardId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(thunkDeleteColumn(columnId));
      if (res.message) {
        closeModal();
        history.push(`/boards/${boardId}`);
      }
    } catch {
      closeModal();
    }
  }

  return (
    <>
      <div id='column-delete-modal-outermost-box'>
        <div id='column-delete-modal-text'>
          Delete column?
        </div>
        <div id='column-delete-modal-btns'>
          <button onClick={closeModal} id='column-cancel-delete-btn'>
            Cancel
          </button>
          <button onClick={handleDelete} id='column-confirm-delete-btn'>
            Delete
          </button>
        </div>
      </div>
    </>
  )
};
