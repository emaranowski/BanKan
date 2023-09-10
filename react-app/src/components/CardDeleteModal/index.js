import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { thunkDeleteCard } from "../../store/cards";
import "./CardDeleteModal.css";

export default function CardDeleteModal({ cardId, boardId }) { // must pass in boardId
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(thunkDeleteCard(cardId));
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