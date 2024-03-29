import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrail, fetchTrail } from '../../store/trails';
import { createReview } from '../../store/reviews';
import { ModalContext } from '.';




export default function CreateReviewsModal({ trailId }) {
    const dispatch = useDispatch();
    const { trail, showCreateModal, setShowCreateModal } = useContext(ModalContext);
    const user = useSelector((state) => {
        return (state.session ? state.session.user : null)
    })
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [date_hiked, setDate_hiked] = useState('')
    const [errors, setErrors] = useState([]);

    let review = {
        user_id: user ? user.id : null,
        trail_id: trailId,
        rating: "",
        description: "",
        date_hiked: ""
    };

    // // old handle review form submit
    // const handleCreateReviewSubmit = (e) => {
    //     e.preventDefault();
    //     const reviewData = { ...review, rating, description, date_hiked }
    //     dispatch(createReview(reviewData));
    //     window.location.reload(false)
    // }

    // handle review form submit with error handling
    const handleCreateReviewSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const reviewData = { ...review, rating, description, date_hiked }
        return dispatch(createReview(reviewData))
            .then(() => {
                window.location.reload(false);
            })
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);       
                else if (data) setErrors([data]) ;
                else setErrors([res.statusText]);
            });
    }


    return (
        <div className="review-modal">
            <div className="review-modal-content">
                <button className="review-modal-close-button" onClick={() => setShowCreateModal(false)}>&#10005;</button>
                <h2 className="review-modal-trail-name">{trail.trailName}</h2>
                <form onSubmit={handleCreateReviewSubmit}>
                    <div className="review-form">
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
                        <textarea className="review-modal-textarea" onChange={(e) => setDescription(e.target.value)}></textarea>
                        <div className='review-modal-hikedate'>
                            <span style={{ paddingRight: 15 }}>Date hiked:</span>
                            <input value={date_hiked} type="date" id="date" onChange={(e) => setDate_hiked(e.target.value)} />
                        </div>
                        <div className="review-errors">
                            {errors.length > 0 ? errors[0].map((error) => <div className="review-error" key={error}>{error}</div>) : <div className="review-error"></div>}
                        </div>
                        <button className='review-modal-submit-button'>Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    )
}