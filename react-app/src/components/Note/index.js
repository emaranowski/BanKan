import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
// import { Draggable } from 'react-beautiful-dnd';
import OpenModalButton from '../../components/OpenModalButton';
import NoteFormUpdate from '../NoteFormUpdate';
import NoteDeleteModal from '../NoteDeleteModal';
import './Note.css';

export default function Note({ notebook, note }) {
  const dispatch = useDispatch();
  const notebookId = notebook.id;
  const noteId = note.id;
  const color = note.colorName;
  const title = note.title;
  const text = note.text;
  // const dndId = note.dndId;

  // console.log('**** in Note, note:', note)

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch, noteId, title, text]);

  return (<>
    {isLoaded && (


      <div
        id='note'

      >

        <div id='note-color-swatch-and-btns'>
          <span id='note-color-swatch' className={color}></span>
          <span id='note-btns'>
            <OpenModalButton
              buttonText={<i class="fa-regular fa-pen-to-square"></i>}
              modalComponent={
                <NoteFormUpdate
                  notebook={notebook}
                  note={note}
                />}
            />
            <OpenModalButton
              buttonText={<i class="fa-regular fa-trash-can"></i>}
              modalComponent={
                <NoteDeleteModal
                  notebookId={notebookId}
                  noteId={noteId}
                />}
            />
          </span>
        </div>
        <div id='note-title'>
          {title}
        </div>
        <div id='note-text'>
          {text}
        </div>

      </div>


    )}
  </>)
};
