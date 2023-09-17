import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import OpenModalButton from '../../components/OpenModalButton';
// import NoteFormUpdate from '../NoteFormUpdate';
// import NoteDeleteModal from '../NoteDeleteModal';
import './Note.css';

export default function Note({ boardId, notebook, note, index }) { // added index
	const dispatch = useDispatch();
	const noteId = note.id;
	const notebookId = note.notebookId;
	const title = note.title;
	const dndId = note.dndId;

	// console.log('**** in Note, note:', note)

	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		setIsLoaded(true);
		// dispatch(thunkGetAllNotesForNotebook(notebookId));
	}, [dispatch, boardId, notebookId, noteId, title]);

	// key should not include the index
	// can just use draggableId as key

	return (<>{isLoaded && (
		<Draggable draggableId={dndId} index={index}>
			{(provided, snapshot) => (
				<div
					id='note'
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<span id='note_title'>
						{title}
					</span>

					<span id='note_btns'>
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
			)}
		</Draggable>
	)}</>)
};
