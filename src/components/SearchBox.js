import React from 'react';

const SearchBox = ({searchField, onSearchChange}) => {
    return ( 
        <div className="pa2">
            <input 
                className="pa3 ba b--green bg-lightest-blue"
                type="search" 
                name="" id="" 
                placeholder="Search robots" 
                onChange={onSearchChange}
            />
        </div>
        
     );
}
 
export default SearchBox;