import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import boardsReducer from './boards';
import columnsReducer from './columns';
import cardsReducer from './cards';
import notebooksReducer from './notebooks';
import notesReducer from './notes';

const rootReducer = combineReducers({
  session,
  boards: boardsReducer,
  columns: columnsReducer,
  cards: cardsReducer,
  notebooks: notebooksReducer,
  notes: notesReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
