import React from 'react';
import ProductCard from './ProductCard';

function ProductList({products}){
    return React.createElement(
        'div',
        {
            style:{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }
        },
        products.map(product=>
            React.createElement(ProductCard,{
                key: product.ID,
                id: product.ID,
                name:product.value,
                type: product.Type
            })
        )
    );
}

export default ProductList;