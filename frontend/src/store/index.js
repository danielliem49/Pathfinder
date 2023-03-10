import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import session from './session';
import trailsReducer from "./trails";
import parksReducer from "./parks";
import reviewsReducer from "./reviews";

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer = combineReducers({
    session, trails: trailsReducer, parks: parksReducer, reviews: reviewsReducer
});

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;