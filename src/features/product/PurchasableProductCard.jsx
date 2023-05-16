import { ProductCard } from './ProductCard';
import React from 'react';

/** @typedef {import('../../utilities/guid').Guid} Guid */

/**
 * Displays a purchasable product card.
 * 
 * @param {Object} props This card's props.
 * @param {Guid} props.productId The product to display
 */
export function PurchasableProductCard({ productId }) {
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
                action: <ProductCard.AddToCartButton />,
            }
        }} />
    );
}
