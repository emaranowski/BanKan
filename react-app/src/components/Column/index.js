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
  const cardsArr = Object.values(useSelector(state => state.cards.allCards));

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkGetAllCardsForColumn(columnId))
    setIsLoaded(true)
  }, [dispatch, columnId])

  return (<>{isLoaded && (
    <div id='column'>

      <div id='columnTitle'>
        <span>
          {column.title}
        </span>
        <span className='columnUpdateAndDeleteBtns'>
          <OpenModalButton
            buttonText="Edit"
            modalComponent={
              <ColumnFormUpdate
                column={column}
              />}
          />
        </span>
        <span className='columnUpdateAndDeleteBtns'>
          <OpenModalButton
            buttonText="X"
            modalComponent={<ColumnDeleteModal
              columnId={column.id}
              boardId={column.boardId}
            />}
          />
        </span>
      </div>

      <div>
        HEX: {column.colorHex}
      </div>

      <div>
        {/* <div className='columnUpdateAndDeleteBtns'>
          <Card
            columnId={column.id}
            boardId={column.boardId}
          />
        </div> */}

        <div id='columnCards'>
          {cardsArr.length ?
            cardsArr.map((card) => (
              <div className='cardDiv' key={card.id}>
                <Card
                  card={card}
                  columnId={column.id}
                  boardId={column.boardId}
                />
                {/* Column Board ID: {column.boardId}
              Column Color HEX: {column.colorHex}
              Column Title: {column.title} */}
              </div>
            ))
            :
            (<span>You have no cards!</span>)
          }
        </div>
      </div>

      <div>
        <div className='columnUpdateAndDeleteBtns'>
          <OpenModalButton
            buttonText="+ Add card"
            modalComponent={
              <CardFormCreate
                columnId={column.id}
                boardId={column.boardId}
              />}
          />
        </div>
      </div>
    </div>
  )}</>)
};
