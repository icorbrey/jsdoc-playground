import { ProductCard } from './ProductCard';
import React from 'react';

/**
 * Displays an out of stock product card.
 * 
 * @param {Object} props This card's props.
 * @param {Guid} props.productId The product to display
 */
export function OutOfStockProductCard({ productId }) {
    return (
        <ProductCard {...{
            productId,
            slots: {
                image: <ProductCard.Image />,
                info: <>
                    <ProductCard.Category />
                    <ProductCard.Title />
                    <ProductCard.Rating />
                    <ProductCard.Price />
                </>,
                action: <ProductCard.OutOfStockButton />,
            }
        }} />
    );
}
