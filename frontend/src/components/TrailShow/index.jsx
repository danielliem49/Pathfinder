import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrail, getTrails, fetchTrail, fetchTrails } from '../../store/trails';
import stringify from 'query-string';
import TrailMapWrapper from '../TrailMap';
import './TrailShow.css'


function TrailShow() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { trailId } = useParams();
    const trail = useSelector(getTrail(trailId));
    const trails = useSelector(getTrails).filter(t => t.id !== trailId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchTrails()).then(() => {
            dispatch(fetchTrail(trailId))
        })
    }, [dispatch, trailId])

    function handleMarkerClick(trail) {
        history.push(`/trails/${trail.id}`);
    }

    function handleMapClick(event) {
        const { latLng } = event;
        const queryParams = stringify({
            lat: latLng.toJSON().lat,
            lng: latLng.toJSON().lng
        });
        history.push({
            pathname: '/trails/new',
            search: queryParams
        });
    }

    const handleCardClick = (trailId) => {
        history.push(`/trails/${trailId}`);
    };

    function writeReviewModal() {
        setShowModal(true);
    }


    return (
        <>
            {trail && trails && trail.reviews && (
                <>
                    <div className='trailshow-body'>

                        <div className='trailshow-navigation'>
                            <div>Search Goes Here</div>
                        </div>

                        <div className='trailshow-card'>
                            <div className='trailshow-card-header-container' style={trail.images && trail.images.length > 0 ? { backgroundImage: `url(${trail.images[0]})` } : null}>
                                <div className='trailshow-name'>{trail.trailName} </div>
                                <div>
                                    {trail.difficultyLevel}<span>•</span>
                                    Average Review:
                                </div>
                                <div>{trail.parkName}</div>
                            </div>

                            <div className='trailshow-card-body-container'>

                                <div className='trailshow-content'>

                                    <div className='trailshow-properties'>
                                        <div>
                                            <span>{trail.length}</span>
                                            <span>{trail.elevationGain}</span>
                                            <span>{trail.routeType}</span>
                                        </div>

                                        <div>{trail.description}</div>
                                    </div>

                                    <div className='trailshow-reviews'>
                                        <div>Reviews:</div>
                                        <button className='type1-button' onClick={writeReviewModal}>Write a Review</button>
                                        {showModal && (
                                            <div className="review-modal">
                                                <div className="review-modal-content">
                                                    <button className="review-modal-close-button" onClick={() => setShowModal(false)}>X</button>
                                                    <h2 className="review-modal-trail-name">{trail.trailName}</h2>
                                                    <p>Modal content goes here.</p>
                                                    <button>Submit Review</button>
                                                </div>
                                            </div>
                                        )}

                                        {trail.reviews.map((review) =>
                                            <div key={review.id} className='review-container'>
                                                <div>{review.user.firstName} {review.user.lastName}</div>
                                                <div>{review.dateHiked}</div>
                                                <div>{Array(review.rating).fill().map((_, index) => (
                                                    <span key={index} className="review-star">&#9733;</span>
                                                ))}
                                                </div>
                                                <div>{review.description}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>


                                <div className='trailshow-sidebar'>
                                    <TrailMapWrapper
                                        apiKey={process.env.REACT_APP_MAPS_API_KEY}
                                        trailId={trailId}
                                        markerEventHandlers={{ click: handleMarkerClick }}
                                        mapEventHandlers={{ click: handleMapClick }}
                                    />
                                    <div className='trailshow-othertrails-container'>
                                        {trails.map((trail) =>
                                            <div key={trail.id} className='trail-card' onClick={() => handleCardClick(trail.id)} >
                                                <div className='trail-card-image'>
                                                    <img src={trail.imagePreviewUrl} key={trail.imagesPreviewUrl} />
                                                </div>
                                                <div className='trail-card-reviews'>
                                                    <span style={{ marginRight: '8px' }}>{trail.difficultyLevel}</span>
                                                    <span className="review-alt-coloring">•</span>
                                                    <span className="review-star" style={{ marginLeft: '8px' }}>&#9733;</span>
                                                    <span style={{ marginLeft: '3px' }}>{trail.avgRating.toFixed(1)}</span>
                                                    <span className="review-alt-coloring" style={{ marginLeft: '3px' }}>({trail.numReviews})</span>
                                                </div>
                                                <div className='trail-card-name'>{trail.trailName}</div>
                                                <div onClick={(event) => event.stopPropagation()}>
                                                    <Link to={`/parks/${trail.parkId}`} className='trail-card-park'>{trail.parkName}</Link>
                                                </div>
                                                <div className='trail-card-details'>
                                                    <span>Length: {trail.length} km</span>
                                                    <span>•</span>
                                                    <span>Est. {trail.estimatedTime}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                    {/* <p>Length: </p>
                    <div>
                        {trail.images && trail.images.map(image => (
                            <img src={image} key={image} />
                        ))}
                    </div>

                    {console.log(trail.images)}




                    <div>
                        <p>Reviews: {trail.reviews[0].rating}</p>
                    </div> */}
                </>
            )}
        </>
    )
}

export default TrailShow