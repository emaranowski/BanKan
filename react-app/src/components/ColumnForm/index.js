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
  const boardId = column.boardId;

  const [title, setTitle] = useState(column?.title);
  const [colorName, setColorName] = useState(column?.colorName);
  const [colorError, setColorError] = useState(false);
  // const [colorHex, setColorHex] = useState(column?.colorHex);
  // const [colorSelected, setColorSelected] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

  const colorNames = [
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

    if (!colorName) {
      setColorError(true);
      return;
    }

    //////// CASE 1: CREATE COLUMN
    if (formType === 'Create Column') {
      column = {
        ...column,
        title,
        colorName,
        boardId
      };

      try {
        const res = await dispatch(thunkCreateColumnForBoard(column)); // VScode gives note about not needing 'await', but it IS needed
        if (res.id) {
          setErrors({});
          history.push(`/boards/${boardId}`);
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

      //////// CASE 2: UPDATE COLUMN
    } else if (formType === 'Update Column') {
      column = {
        ...column,
        title,
        colorName,
        boardId
      };

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

          <div className='column-form-top-header'>
            {formType === 'Create Column' ? 'Create Column' : 'Update Column'}
          </div>

          <div>
            <div id='color-btns'>
              {colorNames.length ?
                colorNames.map((clrName) => (
                  <div
                    id={clrName.name}
                    key={clrName.id}
                    onClick={() => setColorName(clrName.name)}
                    className={colorName === clrName.name ? 'selected' : ''}
                  >
                    {colorName === clrName.name ?
                      <>
                        <div className="color-bg-checkmark">
                          ✔
                        </div>
                      </>
                      : null
                    }
                  </div>
                ))
                : (<></>)
              }
            </div>
            {colorError && !colorName ? ('Please select a color') : null}
          </div>

          <div>
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
            {errors.title && (<div className="column-error-text">{errors.title}</div>)}
          </div>

          <button
            className={disabled ? "column-form-btn-disabled" : "column-form-btn"}
            disabled={disabled}
          >
            {formType === 'Create Column' ? 'Add' : 'Update'}
          </button>

        </form >
      )}
    </>
  )
};
