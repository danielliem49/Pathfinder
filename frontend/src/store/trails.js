
import csrfFetch from "./csrf";


const RECEIVE_TRAILS = 'trails/RECEIVE_TRAILS';
export const RECEIVE_TRAIL = 'trails/RECEIVE_TRAIL';

const receiveTrails = (trails) => {
    return ({ type: RECEIVE_TRAILS, trails })
}

const receiveTrail = (payload) => {
    return ({ type: RECEIVE_TRAIL, payload })
}

export const fetchTrails = () => async dispatch => {
    const response = await csrfFetch('/api/trails');

    if (response.ok) {
        const trails = await response.json();
        return (dispatch(receiveTrails(trails)))
    }
}

export const fetchTrail = (trailId) => async dispatch => {
    const response = await csrfFetch(`/api/trails/${trailId}`);

    if (response.ok) {
        const payload = await response.json();
        return (dispatch(receiveTrail(payload)))
    }
}

// selector callbacks
export const getTrails = (state) => {
    return (state.trails ? Object.values(state.trails) : [])
}
export const getTrail = (trailId) => (state) => {
    return (state.trails ? state.trails[trailId] : null)
}

export default function trailsReducer(oldState = {}, action) {
    const newState = { ...oldState };
    switch (action.type) {
        case RECEIVE_TRAILS:
            return action.trails;
        case RECEIVE_TRAIL:
            const trail = action.payload.trail;
            newState[trail.id] = trail;
            return newState;
        default:
            return oldState;
    }
}
