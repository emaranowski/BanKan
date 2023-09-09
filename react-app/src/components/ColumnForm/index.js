import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import { thunkCreateColumnForBoard } from "../../store/columns";
import { thunkUpdateColumn } from "../../store/columns";
import './ColumnForm.css';

export default function ColumnForm({ formType, column }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const columnId = column.id;
  const boardId = column.boardId;

  const [title, setTitle] = useState(column?.title);
  const [colorHex, setColorHex] = useState(column?.colorHex);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  console.log('**** in ColumnForm, colorHex:', colorHex)

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

  const colorHexs = [
    {
      'id': 1,
      'hex': '#a11800',
      'name': 'red',
    },
    {
      'id': 2,
      'hex': '#a15600',
      'name': 'orange',
    },
    {
      'id': 3,
      'hex': '#b08307',
      'name': 'yellow',
    },
    {
      'id': 4,
      'hex': '#3a8501',
      'name': 'green',
    },
    {
      'id': 5,
      'hex': '#016285',
      'name': 'blue',
    },
    {
      'id': 6,
      'hex': '#450185',
      'name': 'purple',
    },
    {
      'id': 7,
      'hex': '#cecece',
      'name': 'lightgray',
    },
    {
      'id': 8,
      'hex': '#8f8f8f',
      'name': 'medgray',
    },
    {
      'id': 9,
      'hex': '#686868',
      'name': 'darkgray',
    },
    {
      'id': 10,
      'hex': '#000000',
      'name': 'black',
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    //////// CASE 1: CREATE COLUMN
    if (formType === 'Create Column') {
      column = {
        ...column,
        title,
        colorHex,
        boardId
      };
      // console.log('**** in CREATE COLUMN, column:', column)

      try {
        const res = await dispatch(thunkCreateColumnForBoard(column)); // VScode gives note about not needing 'await', but it IS needed
        // console.log('**** in CREATE COLUMN TRY, res:', res)
        if (res.id) {
          setErrors({});
          history.push(`/boards/${boardId}`);
          closeModal();
        } else if (res.errors) {
          setErrors(res.errors);
        }
      } catch (res) {
        // console.log('**** in CREATE COLUMN CATCH, res:', res)
        const data = await res.json();
        // console.log('**** in CREATE COLUMN CATCH, data:', data)
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }

      //////// CASE 2: UPDATE COLUMN
    } else if (formType === 'Update Column') {
      column = {
        ...column,
        title,
        colorHex,
        boardId
      };
      console.log('**** in UPDATE COLUMN, column:', column)

      try {
        const res = await dispatch(thunkUpdateColumn(column)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          setErrors({});
          history.push(`/boards/${boardId}`);
          closeModal();
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

          <div className='create_column_form_section'>
            <div className='column_form_top_header'>
              {formType === 'Create Column' ? 'Create Column' : 'Update Column'}
            </div>
          </div>

          <div className='create_column_form_section'>
            <div id='colorButtons'>
              {colorHexs.length ?
                colorHexs.map((colorHex) => (
                  <div
                    id='colorButtonDiv'
                    className={colorHex.name}
                    key={colorHex.id}
                    onClick={() => setColorHex(colorHex.hex)}
                  >
                  </div>
                ))
                :
                (<></>)
              }
            </div>
            {errors.background && (<div className="column_error_text">{errors.background}</div>)}
          </div>

          <div className='create_column_form_section'>
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
            {errors.title && (<div className="column_error_text">{errors.title}</div>)}
          </div>

          <button
            className={disabled ? "create_column_form_button_disabled" : "create_column_form_button"}
            disabled={disabled}
          >
            {formType === 'Create Column' ? 'Add' : 'Update'}
          </button>

        </form >
      )}
    </>
  )
};
