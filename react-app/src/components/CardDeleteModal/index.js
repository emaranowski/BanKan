import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteCard } from "../../store/cards";
import { thunkUpdateColumn } from '../../store/columns';
import "./CardDeleteModal.css";

export default function CardDeleteModal({ card, column, boardId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const cardId = card.id;
  const cardOrderArr = column.cardOrder.split(',');

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(thunkDeleteCard(cardId));
      if (res.message) {

        const idxOfDeletedCard = cardOrderArr.indexOf(card.dndId);

        if (cardOrderArr.length === 1) {
          cardOrderArr.splice(0, 1); // remove 1 at idx 0
          cardOrderArr.splice(0, 0, ''); // remove 0, add '' at idx 0
        } else if (cardOrderArr.length > 1) {
          cardOrderArr.splice(idxOfDeletedCard, 1); // remove 1 at idxOfDeletedCard
        }

        const cardOrderUpdatedStr = cardOrderArr.toString();

        const columnUpdated = {
          ...column,
          cardOrder: cardOrderUpdatedStr,
        };

        dispatch(thunkUpdateColumn(columnUpdated))

        closeModal();
      }
    } catch {
      closeModal();
    }
  }

  return (
    <>
      <div id='card-delete-modal-outermost-box'>
        <div id='card-delete-modal-text'>
          Delete card?
        </div>
        <div id='card-delete-modal-btns'>
          <button onClick={closeModal} id='card-cancel-delete-btn'>
            Cancel
          </button>
          <button onClick={handleDelete} id='card-confirm-delete-btn'>
            Delete
          </button>
        </div>
      </div>
    </>
  )
};
