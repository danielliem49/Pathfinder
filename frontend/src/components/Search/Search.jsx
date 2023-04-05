
import './Search.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function Search() {

    const handleSearchSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <form onSubmit={handleSearchSubmit}>
                <input type="text" className='search-bar' required></input>
                <img className='search-bar-icon' src='https://danielliem49-pathfinder-seeds.s3.us-west-1.amazonaws.com/Pathfinder-seed-images/frontendAssets/search-icon.png'></img>
                <span className='search-bar-labels'>Search</span>
                <button className="search-button" type="submit">
                    <ArrowRightAltIcon />
                </button>
            </form>
        </>
    )
}