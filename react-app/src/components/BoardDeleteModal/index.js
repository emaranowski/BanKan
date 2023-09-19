import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
// import { deleteImageFileBoard } from "../../store/image";
import { thunkDeleteBoard, thunkGetAllBoards } from "../../store/boards";
import "./BoardDeleteModal.css";

export default function BoardDeleteModal({ boardId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id;

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
        dispatch(thunkGetAllBoards(userId))
        history.push(`/dashboard`);
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
        <div id='board-delete-modal-btns'>
          <button onClick={closeModal} id='board-cancel-delete-btn'>
            Cancel
          </button>
          <button onClick={handleDelete} id='board-confirm-delete-btn'>
            Delete
          </button>
        </div>
      </div>
    </>
  )
};
