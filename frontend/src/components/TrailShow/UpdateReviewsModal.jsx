import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrail, fetchTrail } from '../../store/trails';
import { createReview, updateReview, deleteReview, getReview } from '../../store/reviews';
import { ModalContext } from '.';




export default function UpdateReviewsModal({ trailId, reviewId }) {
    const dispatch = useDispatch();
    // const trail = useSelector(getTrail(trailId));
    const { trail, showUpdateModal, setShowUpdateModal } = useContext(ModalContext);
    const user = useSelector((state) => {
        return (state.session ? state.session.user : null)
    })

    let review = useSelector(getReview(reviewId));
    console.log(review)

    const [rating, setRating] = useState(review.rating);
    const [description, setDescription] = useState(review.description);
    const [date_hiked, setDate_hiked] = useState(review.date_hiked);

    // useEffect(() => {
    //     dispatch(fetchTrail(trailId))
    // }, [dispatch, trailId])

    // handle review form submit
    const handleUpdateReviewSubmit = (e) => {
        e.preventDefault();
        const reviewData = { ...review, rating, description, date_hiked }
        dispatch(updateReview(reviewData));
        window.location.reload(false)
    }


    return (
        <div className="review-modal">
            <div className="review-modal-content">
                <button className="review-modal-close-button" onClick={() => setShowUpdateModal(false)}>X</button>
                <h2 className="review-modal-trail-name">Update review for:{trail.trailName}</h2>
                <form onSubmit={handleUpdateReviewSubmit}>
                    <input type="hidden" name="authenticity_token" value="<%= form_authenticity_token %>" />
                    <div className='review-modal-rating'>
                        <input type='radio' value='5' id='5' name='rating' onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor='5'>&#9733;</label>
                        <input type='radio' value='4' id='4' name='rating' onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor='4'>&#9733;</label>
                        <input type='radio' value='3' id='3' name='rating' onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor='3'>&#9733;</label>
                        <input type='radio' value='2' id='2' name='rating' onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor='2'>&#9733;</label>
                        <input type='radio' value='1' id='1' name='rating' onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor='1'>&#9733;</label>
                    </div>
                    <textarea value={review.description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <input value={date_hiked} type="date" id="date" onChange={(e) => setDate_hiked(e.target.value)}  ></input>
                    <button className='review-modal-submit-button'>Submit Review</button>
                </form>
            </div>
        </div>
    )
}