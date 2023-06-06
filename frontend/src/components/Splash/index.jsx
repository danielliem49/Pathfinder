import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrails, fetchTrails } from '../../store/trails';
import { getParks, fetchParks } from '../../store/parks';
// import { getUser, fetchUser } from '../../store/user';
import { Link, useHistory } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Search from '../Search/Search';
import './Splash.css';
import 'aos/dist/aos.css';

function Splash() {
    const dispatch = useDispatch();
    const history = useHistory();
    const trails = useSelector(getTrails);
    const allTags = trails.reduce((tags, trail) => {
        trail.tags.split('/').forEach((tag) => {
            if (!tags.includes(tag.trim())) {
                tags.push(tag.trim());
            }
        });
        return tags;
    }, []);

    const parks = useSelector(getParks);
    const user = useSelector((state) => {
        return (state.session ? state.session.user : null)
    })
    const [isLoaded, setIsLoaded] = useState(false);
    // const user = useSelector(getUser(userId));
    const bgdRandArray = [1, 2, 3, 4];
    const [bgdNum, setBgdNum] = useState(Math.floor(Math.random() * bgdRandArray.length));


    // setting random tag for river
    let randTag = '';
    let randTagTrails = [];
    if (allTags) {
        // randTag = allTags[Math.floor(Math.random() * allTags.length)];
        // ^reset bug?

        randTag = allTags[10];
        randTagTrails = trails.filter((trail) => { return trail.tags.split('/').includes(randTag) });
    }

    // for bgd image changes
    useEffect(() => {
        const interval = setInterval(() => {
            setBgdNum((bgdNum + 1) % (bgdRandArray.length));
        }, 8000);
        return () => clearInterval(interval);
    }, [bgdNum]);


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

    const moveRiverLeft = (elementClass) => {
        const river = document.getElementsByClassName(elementClass)[0];
        river.scrollTo({
            left: river.scrollLeft - 500,
            behavior: 'smooth' // adds smooth scrolling effect
        });
    };

    const moveRiverRight = (elementClass) => {
        const river = document.getElementsByClassName(elementClass)[0];
        river.scrollTo({
            left: river.scrollLeft + 500,
            behavior: 'smooth' // adds smooth scrolling effect
        });
    };

    return (
        <>
            {trails && (<div className='splash-body'>

                <div className={`splash-search-container bgd${bgdNum + 1}`}>
                    {user ?
                        <div className={`splash-search-header ${isLoaded ? ' isLoaded' : ''}`}>{`Today's the day, ${user.firstName}`}</div>
                        : <div className={`splash-search-header ${isLoaded ? 'isLoaded' : ''}`}>Find your outdoors</div>}
                    <div className={`splash-search-bar-container ${isLoaded ? 'isLoaded' : ''}`}>
                        <Search />
                    </div>
                </div>

                <div className='splash-trails-container' data-aos="fade-down" data-aos-duration="500">
                    <div className='splash-trails-header'>
                        <h2>Local trails near you:</h2>
                    </div>
                    <div className='splash-river-container'>
                        <div className='left-river-arrow' onClick={() => moveRiverLeft('splash-river')}>
                            <ChevronLeftIcon />
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
                        <div className='right-river-arrow' onClick={() => moveRiverRight('splash-river')}>
                            <ChevronRightIcon />
                        </div>
                    </div>
                </div>


                {randTag && (<div className='splash-trails-container' data-aos="fade-down" data-aos-duration="500">
                    <div className='splash-trails-header'>
                        <h2>{`Best ${randTag.toLowerCase()} trails:`}</h2>
                    </div>
                    <div className='splash-river-container'>
                        {randTagTrails.length > 4 ? <div className='left-river-arrow' onClick={() => moveRiverLeft('splash-river')}>
                            <ChevronLeftIcon />
                        </div> : <div className='empty-arrow'></div>}
                        
                        <div className='splash-river'>
                            <div className='splash-river-trail-card-container'>
                                {randTagTrails.map((trail) =>
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
                        {randTagTrails.length > 4 ? <div className='right-river-arrow' onClick={() => moveRiverRight('splash-river')}>
                            <ChevronRightIcon />
                        </div> : <div className='empty-arrow'></div>}
                    </div>
                </div>
                )}


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

            )}
        </>
    )
}

export default Splash;