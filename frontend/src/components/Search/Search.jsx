
import './Search.css';

export default function Search() {
    return(
        <>
            <input type="text" className='search-bar' required></input>
            <img className='search-bar-icon' src='https://danielliem49-pathfinder-seeds.s3.us-west-1.amazonaws.com/Pathfinder-seed-images/frontendAssets/search-icon.png'></img>
            <span className='search-bar-labels'>Search</span>
        </>
    )
}