// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import { houseReducer } from "./reducers/houseReducers";

// const rootReducer = combineReducers({
//   house: houseReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk'; // Correct import for thunk middleware
import { houseReducer } from './reducers/houseReducers';

const rootReducer = combineReducers({
  house: houseReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
