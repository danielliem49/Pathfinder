import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrail, fetchTrail } from '../../store/trails';
import stringify from 'query-string';
import TrailMapWrapper from '../TrailMap';

/*
Export as the default a `PostShow` functional component that receives no props.
The component should fetch the requested post from the database, grab it from
the store, and render its `title` as an `<h1>`, its `body` in a `<p>` tag.
Finally, include a `Link` back to the `PostIndex`.

Do NOT worry about any other styling or formatting of the component; you just
need to render the required information to the screen.
*/

function TrailShow() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { trailId } = useParams();
    const trail = useSelector(getTrail(trailId));

    useEffect(() => {
        dispatch(fetchTrail(trailId))
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


    return (
        <>
            {trail && (
                <>
                    <h1>{trail.trailName}</h1>
                    <p>Length: {trail.length}</p>
                    <p>Difficulty: {trail.difficultyLevel}</p>
                    <p>Elevation Gain: {trail.elevationGain}</p>
                    <p>Route Type: {trail.routeType}</p>
                    <p>Estimated Time: {trail.estimatedTime}</p>
                    <p>Park: {trail.parkName}</p>
                    <div>
                        {trail.images && trail.images.map(image => (
                            <img src={image} key={image} />
                        ))}
                    </div>

                    {console.log(trail.images)}


                    <div>
                        <TrailMapWrapper
                            apiKey={process.env.REACT_APP_MAPS_API_KEY}
                            trailId={trailId}
                            markerEventHandlers={{ click: handleMarkerClick }}
                            mapEventHandlers={{ click: handleMapClick }}
                        />
                    </div>

                    <div>
                        <p>Reviews: {trail.reviews[0].rating}</p>
                    </div>
                </>
            )}
        </>
    )
}

export default TrailShow