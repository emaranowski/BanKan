import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import { thunkCreateNoteForNotebook, thunkGetAllNotesForNotebook } from "../../store/notes";
import { thunkUpdateNote } from "../../store/notes";
import './NoteForm.css';
import { thunkGetOneNotebook, thunkUpdateNotebook } from "../../store/notebooks";

export default function NoteForm({ formType, notebook, note }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const notebookId = notebook.id;
  const noteOrderArr = notebook.noteOrder.split(',');

  const [colorName, setColorName] = useState(note?.colorName);
  const [colorSelected, setColorSelected] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [title, setTitle] = useState(note?.title);
  const [text, setText] = useState(note?.text);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  // console.log('**** in NoteForm, colorName:', colorName)

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

    //////// CASE 1: CREATE NOTE
    if (formType === 'Create Note') {
      note = {
        ...note,
        // notebookId,
        colorName,
        title,
        text,
      };
      // console.log('**** in CREATE NOTE, note:', note)

      try {
        const res = await dispatch(thunkCreateNoteForNotebook(note)); // VScode gives note about not needing 'await', but it IS needed
        // console.log('**** in CREATE NOTE TRY, res:', res)
        if (res.id) {

          if (noteOrderArr[0] === '') {
            noteOrderArr.splice(0, 1); // remove 1 at idx 0
            noteOrderArr.splice(0, 0, res.dndId); // remove 0, add res.dndId at idx 0
          } else if (noteOrderArr[0] !== '') {
            noteOrderArr.push(res.dndId)
          }

          const noteOrderUpdatedStr = noteOrderArr.toString();

          const notebookUpdated = {
            ...notebook,
            noteOrder: noteOrderUpdatedStr,
          };

          dispatch(thunkUpdateNotebook(notebookUpdated));

          setErrors({});
          history.push(`/notebooks/${notebookId}`);
          closeModal();

        } else if (res.errors) {
          setErrors(res.errors);
        }
      } catch (res) {
        // console.log('**** in CREATE NOTE CATCH, res:', res)
        const data = await res.json();
        // console.log('**** in CREATE NOTE CATCH, data:', data)
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }

      //////// CASE 2: UPDATE NOTE
    } else if (formType === 'Update Note') {
      note = {
        ...note,
        // notebookId,
        colorName,
        title,
        text,
      };
      // console.log('**** in UPDATE NOTE, note:', note)

      try {
        const res = await dispatch(thunkUpdateNote(note)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          setErrors({});
          history.push(`/notebooks/${notebookId}`);
          closeModal();
          dispatch(thunkGetOneNotebook(notebookId));
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

          <div className='create-note-form-section'>
            <div className='note-form-top-header'>
              {formType === 'Create Note' ? 'Create Note' : 'Update Note'}
            </div>
          </div>

          <div className='create-note-form-section'>
            <div id='color-buttons'>
              {colorNames.length ?
                colorNames.map((clrName) => (
                  <div
                    id={clrName.name}
                    key={clrName.id}
                    onClick={() => setColorName(clrName.name)}
                    className={colorName === clrName.name ? 'selected' : ''}
                  >
                  </div>
                ))
                :
                (<></>)
              }
            </div>
            {colorError && !colorName ? ('Please select a color') : null}
            {/* {errors.background && (<div className="note-error-text">{errors.background}</div>)} */}
          </div>

          <div className='create-note-form-section'>
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
            {errors.title && (<div className="note-error-text">{errors.title}</div>)}
          </div>

          <div className='create-note-form-section'>
            <div>
              <input
                size="57"
                type="text"
                name="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                placeholder='Text (optional)'
              />
            </div>
            {errors.text && (<div className="note-error-text">{errors.text}</div>)}
          </div>

          <button
            className={disabled ? "create-note-form-button-disabled" : "create-note-form-button"}
            disabled={disabled}
          >
            {formType === 'Create Note' ? 'Add' : 'Update'}
          </button>

        </form >
      )}
    </>
  )
};