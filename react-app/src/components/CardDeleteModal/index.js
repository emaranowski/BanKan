import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteCard } from "../../store/cards";
import { thunkGetAllColumnsForBoard } from '../../store/columns';
import "./CardDeleteModal.css";

export default function CardDeleteModal({ cardId, boardId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(thunkDeleteCard(cardId));
      if (res.message) {
        closeModal();
        dispatch(thunkGetAllColumnsForBoard(boardId));
      }
    } catch {
      closeModal();
    }
  }

  return (
    <>
      <div id='card_delete_modal_outermost_box'>
        <div id='card_delete_modal_text'>
          Delete card?
        </div>
        <div id='card_delete_modal_btns'>
          <button onClick={closeModal} id='card_cancel_delete_btn'>
            No
          </button>
          <button onClick={handleDelete} id='card_confirm_delete_btn'>
            Yes
          </button>
        </div>
      </div>
    </>
  )
};
