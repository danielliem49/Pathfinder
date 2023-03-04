import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PostForm from './PostForm';
// import PostIndexItem from './PostIndexItem';
import { getTrails, fetchTrails } from '../../store/trails';
import { getParks, fetchParks } from '../../store/parks';
import { Link } from 'react-router-dom';

function Splash() {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);
    const parks = useSelector(getParks);

    useEffect(() => {
        dispatch(fetchTrails())
        dispatch(fetchParks(parks))
    }, [dispatch])

    return (
        <>

            <div>
                <h1>Welcome back, </h1>
            </div>
            <div>
                <h2>Trails</h2>
                <ul>
                    {trails.map((trail) =>
                        <li>
                            <Link to={`/trails/${trail.id}`}>{trail.trailName}</Link>
                        </li>
                    )}
                </ul>
            </div>

            <div>
                <h2>Parks</h2>
                <ul>
                    {parks.map((park) =>
                        <li>
                            <Link to={`/parks/${park.id}`}>{park.parkName}</Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default Splash;