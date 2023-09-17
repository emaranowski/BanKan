import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import OpenModalButton from '../../components/OpenModalButton';
// import NoteFormUpdate from '../NoteFormUpdate';
// import NoteDeleteModal from '../NoteDeleteModal';
import './Note.css';

export default function Note({ notebook, note, index }) {
	const dispatch = useDispatch();
	const noteId = note.id;
	const notebookId = notebook.id;
	const title = note.title;
	const text = note.text;
	const dndId = note.dndId;

	// console.log('**** in Note, note:', note)

	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		setIsLoaded(true);
		// dispatch(thunkGetAllNotesForNotebook(notebookId));
	}, [dispatch, notebookId, noteId, title, text]);

	return (<>
		{isLoaded && (


			<div
				id='note'

			>
				<div id='note-title-and-btns'>
					<span id='note-title'>
						{title}
					</span>

					<span id='note-btns'>
						{/* <OpenModalButton
							buttonText={<i class="fa-regular fa-pen-to-square"></i>}
							modalComponent={
								<NoteFormUpdate
									note={note}
									notebook={notebook}
									notebookId={notebookId}
								/>}
						/>

						<OpenModalButton
							buttonText={<i class="fa-regular fa-trash-can"></i>}
							modalComponent={
								<NoteDeleteModal
									note={note}
									notebook={notebook}
									notebookId={notebookId}
								/>}
						/> */}
					</span>
				</div>
				<div id='note-text'>
					{text}
				</div>
			</div>


		)}
	</>)
};
