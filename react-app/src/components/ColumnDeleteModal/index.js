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
      <div id='column_delete_modal_outermost_box'>
        <div id='column_delete_modal_text'>
          Delete column?
        </div>
        <div id='column_delete_modal_btns'>
          <button onClick={closeModal} id='column_cancel_delete_btn'>
            No
          </button>
          <button onClick={handleDelete} id='column_confirm_delete_btn'>
            Yes
          </button>
        </div>
      </div>
    </>
  )
};
