import React from 'react'
import SearchBar from './SearchBar';
import SearchMap from './SearchMap';
import './Search.css';
import KakaoMap from './KakaoMap';

function Search() {
    return (
        <div className='search'>
        <h3>Search Component</h3>
        <SearchBar className='search__searchbar'/>

        <SearchMap className='search__serachmap'/>
        
            <KaKaoMap {city, city2, searchPlace, setCurnPlace}/>
        </div>
    )
}

export default Search
