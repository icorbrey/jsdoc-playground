import { ProductCard } from './ProductCard';
import React from 'react';

/**
 * Displays a purchasable product card.
 * 
 * @param {Object} props This card's props.
 * @param {import('./ProductCard').Product} props.product The product to display
 * @param {(product: import('./ProductCard').Product) => void} props.onClick Is called when the "Add to Cart" action is clicked.
 */
export function PurchasableProductCard({ product, onClick }) {
    return (
        <ProductCard {...{
            product,
            slots: {
                image: <ProductCard.Image />,
                info: <>
                    <ProductCard.Category />
                    <ProductCard.Title />
                    <ProductCard.Rating />
                    <ProductCard.Price currencySymbol='$' />
                </>,
                action: (
                    <ProductCard.Action {...{ onClick }}>
                        Add to Cart
                    </ProductCard.Action>
                )
            }
        }} />
    );
}
