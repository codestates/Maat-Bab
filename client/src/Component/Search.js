import React from 'react'
import SearchBar from './SearchBar';
import SearchMap from './SearchMap';
import './Search.css';

function Search() {
    return (
        <div className='search'>
        <h3>Search Component</h3>
        <SearchBar className='search__searchbar'/>

        <SearchMap className='search__serachmap'/>
        
        </div>
    )
}

export default Search
