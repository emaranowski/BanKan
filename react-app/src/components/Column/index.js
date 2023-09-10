import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetAllCardsForColumn } from '../../store/cards';
import { thunkGetOneColumn } from '../../store/columns';
import OpenModalButton from '../../components/OpenModalButton';
import Card from '../Card';
import CardFormCreate from '../CardFormCreate';
import ColumnFormUpdate from '../ColumnFormUpdate';
import ColumnDeleteModal from '../ColumnDeleteModal';
import './Column.css';

export default function Column({ column }) {
  const dispatch = useDispatch();
  const columnId = column.id;
  const columnV2 = useSelector(state => state.columns.oneColumn);
  const cardsArr = Object.values(useSelector(state => state.cards.allCards));

  console.log('**** in Column, columnId:', columnId) // changes
  console.log('**** in Column, column:', column) // changes
  console.log('**** in Column, columnV2:', columnV2) // changes
  console.log('**** in Column, cardsArr:', cardsArr) // stays same

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkGetOneColumn(columnId))
    dispatch(thunkGetAllCardsForColumn(columnId))
    setIsLoaded(true)
  }, [dispatch, columnId])

  return (<>{isLoaded && (
    <div id='column'>

      <div id='color_swatch' className={column.colorName}></div>

      <div id='column_title_and_btns'>
        <div id='column_title'>
          {column.title}
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
                boardId={column.boardId}
              />}
            />
          </span>
        </div>
      </div>

      <div>
        <div id='column_cards'>
          {cardsArr.length ?
            cardsArr.map((card) => (
              <div className='cardDiv' key={card.id}>
                <Card
                  card={card}
                  boardId={column.boardId}
                />
              </div>
            ))
            : (<span>You have no cards!</span>)
          }
        </div>
      </div>

      <div id='column_btn_add_card'>
        <div className='column_btn'>
          <OpenModalButton
            buttonText="+ Add card"
            modalComponent={
              <CardFormCreate
                columnId={columnId}
                boardId={column.boardId}
              />}
          />
        </div>
      </div>
    </div>
  )}</>)
};