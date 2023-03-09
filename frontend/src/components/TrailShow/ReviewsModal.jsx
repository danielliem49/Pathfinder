import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrail, fetchTrail } from '../../store/trails';
import { createReview, updateReview, deleteReview } from '../../store/reviews';
import { ModalContext } from '.';




export default function ReviewsModal( {trailId} ) {
    const dispatch = useDispatch();
    // const trail = useSelector(getTrail(trailId));
    const { trail, showModal, setShowModal } = useContext(ModalContext);
    const user = useSelector((state) => {
        return (state.session ? state.session.user : null)
    })
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [date_hiked, setDate_hiked] = useState("2023-03-10")
    let review = {
        user_id: user ? user.id : null,
        trail_id: trailId,
        rating: "",
        description: "",
        date_hiked: ""
    };

    // useEffect(() => {
    //     dispatch(fetchTrail(trailId))
    // }, [dispatch, trailId])

    // handle review form submit
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const reviewData = { ...review, rating, description, date_hiked }
        dispatch(createReview(reviewData));
    }


    return (
        <div className="review-modal">
            <div className="review-modal-content">
                <button className="review-modal-close-button" onClick={() => setShowModal(false)}>X</button>
                <h2 className="review-modal-trail-name">{trail.trailName}</h2>
                <form onSubmit={handleReviewSubmit}>
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
                    <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
                    <input type="date" id="date" value={date_hiked} onChange={(e) => setDate_hiked(e.target.value)}  ></input>
                    <button className='review-modal-submit-button'>Submit Review</button>
                </form>
            </div>
        </div>
    )
}