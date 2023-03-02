import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PostForm from './PostForm';
// import PostIndexItem from './PostIndexItem';
import { getTrails, fetchTrails } from '../../store/trails';
import { getParks, fetchParks } from '../../store/parks';


function Splash () {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);
    const parks = useSelector(getParks);

    useEffect(() => {
        dispatch(fetchTrails(trails))
        dispatch(fetchParks(parks));
    }, [dispatch])

    return (
        <>
        <ul>
            {/* {trails.map((trail) => trail.trail_name)} */}
            <p> Hello </p>
        </ul>
        </>
    )
}

export default Splash;