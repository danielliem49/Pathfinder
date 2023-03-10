import { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPark, fetchPark } from '../../store/parks';
import './ParkShow.css'

/*
Export as the default a `PostShow` functional component that receives no props.
The component should fetch the requested post from the database, grab it from
the store, and render its `title` as an `<h1>`, its `body` in a `<p>` tag.
Finally, include a `Link` back to the `PostIndex`.

Do NOT worry about any other styling or formatting of the component; you just
need to render the required information to the screen.
*/

function ParkShow() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { parkId } = useParams();
    const park = useSelector(getPark(parkId));
    const trails = useSelector((state) => Object.values(state.trails))

    useEffect(() => {
        dispatch(fetchPark(parkId))
    }, [dispatch, parkId])

    const handleCardClick = (trailId, event) => {
        // event.stopPropagation();
        history.push(`/trails/${trailId}`);
    };

    return (
        <>


            {park && trails && (
                <>
                    <div className='parkshow-body'>
                        <div className='splash-river' style={{ margin: 0, padding: 20 }}>
                            <div className='splash-river-trail-card-container'>
                                {trails.map((trail) =>
                                    <div key={trail.id} className='trail-card' id='parkshow-trail-card' onClick={() => handleCardClick(trail.id)} >
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


                        <div className='parkshow-content'>
                            <div className='parkshow-header'>{park.parkName}</div>
                            <div className='parkshow-totalreviews'>Total trail reviews: {park.numReviews}</div>
                            <div className='parkshow-blurb'>{`Want to find the best trails in ${park.parkName} for an adventurous hike or family trip? Pathfinder has ${trails.length} great trail${trails.length > 1 ? "s" : ""} for hiking, birding, walking, and more. Enjoy maps, along with reviews and photos from nature lovers like you. Whatever you have planned for the day, you can find the perfect trail for your next trip to ${park.parkName}.`}</div>

                            <div className='parkshow-info-container'>
                                <div className='parkshow-info-header'>Park Information</div>
                                <div className='parkshow-info'>
                                    <div>
                                        {park.description}    
                                    </div>
                                    <br>
                                    </br>
                                    <div className='parkshow-contact'>
                                        <div>Location:</div>
                                        <div>{`${park.state}, ${park.country}`}</div>
                                        <div>Contact:</div>
                                        <div>{`${park.contact}`}</div>
                                    </div>
                                </div>


                            </div>

                        </div>



                    </div>

                </>
            )}

            {/* {park?.trails && (
                park.trails.map((trail) =>
                    <p>Trails: 
                        <Link to={`/trails/${trail.id}`}>{trail.trailName}</Link>
                    </p>
                )
            )} */}

            {/* {park?.trails && (
                <div>
                    <p>Trails:</p>
                    {park.trails.map((trail) => (
                        <div key={trail.id}>
                            <span>
                                <Link to={`/trails/${trail.id}`}>{trail.trailName}</Link>
                            </span>
                        </div>
                    ))}
                </div>
            )} */}
        </>
    )
}

export default ParkShow