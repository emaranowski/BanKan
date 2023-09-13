import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import { thunkCreateCardForColumn } from "../../store/cards";
import { thunkUpdateColumn, thunkGetAllColumnsForBoard } from '../../store/columns';
import { thunkUpdateCard } from "../../store/cards";
import './CardForm.css';

export default function CardForm({ formType, card, column, boardId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const columnId = column.id;
  const cardOrderArr = column.cardOrder.split(',');
  const cards = column.cards;
  const numCardsInColumn = column.cards.length;

  // want to generate index when creating new card
  // console.log('**** in CardForm, cardOrderArr:', cardOrderArr)
  // console.log('**** in CardForm, column:', column)
  // console.log('**** in CardForm, numCardsInColumn:', numCardsInColumn)

  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //////// CASE 1: CREATE CARD
    if (formType === 'Create Card') {
      card = {
        ...card,
        title,
        description,
        index: column.cards.length ? numCardsInColumn : 0,
      };
      // console.log('**** in CREATE CARD, card:', card)

      try {
        const res = await dispatch(thunkCreateCardForColumn(card)); // VScode gives note about not needing 'await', but it IS needed
        // console.log('**** in CREATE CARD TRY, res:', res)
        if (res.id) {

          // console.log('**** in CREATE CARD TRY, RES OK:', res)
          // console.log('**** in CREATE CARD TRY, RES OK cardOrderArr:', cardOrderArr)

          if (cardOrderArr[0] === '') {
            cardOrderArr.splice(0, 1); // remove 1 at idx 0
            cardOrderArr.splice(0, 0, res.dndId); // remove 0, add res.dndId at idx 0
          } else if (cardOrderArr[0] !== '') {
            cardOrderArr.push(res.dndId)
          }

          // console.log('**** in CREATE CARD TRY, RES OK cardOrderArr:', cardOrderArr)

          const cardOrderUpdatedStr = cardOrderArr.toString();

          // console.log('**** in CREATE CARD TRY, RES OK cardOrderUpdatedStr:', cardOrderUpdatedStr)

          const columnUpdated = {
            ...column,
            cardOrder: cardOrderUpdatedStr,
          };

          // console.log('**** in CREATE CARD TRY, RES OK column:', column)
          // console.log('**** in CREATE CARD TRY, RES OK columnUpdated:', columnUpdated)

          dispatch(thunkUpdateColumn(columnUpdated))

          setErrors({});
          closeModal();
          // dispatch(thunkGetAllColumnsForBoard(boardId));
        } else if (res.errors) {
          setErrors(res.errors);
        }
      } catch (res) {
        // console.log('**** in CREATE CARD CATCH, res:', res)
        const data = await res.json();
        // console.log('**** in CREATE CARD CATCH, data:', data)
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }

      //////// CASE 2: UPDATE CARD
    } else if (formType === 'Update Card') {
      card = {
        ...card,
        title,
        description,
        // index,
      };
      // console.log('**** in UPDATE CARD, card:', card)

      try {
        const res = await dispatch(thunkUpdateCard(card)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          setErrors({});
          closeModal();
          dispatch(thunkGetAllColumnsForBoard(boardId));
        } else {
          return res;
        }
      } catch (res) {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    }
  };

  return (
    <>
      {isLoaded && (
        <form onSubmit={handleSubmit}>

          <div className='create_card_form_section'>
            <div className='card_form_top_header'>
              {formType === 'Create Card' ? 'Create Card' : 'Update Card'}
            </div>
          </div>

          <div className='create_card_form_section'>
            <div>
              <input
                size="57"
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder='Title'
                required
              />
            </div>
            {errors.title && (<div className="card_error_text">{errors.title}</div>)}
          </div>

          <div className='create_card_form_section'>
            <div>
              <input
                size="57"
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='Description (optional)'
              />
            </div>
            {errors.description && (<div className="card_error_text">{errors.description}</div>)}
          </div>

          <button
            className={disabled ? "create_card_form_button_disabled" : "create_card_form_button"}
            disabled={disabled}
          >
            {formType === 'Create Card' ? 'Add' : 'Update'}
          </button>

        </form >
      )}
    </>
  )
};
