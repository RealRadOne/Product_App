import React from 'react';
import ProductCard from './ProductCard';
import styles from './module.module.css'

function ProductList({products}){
    if (products.length === 0) {
        return <p>No products available.</p>;
    }
    return (
        <div className={styles.container}>
            {products.map((product,index)=>(
                <ProductCard
                key = {`${product.id}-${index}`}
                id = {product.id}
                name = {product.value}
                type = {product.type}
                imageUrl= {product.image_url}
                price = {product.price}
                />
            ))}
            </div>
    );
}

export default ProductList;