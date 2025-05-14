import React from 'react';
import styles from './module.module.css'

function SearchBar(props){
    return(
        <div className={styles.sideBar}>
        <input
            type="text"
            placeholder="Name"
            value = {props.searchTerm}
            //Get and set current text from input field on change
            onChange = {(e)=>props.setSearchTerm(e.target.value)}
        />
        <select 
            value={props.filterType}
            onChange={(e)=>props.setFilterType(e.target.value)}
            className={styles.selectField}
        >
            <option value="All">All Categories</option>
            <option value="Clothes">Clothes</option>
            <option value="Food">Food</option>
            <option value="Electronics">Electronics</option>
            <option value="Supplies">Supplies</option>
            <option value="Misc">Misc</option>
        </select>
        <div>
        <label className={styles.rangeLabel}>Price Range: ${props.minPrice} - ${props.maxPrice}</label>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={props.minPrice}
                    onChange={(e) => props.setMinPrice(e.target.value)}
                />
         <label className={styles.rangeLabel}>Max Price: ${props.maxPrice}</label>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={props.maxPrice}
                    onChange={(e) => props.setMaxPrice(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
        </div>
    );
}

export default SearchBar;