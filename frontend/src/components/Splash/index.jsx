import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrails, fetchTrails } from '../../store/trails';
import { getParks, fetchParks } from '../../store/parks';
// import { getUser, fetchUser } from '../../store/user';
import { Link, useHistory } from 'react-router-dom';
import './Splash.css';


function Splash() {
    const dispatch = useDispatch();
    const history = useHistory();
    const trails = useSelector(getTrails);
    const parks = useSelector(getParks);
    const user = useSelector((state) => {
        return (state.session ? state.session.user : null)
    })
    const [isLoaded, setIsLoaded] = useState(false);
    // const user = useSelector(getUser(userId));
    const bgdRandArray = [1, 2, 3, 4];
    const [bgdNum, setBgdNum] = useState(Math.floor(Math.random() * bgdRandArray.length));

    // for bgd image changes
    useEffect(() => {
        const interval = setInterval(() => {
            setBgdNum((bgdNum + 1) % (bgdRandArray.length));
        }, 8000);
        return () => clearInterval(interval);
    }, [bgdNum, bgdRandArray.length]);


    // dispatch fetches
    useEffect(() => {
        // make this just one fetch
        dispatch(fetchTrails())
        // dispatch(fetchParks())
    }, [dispatch])

    // for fade in effects
    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleCardClick = (trailId, event) => {
        // event.stopPropagation();
        history.push(`/trails/${trailId}`);
    };

    return (
        <>
            <div className='splash-body'>

                <div className={`splash-search-container bgd${bgdNum + 1}`}>
                    {user ?
                        <div className={`splash-search-header ${isLoaded ? ' isLoaded' : ''}`}>{`Today's the day, ${user.firstName}`}</div>
                        : <div className={`splash-search-header ${isLoaded ? 'isLoaded' : ''}`}>Find your outdoors</div>}
                    <div className={`splash-search-bar-container ${isLoaded ? 'isLoaded' : ''}`}>
                        {/* <label htmlFor="search-bar">Search:</label> */}
                        <input type="text" id="search-bar" className='splash-search-bar'></input>
                    </div>
                    {/* <span className="splash-search-bar-label">Future search function goes here</span> */}
                </div>

                <div className={`splash-trails-container ${isLoaded ? ' isLoaded' : ''}`}>
                    <div className='splash-trails-header'>
                        <h2>Local trails near you:</h2>
                    </div>
                    <div className='splash-river'>
                        <div className='splash-river-trail-card-container'>
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
                                        <span>Length: {trail.length} km</span><span>•</span>
                                        <span>Est. {trail.estimatedTime}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* <div>
                    <h2>Parks</h2>
                    <ul>
                        {parks.map((park) =>
                            <li key={park.id}>
                                <Link to={`/parks/${park.id}`}>{park.parkName}</Link>
                            </li>
                        )}
                    </ul>
                </div> */}
            </div>

        </>
    )
}

export default Splash;