import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import { thunkCreateNoteForNotebook, thunkGetAllNotesForNotebook } from "../../store/notes";
import { thunkUpdateNote } from "../../store/notes";
import { thunkGetOneNotebook, thunkUpdateNotebook } from "../../store/notebooks";
import colorNames from './colorNames';
import './NoteForm.css';

export default function NoteForm({ formType, notebook, note }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const notebookId = notebook.id;
  // const noteOrderArr = notebook.noteOrder.split(',');

  const [colorName, setColorName] = useState(note?.colorName);
  const [colorError, setColorError] = useState(false);
  const [title, setTitle] = useState(note?.title);
  const [text, setText] = useState(note?.text);
  // const [colorSelected, setColorSelected] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

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

          // if (noteOrderArr[0] === '') {
          //   noteOrderArr.splice(0, 1); // remove 1 at idx 0
          //   noteOrderArr.splice(0, 0, res.dndId); // remove 0, add res.dndId at idx 0
          // } else if (noteOrderArr[0] !== '') {
          //   noteOrderArr.push(res.dndId)
          // }

          // const noteOrderUpdatedStr = noteOrderArr.toString();

          // const notebookUpdated = {
          //   ...notebook,
          //   noteOrder: noteOrderUpdatedStr,
          // };

          // dispatch(thunkUpdateNotebook(notebookUpdated));

          setErrors({});
          closeModal();
          dispatch(thunkGetOneNotebook(notebookId));

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
