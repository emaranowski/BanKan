import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import { thunkCreateCardForColumn } from "../../store/cards";
import { thunkUpdateColumn, thunkGetAllColumnsForBoard } from '../../store/columns';
import { thunkUpdateCard } from "../../store/cards";
import './CardForm.css';

export default function CardForm({ formType, card, column, boardId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const columnId = column.id;
  const cardOrderArr = column.cardOrder.split(',');
  // const cards = column.cards;
  const numCardsInColumn = column.cards.length;

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

      try {
        const res = await dispatch(thunkCreateCardForColumn(card)); // VScode gives note about not needing 'await', but it IS needed
        if (res.id) {

          if (cardOrderArr[0] === '') {
            cardOrderArr.splice(0, 1); // remove 1 at idx 0
            cardOrderArr.splice(0, 0, res.dndId); // remove 0, add res.dndId at idx 0
          } else if (cardOrderArr[0] !== '') {
            cardOrderArr.push(res.dndId)
          }

          const cardOrderUpdatedStr = cardOrderArr.toString();

          const columnUpdated = {
            ...column,
            cardOrder: cardOrderUpdatedStr,
          };

          await dispatch(thunkUpdateColumn(columnUpdated))
          await dispatch(thunkGetAllColumnsForBoard(boardId));

          setErrors({});
          closeModal();
        } else if (res.errors) {
          setErrors(res.errors);
        }
      } catch (res) {
        const data = await res.json();
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

          <div className='create-card-form-section'>
            <div className='card-form-top-header'>
              {formType === 'Create Card' ? 'Create Card' : 'Update Card'}
            </div>
          </div>

          <div className='create-card-form-section'>
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
            {errors.title && (<div className="card-error-text">{errors.title}</div>)}
          </div>

          <div className='create-card-form-section'>
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
            {errors.description && (<div className="card-error-text">{errors.description}</div>)}
          </div>

          <button
            className={disabled ? "create-card-form-button-disabled" : "create-card-form-button"}
            disabled={disabled}
          >
            {formType === 'Create Card' ? 'Add' : 'Update'}
          </button>

        </form >
      )}
    </>
  )
};
