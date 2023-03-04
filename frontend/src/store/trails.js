
const RECEIVE_TRAILS = 'trails/RECEIVE_TRAILS';
const RECEIVE_TRAIL = 'trails/RECEIVE_TRAIL';

const receiveTrails = (trails) => {
    return ({ type: RECEIVE_TRAILS, trails })
}

const receiveTrail = (trail) => {
    return ({ type: RECEIVE_TRAIL, trail })
}

export const fetchTrails = () => async dispatch => {
    const response = await fetch('/api/trails');

    if (response.ok) {
        const trails = await response.json();
        return (dispatch(receiveTrails(trails)))
    }
}

export const fetchTrail = (trailId) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}`);

    if (response.ok) {
        const trail = await response.json();
        return (dispatch(receiveTrail(trail)))
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
            const trail = action.trail;
            newState[trail.id] = trail;
            return newState;
        default:
            return oldState;
    }
}
