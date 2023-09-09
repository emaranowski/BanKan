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
  const [colorName, setColorName] = useState('');

  console.log('**** in Column, column:', column)
  // if (column.colorHex === '#a11800') setColorName('red');
  // if (column.colorHex === '#a15600') setColorName('orange');
  // if (column.colorHex === '#b08307') setColorName('yellow');
  // if (column.colorHex === '#3a8501') setColorName('green');
  // if (column.colorHex === '#016285') setColorName('blue');
  // if (column.colorHex === '#450185') setColorName('purple');
  // if (column.colorHex === '#cecece') setColorName('lightgray');
  // if (column.colorHex === '#8f8f8f') setColorName('medgray');
  // if (column.colorHex === '#686868') setColorName('darkgrey');
  // if (column.colorHex === '#000000') setColorName('black');

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkGetAllCardsForColumn(columnId))
    setIsLoaded(true)
  }, [dispatch, columnId])

  return (<>{isLoaded && (
    <div id='column'>

      <div id='column_title_and_btns'>

        <div id='color_swatch' className={column.colorName}></div>

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
                columnId={column.id}
                boardId={column.boardId}
              />}
            />
          </span>
        </div>
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
            : (<span>You have no cards!</span>)
          }
        </div>
      </div>

      <div>
        <div className='column_btn'>
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
