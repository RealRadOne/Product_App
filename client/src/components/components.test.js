import React from 'react';
import {render,screen,within} from '@testing-library/react';
import ProductCard from './ProductCard';
import ProductList from './ProductList';

describe('ProductCard Component',()=>{
    test('renders product details correctly',()=>{
        render(
            <ProductCard
            name = "Mock Product"
            type = "Clothes"
            imageUrl="https://example.com/mock.jpg"
            price = {99}
            />
        );
        screen.debug();
        //Find first img rendered in the document and find nearest ancestor from yhe div
        const card = screen.getByRole('img').closest('div');
        const utils = within(card);
        expect(utils.getByText(/Name: Mock Product/i)).toBeInTheDocument();
        expect(utils.getByText(/Type: Clothes/i)).toBeInTheDocument();
        expect(utils.getByText(/Price: 99/i)).toBeInTheDocument();
    });
});

describe('ProductList Component',()=>{
    const mockProduct = [{
        id: 1,
        value: 'Alpha',
        type: 'Electronics',
        image_url: 'https://example.com/alpha.jpg',
        price: 150
    }]
    test('render a product Card',()=>{
        render(<ProductList products={mockProduct}/>);
        const list = screen.getByTestId('product-list');
        const cards = within(list).getAllByTestId('product-card');
        const card  = within(cards[0]);
        expect(card.getByText(/Name: Alpha/i)).toBeInTheDocument();
        expect(card.getByText(/Type: Electronics/i)).toBeInTheDocument();
    })
})

describe('SearchBar Component',()=>{

})