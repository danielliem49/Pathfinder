import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './MiniSearch.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function MiniSearch() {
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${searchQuery}`);
    }

    return (
        <>
            <div className='minisearch-container'>
                <form onSubmit={handleSearchSubmit}>
                    <input type="text" className='minisearch-bar' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} required></input>
                    <span className='minisearch-bar-labels'>Search by trail, park, or activity</span>
                    <button className="minisearch-button" type="submit">
                        <ArrowRightAltIcon />
                    </button>
                </form>
            </div>
        </>
    )
}