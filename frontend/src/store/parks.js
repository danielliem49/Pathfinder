
import csrfFetch from "./csrf.js";

const RECEIVE_PARKS = 'parks/RECEIVE_PARKS';
export const RECEIVE_PARK = 'parks/RECEIVE_PARK';

const receiveParks = (parks) => {
    return( {type: RECEIVE_PARKS, parks})
}

const receivePark = (payload) => {
    return ({ type: RECEIVE_PARK, payload })
}

export const fetchParks = () => async dispatch => {
    const response = await csrfFetch('/api/parks');

    if (response.ok) {
        const parks = await response.json();
        return(dispatch(receiveParks(parks)))
    }
}

export const fetchPark = (parkId) => async dispatch => {
    const response = await csrfFetch(`/api/parks/${parkId}`);

    if (response.ok) {
        const payload = await response.json();
        return (dispatch(receivePark(payload)))
    }
}

// selector callbacks
export const getParks = (state) => {
    return (state.parks ? Object.values(state.parks) : [])
}
export const getPark = (parkId) => (state) => {
    return (state.parks ? state.parks[parkId] : null)
}

export default function parksReducer(oldState = {}, action) {
    const newState = { ...oldState };
    switch (action.type) {
        case RECEIVE_PARKS:
            return action.parks;
        case RECEIVE_PARK:
            const park = action.payload.park;
            newState[park.id] = park;
            return newState;
        default:
            return oldState;
    }
}