import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { thunkGetOneColumn, thunkGetAllColumnsForBoard } from '../../store/columns';
import { thunkGetAllCardsForColumn, thunkGetAllCardsForBoard } from '../../store/cards';
import OpenModalButton from '../../components/OpenModalButton';
import Card from '../Card';
import CardFormCreate from '../CardFormCreate';
import ColumnFormUpdate from '../ColumnFormUpdate';
import ColumnDeleteModal from '../ColumnDeleteModal';
import './Column.css';

export default function Column({ boardId, columnId }) {
  const dispatch = useDispatch();
  // const column = useSelector(state => state.columns.oneColumn)
  const columns = Object.values(useSelector(state => state.columns.allColumns));

  const column = columns.filter(column => {
    return column.id === columnId;
  })[0];

  // const boardId = column.boardId;
  // const columnId = column.id;
  const color = column.colorName;
  const title = column.title;
  let cardOrderArr = [];
  if (column.cardOrder !== undefined) cardOrderArr = column.cardOrder.split(',');
  // const cards = column.cards;
  const cards = Object.values(useSelector(state => state.cards.allCards));
  const dndId = column.dndId;

  // console.log('||||| in Column, cards:', cards)
  console.log('||||| %%%%% in Column, columnId:', columnId)
  console.log('||||| %%%%% in Column, column:', column)


  const cardsOrdered = [];
  cardOrderArr.forEach(cardDndId => {
    cards.forEach(card => {
      if (cardDndId === card.dndId) cardsOrdered.push(card);
    })
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      await dispatch(thunkGetOneColumn(columnId))
      await dispatch(thunkGetAllColumnsForBoard(boardId))
      await dispatch(thunkGetAllCardsForBoard(boardId))
      // await dispatch(thunkGetAllCardsForColumn(columnId))
    };
    getData();
    setIsLoaded(true)
  }, [dispatch, boardId, columnId]);

  // useEffect(() => {
  //   dispatch(thunkGetAllCardsForColumn(columnId))
  //   setIsLoaded(true)
  // }, [dispatch, boardId, columnId, color, title]);

  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}

  return (<>{isLoaded && (
    <div id='column'>

      <div id='column-color-swatch' className={color}></div>

      <div id='column-title-and-btns'>
        <div id='column-title'>
          {title}
        </div>

        <div id='column-btns'>
          <span>
            <OpenModalButton
              buttonText={<i class="fa-regular fa-pen-to-square"></i>}
              modalComponent={
                <ColumnFormUpdate
                  column={column}
                />}
            />
          </span>
          <span>
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
            id='column-cards'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cardsOrdered && (
              cardsOrdered.map((card, index) => (
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

      <div id='column-btn-add-card'>
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
