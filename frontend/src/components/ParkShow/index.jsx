import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPark, fetchPark } from '../../store/parks';

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
    const { parkId } = useParams();
    const park = useSelector(getPark(parkId));
    
    useEffect(() => {
        dispatch(fetchPark(parkId))
    }, [dispatch, parkId])
    
    return (
        <>
            {park?.parkName && (
                <h1>{park.parkName}</h1>
                )}

            {park?.description && (
                <p>Description: {park.description}</p>
            )}

            {/* {park?.trails && (
                park.trails.map((trail) =>
                    <p>Trails: 
                        <Link to={`/trails/${trail.id}`}>{trail.trailName}</Link>
                    </p>
                )
            )} */}

            {park?.trails && (
                <div>
                    <p>Trails:</p>
                    {console.log(park.trails)}
                    {park.trails.map((trail) => (

                        <div key={trail.id}>
                            <span>
                                <Link to={`/trails/${trail.id}`}>{trail.trail_name}</Link>
                            </span>
                        </div>
                    ))}
                </div>
            )}

            

        </>
    )
}

export default ParkShow