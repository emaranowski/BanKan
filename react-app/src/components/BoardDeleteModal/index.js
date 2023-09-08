import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
// import { deleteImageFileBoard } from "../../store/image";
import { thunkDeleteBoard } from "../../store/boards";
import "./BoardDeleteModal.css";

export default function BoardDeleteModal({ boardId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      //   const resDeleteImg = await dispatch(deleteImageFileBoard(boardId));
      const res = await dispatch(thunkDeleteBoard(boardId));
      //   if (resDeleteImg.message && res.message) {
      //     closeModal();
      //   }
      if (res.message) {
        closeModal();
        history.push(`/boards`);
      }
    } catch {
    }
  }

  return (
    <>
      <div id='board-delete-modal-outermost-box'>
        <div id='board-delete-modal-text'>
          Delete board?
        </div>
        <div id='board_delete_modal_btns'>
          <button onClick={closeModal} id='board-cancel-delete-btn'>
            No
          </button>
          <button onClick={handleDelete} id='board-confirm-delete-btn'>
            Yes
          </button>
        </div>
      </div>
    </>
  )
};
