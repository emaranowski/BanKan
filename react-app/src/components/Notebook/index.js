import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetOneNotebook, thunkUpdateNotebook } from '../../store/notebooks';
import { thunkGetAllNotesForNotebook } from '../../store/notes';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import OpenModalButton from "../OpenModalButton";
import NotebookFormUpdate from "../NotebookFormUpdate";
import NotebookDeleteModal from "../NotebookDeleteModal";
import NoteFormCreate from '../NoteFormCreate';
import Note from "../Note";
import './NotebookDetails.css';

export default function NotebookDetails() {
  const dispatch = useDispatch();
  const { notebookId } = useParams();
  const notebook = useSelector(state => state.notebooks.oneNotebook);
  const imageUrl = notebook.imageUrl;
  const title = notebook.title;
  const notes = Object.values(useSelector(state => state.notes.allNotes));

  const [triggerRerenderToggle, setTriggerRerenderToggle] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    dispatch(thunkGetOneNotebook(notebookId))
    dispatch(thunkGetAllNotesForNotebook(notebookId))
    setIsLoaded(true)
  }, [dispatch, notebookId, imageUrl, title, triggerRerenderToggle]);

  const updateNoteOrderOnNotebook = async (notebookUpdated) => {
    try {
      const res = await dispatch(thunkUpdateNotebook(notebookUpdated)); // VScode notes not needing 'await', but it IS needed
      if (res.id) {
        return res;
      } else {
        return res;
      }
    } catch (res) {
      const data = await res.json();
      return data;
    }
  };

  // const onDragEnd = (result) => {
  //   const { draggableId, source, destination } = result;
  //   // return if: no destination, or dropped back into original spot
  //   if (!destination) return;
  //   if (source.droppableId === destination.droppableId &&
  //     source.index === destination.index) {
  //     return;
  //   };
  //   //////// CASE 1: drop within one single notebook
  //   if (source.droppableId === destination.droppableId) {
  //     // get notebook to update (notebook where dndId matches source.droppableId)
  //     const notebookArr = notebooks.filter(notebook => {
  //       return notebook.dndId === source.droppableId;
  //     });
  //     const notebookToUpdate = notebookArr[0];

  //     // convert cardOrder: str to arr
  //     const cardOrderStr = notebookToUpdate.cardOrder;
  //     const cardOrderArr = cardOrderStr.split(',');

  //     // update cardOrder: 1. remove cardDndId at srcIdx, 2. add cardDndId at destIdx
  //     const movedCardDndIdArr = cardOrderArr.splice(source.index, 1); // at srcIdx: remove 1
  //     const movedCardDndId = movedCardDndIdArr[0];
  //     cardOrderArr.splice(destination.index, 0, movedCardDndId); // at destIdx: remove 0, add movedCardDndId

  //     // convert cardOrder: arr to str
  //     const cardOrderUpdatedStr = cardOrderArr.toString();

  //     // create notebookUpdated w/ updated card order
  //     const notebookUpdated = {
  //       ...notebookToUpdate,
  //       cardOrder: cardOrderUpdatedStr,
  //     };

  //     // get idx of notebookToUpdate (in orig 'notebooks' arr)
  //     const notebookToUpdateIdx = notebooks.indexOf(notebookToUpdate);
  //     // at notebookToUpdateIdx in 'notebooks': 1. remove notebookToUpdate, 2. add notebooklUpdated
  //     notebooks.splice(notebookToUpdateIdx, 1, notebookUpdated);

  //     updateNoteOrderOnNotebook(notebookUpdated); // update card order property on notebook
  //     setTriggerRerenderToggle(!triggerRerenderToggle); // trigger useEffect when onDragEnd is done
  //   };
  // };


  return (<>{isLoaded && (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id='notebook_details_page' style={{ backgroundImage: `url(${imageUrl})` }}>

        <div id='notebook_details_page_content'>
          <Link to={`/notebooks`}>
            ⬅ Back to my notebooks
          </Link>

          <div id='notebook_details_header'>
            <div id='notebook_details_title'>
              <span id='notebook_details_title_text'>{title}</span>
            </div>

            <div id='notebook_details_btns'>
              <span id='notebook_details_update_btn'>
                {/* <OpenModalButton
                  buttonText={<i class="fa-regular fa-pen-to-square"></i>}
                  modalComponent={
                    <NotebookFormUpdate
                      notebook={notebook}
                    />}
                /> */}
              </span>

              <span id='notebook_details_delete_btn'>
                {/* <OpenModalButton
                  buttonText={<i class="fa-regular fa-trash-can"></i>}
                  modalComponent={
                    <NotebookDeleteModal
                      notebookId={notebookId}
                    />}
                /> */}
              </span>

            </div>
          </div>

          <div id='notebook_details_all_columns'>
            {columns && (
              columns.map((column) => (
                <span className='notebook_details_one_column' key={column.id}>
                  <Note key={column.id} column={column} />
                </span>
              ))
            )}

            <span id='notebook_details_add_col_btn'>
              {/* <OpenModalButton
                buttonText={<i class="fa-solid fa-plus"><span> </span><span>Add column</span></i>}
                modalComponent={
                  <NoteFormCreate
                    notebookId={notebookId}
                  />}
              /> */}
            </span>
          </div>
        </div>

      </div >
    </DragDropContext>
  )}</>)
};
