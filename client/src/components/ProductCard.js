import React from 'react';

function ProductCard({ id, name, type}) {
    return React.createElement(
        'div',
        {
            style: {
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                margin: '10px',
                width: '500px',
                textAlign: 'center',
                boxShadow: '2px 2px 12px rgba(0,0,0,0.1)'
            }
        },
        React.createElement('h3', null, `ID: ${id}`),
        React.createElement('p', null, `Name: ${name}`),
        React.createElement('p', null, `Type: ${type}`)
    );
}


export default ProductCard;