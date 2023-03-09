
import csrfFetch from "./csrf.js";

const RECIEVE_REVIEW = 'reviews/RECIEVE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';


const receiveReview = (review) => {
    return ({ type: RECIEVE_REVIEW, review })
}

const removeReview = (reviewId) => {
    return ({ type: REMOVE_REVIEW, reviewId })
}


export const createReview = (review) => async dispatch => {
    const response = await csrfFetch('/api/reviews', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const newReview = await response.json();
        return (dispatch(receiveReview(newReview)))
    }
}

export const updateReview = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const updatedReview = await response.json();
        return (dispatch(receiveReview(updatedReview)))
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        return (dispatch(removeReview(reviewId)))
    }
}

export default function reviewsReducer(oldState = {}, action) {
    const newState = { ...oldState };
    switch (action.type) {
        case RECIEVE_REVIEW:
            const review = action.review;
            newState[review.id] = review;
            return newState;
        case REMOVE_REVIEW:
            const reviewId = action.review.id;
            delete newState[reviewId];
            return newState;
        default:
            return oldState;
    }
}