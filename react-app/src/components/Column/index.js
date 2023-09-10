import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetAllCardsForColumn } from '../../store/cards';
import OpenModalButton from '../../components/OpenModalButton';
import Card from '../Card';
import CardFormCreate from '../CardFormCreate';
import ColumnFormUpdate from '../ColumnFormUpdate';
import ColumnDeleteModal from '../ColumnDeleteModal';
import './Column.css';

export default function Column({ column }) {
  const dispatch = useDispatch();
  const columnId = column.id;
  const boardId = column.boardId;
  const color = column.colorName;
  const title = column.title;
  // const cards = Object.values(useSelector(state => state.cards.allCards));
  const cards = column.cards;

  console.log('**** in Column, cards:', cards)

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkGetAllCardsForColumn(columnId))
    setIsLoaded(true)
  }, [dispatch, columnId, boardId, color, title]);

  return (<>{isLoaded && (
    <div id='column'>

      <div id='color_swatch' className={color}>
      </div>

      <div id='column_title_and_btns'>
        <div id='column_title'>
          {title}
        </div>

        <div id='column_btns'>
          <span className='column_btn'>
            <OpenModalButton
              buttonText="🖊️"
              modalComponent={
                <ColumnFormUpdate
                  column={column}
                />}
            />
          </span>

          <span className='column_btn'>
            <OpenModalButton
              buttonText="🗑️"
              modalComponent={<ColumnDeleteModal
                columnId={columnId}
                boardId={boardId}
              />}
            />
          </span>
        </div>
      </div>

      <div>
        <div id='column_cards'>
          {cards && (
            cards.map((card) => (
              <div className='cardDiv' key={card.id}>
                <Card
                  card={card}
                  boardId={boardId}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div id='column_btn_add_card'>
        <div className='column_btn'>
          <OpenModalButton
            buttonText="+ Add card"
            modalComponent={
              <CardFormCreate
                columnId={columnId}
                boardId={boardId}
              />}
          />
        </div>
      </div>
    </div>
  )}</>)
};
