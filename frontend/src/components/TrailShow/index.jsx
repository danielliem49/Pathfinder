import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrail, fetchTrail } from '../../store/trails';

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
    const { trailId } = useParams();
    console.log(trailId)
    const trail = useSelector(getTrail(trailId));
    console.log(trail)

    useEffect(() => {
        dispatch(fetchTrail(trailId))
    }, [dispatch, trailId])

    // return (
    //     <>
    //         <h1>{trail.trailName}</h1>
    //         <p>Length: {trail.length}</p>
    //         <p>Difficulty: {trail.difficultyLevel}</p>
    //         <p>Elevation Gain: {trail.elevationGain}</p>
    //         <p>Route Type: {trail.routeType}</p>
    //         <p>Estimated Time: {trail.estimatedTime}</p>
    //     </>
    // )


    return (
        <>
            {trail?.trailName && (
                <h1>{trail.trailName}</h1>
            )}
            {trail?.length && (
                <p>Length: {trail.length}</p>
            )}
            {trail?.difficultyLevel && (
                <p>Difficulty: {trail.difficultyLevel}</p>
            )}
            {trail?.elevationGain && (
                <p>Elevation Gain: {trail.elevationGain}</p>
            )}
            {trail?.routeType && (
                <p>Route Type: {trail.routeType}</p>
            )}
            {trail?.estimatedTime && (
                <p>Estimated Time: {trail.estimatedTime}</p>
            )}
        </>
    )
}

export default TrailShow