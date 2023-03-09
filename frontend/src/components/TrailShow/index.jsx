import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrail, getTrails, fetchTrail, fetchTrails } from '../../store/trails';
import { deleteReview } from '../../store/reviews';
import CreateReviewsModal from './CreateReviewsModal';
import UpdateReviewsModal from './UpdateReviewsModal';
import Sidebar from './Sidebar';
import './TrailShow.css'

// context for modal
export const ModalContext = React.createContext();

function TrailShow() {
    const dispatch = useDispatch();
    const { trailId } = useParams();
    const trail = useSelector(getTrail(trailId));
    const trails = useSelector(getTrails).filter(t => t.trailName !== trail.trailName)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

    const user = useSelector((state) => {
        return (state.session ? state.session.user : null)
    })

    // make more efficient in jbuilder
    useEffect(() => {
        dispatch(fetchTrails()).then(() => {
            dispatch(fetchTrail(trailId))
        })
    }, [dispatch, trailId])


    // review modal
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const toggleCreateReviewModal = () => {
        setShowCreateModal(true);
    }

    const toggleUpdateReviewModal = () => {
        setShowUpdateModal(true);
    }

    const handleDeleteReviewSubmit = (reviewId) => (e) => {
        e.preventDefault();
        dispatch(deleteReview(reviewId))
        window.location.reload(false)
    }

    return (
        <>
            {trail && trails && trail.reviews && (
                <>
                    <div className='trailshow-body'>
                        {console.log(trail.description.split("\n"))}
                        <div className='trailshow-navigation'>
                            <div>Search Goes Here</div>
                        </div>

                        <div className='trailshow-card'>
                            <div className='trailshow-card-header-container' style={trail.images && trail.images.length > 0 ? { backgroundImage: `url(${trail.images[0]})` } : null}>
                                <div className='trailshow-card-header'>
                                    <div className='trailshow-name'>{trail.trailName} </div>
                                    <div className='trailshow-header-reviews'>
                                        <span style={{ marginRight: '8px' }}>{trail.difficultyLevel}</span>
                                        <span className="review-alt-coloring">•</span>
                                        <span className="review-star" style={{ marginLeft: '6px' }}>&#9733;</span>
                                        <span style={{ marginLeft: '4px' }}>{trail.avgRating.toFixed(1)}</span>
                                        <span className="review-alt-coloring" style={{ marginLeft: '3px', color: '#efefec' }}>({trail.numReviews})</span>
                                    </div>
                                    <div onClick={(event) => event.stopPropagation()}>
                                        <Link to={`/parks/${trail.parkId}`} className='trail-card-park' style={{ color: '#efefec' }}>{trail.parkName}</Link>
                                    </div>
                                </div>
                            </div>

                            <div className='trailshow-card-body-container'>

                                <div className='trailshow-content'>

                                    <div className='trailshow-properties'>
                                        <div className='trailshow-properties-headers'>
                                            <div>Length</div>
                                            <div>Elevation gain</div>
                                            <div>Route type</div>
                                        </div>

                                        <div className='trailshow-properties-data'>
                                            <div>{trail.length} km</div>
                                            <div>{trail.elevationGain} m</div>
                                            <div>{trail.routeType}</div>
                                        </div>
                                    </div>

                                    <div className='trailshow-description'>{
                                        trail.description.split("\n").map((para) =>
                                            <p>{para}</p>
                                        )}
                                    </div>

                                    <div className='trailshow-tags'>{ }</div>
                                    <div className='trailshow-reviews'>
                                        <div className='trailshow-review-summary'>
                                            {/* <div className='review-summary-graph'></div> */}
                                            <div className='trailshow-card-avgrating-container'>
                                                <div>Average Rating:</div>
                                                <div className='trailshow-card-avgrating'>
                                                    {trail.avgRating.toFixed(1)}
                                                </div>
                                                <div className='trailshow-card-numreviews'>{trail.numReviews} reviews</div>
                                            </div>
                                            <button className='write-review-button' onClick={toggleCreateReviewModal}>Write a Review</button>
                                            {showCreateModal && (
                                                <ModalContext.Provider value={{ trail, showCreateModal, setShowCreateModal }}>
                                                    <CreateReviewsModal trailId={trailId} />
                                                </ModalContext.Provider>
                                            )}
                                        </div>
                                        {trail.reviews.sort((a, b) => {
                                            return new Date(b.dateHiked) - new Date(a.dateHiked);
                                        }).map((review) =>
                                            <div key={review.id} className='review-container'>
                                                <div>{review.user.firstName} {review.user.lastName}</div>
                                                <div>{review.dateHiked}</div>
                                                <div>{Array(review.rating).fill().map((_, index) => (
                                                    <span key={index} className="review-star">&#9733;</span>
                                                ))}
                                                </div>
                                                <div className='review-description'>{review.description}</div>
                                                {user && review.user.email === user.email && (
                                                    <div>
                                                        <span className='edit-review-button' onClick={toggleUpdateReviewModal}>Edit</span>
                                                        {showUpdateModal && (
                                                            <ModalContext.Provider value={{ trail, showUpdateModal, setShowUpdateModal }}>
                                                                <UpdateReviewsModal trailId={trailId} reviewId={review.id} />
                                                            </ModalContext.Provider>
                                                        )}
                                                        <span className='delete-review-button' onClick={handleDeleteReviewSubmit(review.id)}>Delete</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <ModalContext.Provider value={{ trail, trails }}>
                                    <Sidebar trailId={trailId} />
                                </ModalContext.Provider>


                            </div>
                        </div>



                    </div>
                </>
            )}
        </>
    )
}

export default TrailShow