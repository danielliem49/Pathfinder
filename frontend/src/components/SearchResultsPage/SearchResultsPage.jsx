import { useParams, useHistory, Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { getTrails } from "../../store/trails";
import './SearchResultsPage.css'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MiniSearch from "../Search/MiniSearch";

export default function SearchResultsPage() {
    const history = useHistory();
    const { searchQuery } = useParams();
    const trailResults = useSelector(getTrails).filter(t => 
        (t.trailName.toLowerCase().split(" ").join('').includes(searchQuery.split(" ").join('').toLowerCase())) ||
        (t.tags.toLowerCase().split("/").join('').includes(searchQuery.split(" ").join('').toLowerCase())) ||
        (t.parkName.toLowerCase().split(" ").join('').includes(searchQuery.split(" ").join('').toLowerCase()))
        )

    const handleCardClick = (trailId, event) => {
        // event.stopPropagation();
        history.push(`/trails/${trailId}`);
    };

    const moveRiverLeft = (elementClass) => {
        const river = document.getElementsByClassName(elementClass)[0];
        river.scrollLeft -= 150;
    }

    const moveRiverRight = (elementClass) => {
        const river = document.getElementsByClassName(elementClass)[0];
        river.scrollLeft += 150;
    }

    return (
        <>
            <MiniSearch />
            <div className="searchresults-container">
                <div className='searchresults-header'>{`Search results for "${searchQuery}" :`}</div>
                {trailResults.length > 0 ?
                    <div className='splash-trails-container' data-aos="fade-down" data-aos-duration="500">
                        <div className='splash-river-container'>
                            {trailResults.length > 4 ? <div className='left-river-arrow' onClick={() => moveRiverLeft('splash-river')}>
                                <ChevronLeftIcon />
                            </div> : <div className='empty-arrow'></div>}

                            <div className='splash-river'>
                                <div className='splash-river-trail-card-container'>
                                    {trailResults.map((trail) =>
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
                            {trailResults.length > 4 ? <div className='right-river-arrow' onClick={() => moveRiverRight('splash-river')}>
                                <ChevronRightIcon />
                            </div> : <div className='empty-arrow'></div>}
                        </div>
                    </div>
                    :
                    <div className="searchresults-sorry">Sorry, your search didn't return any results</div>
                }
            </div>
        </>
    )
}