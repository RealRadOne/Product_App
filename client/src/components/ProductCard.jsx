import React from 'react';
import styles from './module.module.css'

function ProductCard({name, type, imageUrl, price }) {
    return (
        <div className={styles.card}>
            <img
                src = {imageUrl}
                alt = {name}    
            />
            <div className={styles.cardContent}>
            <h3>Name: {name}</h3>
            <p>Type: {type}</p>
            <p>Price: {price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
