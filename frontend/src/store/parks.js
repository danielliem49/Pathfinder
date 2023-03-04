
const RECEIVE_PARKS = 'parks/RECEIVE_PARKS';
const RECEIVE_PARK = 'parks/RECEIVE_PARK';

const receiveParks = (parks) => {
    return( {type: RECEIVE_PARKS, parks})
}

const receivePark = (park) => {
    return ({ type: RECEIVE_PARK, park })
}

export const fetchParks = () => async dispatch => {
    const response = await fetch('/api/parks');

    if (response.ok) {
        const parks = await response.json();
        return(dispatch(receiveParks(parks)))
    }
}

export const fetchPark = (parkId) => async dispatch => {
    const response = await fetch(`/api/parks/${parkId}`);

    if (response.ok) {
        const park = await response.json();
        return (dispatch(receivePark(park)))
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
            const park = action.park;
            newState[park.id] = park;
            return newState;
        default:
            return oldState;
    }
}