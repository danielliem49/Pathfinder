import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Search.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function Search() {
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${searchQuery}`);
    }

    return (
        <>
            <div className='search-bar-container'>
                <form onSubmit={handleSearchSubmit}>
                    <input type="text" className='search-bar' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} required></input>
                    <img className='search-bar-icon' src='https://danielliem49-pathfinder-seeds.s3.us-west-1.amazonaws.com/Pathfinder-seed-images/frontendAssets/search-icon.png'></img>
                    <span className='search-bar-labels'>Search</span>
                    <button className="search-button" type="submit">
                        <ArrowRightAltIcon />
                    </button>
                </form>
            </div>
        </>
    )
}