import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
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
  const cardOrder = column.cardOrder;
  const color = column.colorName;
  const title = column.title;
  // const cards = Object.values(useSelector(state => state.cards.allCards));
  const cards = column.cards;
  // const numCardsInColumn = column.cards.length;
  const dndId = column.dndId;

  // console.log('**** in Column, columnId:', columnId)
  // console.log('**** in Column, numCardsInColumn:', numCardsInColumn)

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkGetAllCardsForColumn(columnId))
    setIsLoaded(true)
  }, [dispatch, columnId, boardId, color, title]);

  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}

  return (<>{isLoaded && (
    <div id='column'>

      <div id='column_color_swatch' className={color}>
      </div>

      <div id='column_title_and_btns'>
        <div id='column_title'>
          {title}
        </div>

        <div id='column_btns'>
          <span className='column_btn'>
            <OpenModalButton
              buttonText={<i class="fa-regular fa-pen-to-square"></i>}
              modalComponent={
                <ColumnFormUpdate
                  column={column}
                />}
            />
          </span>

          <span className='column_btn'>
            <OpenModalButton
              buttonText={<i class="fa-regular fa-trash-can"></i>}
              modalComponent={<ColumnDeleteModal
                columnId={columnId}
                boardId={boardId}
              />}
            />
          </span>
        </div>
      </div>

      <Droppable droppableId={dndId}>
        {(provided, snapshot) => (
          <div
            id='column_cards'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards && (
              cards.map((card, index) => (
                <Card
                  boardId={boardId}
                  key={card.id}
                  column={column}
                  card={card}
                  index={index}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div id='column_btn_add_card'>
        <div className='column_btn'>
          <OpenModalButton
            buttonText={<i class="fa-solid fa-plus"><span> </span><span>Add card</span></i>}
            modalComponent={
              <CardFormCreate
                column={column}
                columnId={columnId}
                boardId={boardId}
              />}
          />
        </div>
      </div>
    </div>
  )}</>)
};
