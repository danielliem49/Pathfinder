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
                    <div className={`splash-search-header ${isLoaded ? 'isLoaded' : ''}`}>Find your outdoors</div>
                    <div className={`splash-search-bar ${isLoaded ? 'isLoaded' : ''}`}>Search Bar Goes Here</div>
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
                                    <div className='trail-card-reviews'>Reviews</div>
                                    <div className='trail-card-name'>{trail.trailName}</div>
                                    <div className='trail-card-park' onClick={(event) => event.stopPropagation()}>
                                        <Link to={`/parks/${trail.parkId}`}>Park: {trail.parkName}</Link>
                                    </div>
                                    <div className='trail-card-details'>
                                        Length: {trail.length} km<span>•</span>
                                        Est. {trail.estimatedTime}<span>•</span>
                                        {trail.difficultyLevel}
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