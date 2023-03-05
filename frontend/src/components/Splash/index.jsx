import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PostForm from './PostForm';
// import PostIndexItem from './PostIndexItem';
import { getTrails, fetchTrails } from '../../store/trails';
import { getParks, fetchParks } from '../../store/parks';
import { Link, useHistory } from 'react-router-dom';
import stringify from 'query-string';
import TrailMapWrapper from '../TrailMap';

function Splash() {
    const dispatch = useDispatch();
    const history = useHistory();
    const trails = useSelector(getTrails);
    const parks = useSelector(getParks);
    // const trails = useSelector(state => state.trails.list)
    // const parks = useSelector(state => state.parks.list)


    useEffect(() => {
        dispatch(fetchTrails())
        dispatch(fetchParks(parks))
    }, [dispatch])

    console.log(trails)
    console.log(parks)

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

    // console.log(trails)

    return (
        <>

            <div>
                <h1>Welcome back, </h1>
            </div>

            <div>
            <TrailMapWrapper 
                apiKey={process.env.REACT_APP_MAPS_API_KEY}
                trails={trails}
                markerEventHandlers={{ click: handleMarkerClick }}
                mapEventHandlers={{ click: handleMapClick }}
            />
            </div>

            <div>
                <h2>Trails</h2>
                <ul>
                    {trails.map((trail) =>
                        <li key={trail.id}>
                            <Link to={`/trails/${trail.id}`}>{trail.trailName}</Link>
                        </li>
                    )}
                </ul>
            </div>

            <div>
                <h2>Parks</h2>
                <ul>
                    {parks.map((park) =>
                        <li key={park.id}>
                            <Link to={`/parks/${park.id}`}>{park.parkName}</Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default Splash;