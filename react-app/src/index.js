import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";

// import { useDispatch, useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';

import DragDropContext from "./context/ReactBeautifulDnd";
// import { DragDropContext } from 'react-beautiful-dnd';
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
  // const state = useSelector(state => state);
  // console.log('**** IN ROOT, state:', state)
  // console.log('**** IN ROOT, store:', store)

  // const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   setIsLoaded(true);
  // }, [dispatch, cardId, columnId, boardId, title]);

  // // for functional comps
  // const onDragEnd = useCallback(() => {
  //   // TODO: CHANGE WHICH COLUMN A CARD BELONGS TO
  // }, []);

  const result = {
    draggableId: 'card-1',
    // type: 'CARD',
    // reason: 'DROP',
    source: {
      droppableId: 'column-1',
      index: 0,
    },
    destination: {
      droppableId: 'column-1',
      index: 1,
    },
  };

  // for functional comps
  const onDragEnd = ((result) => {
    // TODO: CHANGE WHICH COLUMN A CARD BELONGS TO

    const { draggableId, source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newCardIds = Array.from(column.cardIds);
    newCardIds.splice(source.index, 1);
    newCardIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      cardIds: newCardIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  }, []);

  // for class comps
  // onDragEnd = (result) => {
  //   // TODO: CHANGE WHICH COLUMN A CARD BELONGS TO
  //   const { destination, source, draggableId } = result;

  //   if (!destination) return;

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   const column = this.state.columns[source.droppableId];
  //   const newCardIds = Array.from(column.cardIds);
  //   newCardIds.splice(source.index, 1);
  //   newCardIds.splice(destination.index, 0, draggableId);

  //   const newColumn = {
  //     ...column,
  //     cardIds: newCardIds,
  //   };

  //   const newState = {
  //     ...this.state,
  //     columns: {
  //       ...this.state.columns,
  //       [newColumn.id]: newColumn,
  //     },
  //   };

  //   this.setState(newState);

  // };

  return (
    <ModalProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <Modal />
          </BrowserRouter>
        </Provider>
      </DragDropContext>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
