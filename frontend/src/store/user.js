
const RECEIVE_USER = 'users/RECEIVE_USER';

const receiveUser = (user) => {
    return ({ type: RECEIVE_USER, user })
}

export const fetchUser = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`);

    if (response.ok) {
        const user = await response.json();
        return (dispatch(receiveUser(user)))
    }
}

export const getUser = (userId) => (state) => {
    return (state.users ? state.users[userId] : null)
}

export default function usersReducer(oldState = {}, action) {
    const newState = { ...oldState };
    switch (action.type) {
        case RECEIVE_USER:
            const user = action.user;
            newState[user.id] = user;
            return newState;
        default:
            return oldState;
    }
}