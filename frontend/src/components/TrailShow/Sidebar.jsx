import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import stringify from 'query-string';
import TrailMapWrapper from '../TrailMap';
import { ModalContext } from '.';

export default function Sidebar({ trailId }) {
    const history = useHistory();
    const { trail, trails } = useContext(ModalContext);


    // map, fix these
    const handleMarkerClick = (trail) => {
        history.push(`/trails/${trail.id}`);
    }

    const handleMapClick = (event) => {
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

    // clicking on other trails
    const handleCardClick = (trailId) => {
        history.push(`/trails/${trailId}`);
    };

    return (
        <div className='trailshow-sidebar'>
            <TrailMapWrapper
                apiKey={process.env.REACT_APP_MAPS_API_KEY}
                trailId={trailId}
                markerEventHandlers={{ click: handleMarkerClick }}
                mapEventHandlers={{ click: handleMapClick }}
            />
            <div className='trailshow-othertrails-container'>
                <div className='trailshow-othertrails-header'>Nearby trails</div>
                <div className='trailshow-othertrails-river'>
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
                                <span>Length: {trail.length} km</span>
                                <span>•</span>
                                <span>Est. {trail.estimatedTime}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}