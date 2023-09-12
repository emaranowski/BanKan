import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";

// import { DragDropContext } from 'react-beautiful-dnd';
import DragDropContext from "./context/ReactBeautifulDnd";

import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  // const onDragEnd = useCallback(() => {
  // }, []);

  // const result = {
  //   draggableId: 'card-1',
  //   // type: 'CARD',
  //   // reason: 'DROP',
  //   source: {
  //     droppableId: 'column-1',
  //     index: 0,
  //   },
  //   destination: {
  //     droppableId: 'column-1',
  //     index: 1,
  //   },
  // };

  // const onDragEnd = ((result) => { // TODO: CHANGE WHICH COLUMN A CARD BELONGS TO
  //   const { draggableId, source, destination } = result;

  //   if (!destination) return;
  //   if (
  //     source.droppableId === destination.droppableId &&
  //     source.index === destination.index
  //   ) {
  //     return;
  //   };

  //   // get source column
  //   const column = this.state.columns[source.droppableId]; // normalized, like... column-1: {}
  //   const newCardIds = Array.from(column.cardIds);
  //   newCardIds.splice(source.index, 1); // remove 1 at idx
  //   newCardIds.splice(destination.index, 0, draggableId); // remove 0, add draggableId at idx

  //   const newColumn = { // more like updatedColumn than newColumn
  //     ...column, // copy
  //     cardIds: newCardIds, // collide to update cardIds, after splicing
  //   };

  //   const newState = { // more like updatedState
  //     ...this.state, // copy
  //     columns: { // collide to update columns
  //       ...this.state.columns, // copy
  //       [newColumn.id]: newColumn, // collide to newCol (normalized, like column-1: {})
  //     }, // ^^^ !!! may need dndId instead of id !!!
  //   };

  //   this.setState(newState);
  // }, []);

  return (
    <ModalProvider>
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
      {/* </DragDropContext> */}
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
