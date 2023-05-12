import { PurchasableProductCard } from './components/PurchasableProductCard';
import { WrapColumns } from './components/WrapColumns';
import React from 'react';
import './App.css';

/** @type {import('./components/ProductCard').Product} */
const product = {
    title: 'Viston Earl Grey Tea',
    category: 'Black Tea',
    rating: 4,
    price: 8.95,
    image: {
        src: 'https://picsum.photos/300/240',
        alt: 'A random image.',
    }
};

const addToCart = () => { };

const App = () => (
    <WrapColumns>
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
        <PurchasableProductCard {...{ product, onClick: addToCart }} />
    </WrapColumns>
);

export default App;
