import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteCard } from "../../store/cards";
import { thunkUpdateColumn, thunkGetAllColumnsForBoard } from '../../store/columns';
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

        console.log('**** in DELETE CARD TRY, RES OK res:', res)
        console.log('**** in DELETE CARD TRY, RES OK res.message:', res.message)
        console.log('**** in DELETE CARD TRY, RES OK cardOrderArr:', cardOrderArr)

        const idxOfDeletedCard = cardOrderArr.indexOf(card.dndId);
        console.log('**** in DELETE CARD TRY, RES OK idxOfDeletedCard:', idxOfDeletedCard)

        console.log('**** in DELETE CARD TRY, RES OK cardOrderArr:', cardOrderArr)
        if (cardOrderArr.length === 1) {
          cardOrderArr.splice(0, 1); // remove 1 at idx 0
          cardOrderArr.splice(0, 0, ''); // remove 0, add '' at idx 0
        } else if (cardOrderArr.length > 1) {
          cardOrderArr.splice(idxOfDeletedCard, 1); // remove 1 at idxOfDeletedCard
          // cardOrderArr.splice(idxOfDeletedCard, 0, ''); // remove 0, add '' at idxOfDeletedCard
        }
        console.log('**** in DELETE CARD TRY, RES OK cardOrderArr:', cardOrderArr)

        // console.log('**** in DELETE CARD TRY, RES OK cardOrderArr:', cardOrderArr)
        // cardOrderArr.splice(idxOfDeletedCard, 1); // remove 1 at idxOfDeletedCard
        // cardOrderArr.splice(idxOfDeletedCard, 0, ''); // remove 0, add '' at idxOfDeletedCard
        // console.log('**** in DELETE CARD TRY, RES OK cardOrderArr:', cardOrderArr)

        console.log('**** in DELETE CARD TRY, RES OK column.cardOrder:', column.cardOrder)
        const cardOrderUpdatedStr = cardOrderArr.toString();
        console.log('**** in DELETE CARD TRY, RES OK cardOrderUpdatedStr:', cardOrderUpdatedStr)

        const columnUpdated = {
          ...column,
          cardOrder: cardOrderUpdatedStr,
        };

        console.log('**** in DELETE CARD TRY, RES OK column:', column)
        console.log('**** in DELETE CARD TRY, RES OK columnUpdated:', columnUpdated)

        dispatch(thunkUpdateColumn(columnUpdated))


        closeModal();
        // dispatch(thunkGetAllColumnsForBoard(boardId));
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
