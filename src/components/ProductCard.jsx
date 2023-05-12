import { useSafeContext } from '../utilities/useSafeContext';
import React, { createContext } from 'react';
import './ProductCard.jsx.css';

/**
 * @typedef {Object} Product A product to be sold.
 * @property {string} title The product's title.
 * @property {string} category The product's category.
 * @property {number} rating The product's rating, in number of stars.
 * @property {number} price The product's price.
 * @property {{
 *     src: string
 *     alt: string
 * }} image The product's image.
 */

/** @type React.Context<{ product: Product }> */
// @ts-ignore
const ProductContext = createContext({});

const useProduct = () => useSafeContext(ProductContext, 'Cannot use product outside of <ProductCard />.');

/**
 * A card that displays a product's image and information with an action at the
 * bottom.
 * 
 * @example
 * <ProductCard {...{
 *     product: { ... },
 *     slots: {
 *         image: <ProductCard.Image />,
 *         info: <>
 *             <ProductCard.Category />
 *             <ProductCard.Title />
 *             <ProductCard.Rating />
 *             <ProductCard.Price currencySymbol='$' />
 *         </>,
 *         action: (
 *             <ProductCard.Button onClick={...}>
 *                 Add to Cart
 *             </ProductCard.Button>
 *         ),
 *     },
 * }} />
 * 
 * @param {Object} props This component's render props.
 * @param {Product} props.product The product to display.
 * @param {ReactSlots<'action' | 'image' | 'info'>} props.slots Slots to inject components into.
 */
export function ProductCard({ product, slots }) {
    return (
        <ProductContext.Provider value={{ product }}>
            <div className='card-product'>
                {slots.image}
                <div className='content'>
                    {slots.info}
                    {slots.action}
                </div>
            </div>
        </ProductContext.Provider>
    );
}

/** Displays a product's image within `<ProductCard />`. */
ProductCard.Image = function ProductImage() {
    const { product } = useProduct();
    return (
        <div className="image">
            <img src={product.image.src} alt={product.image.alt} />
        </div>
    );
};

/** Displays a product's category within `<ProductCard />`. */
ProductCard.Category = function ProductCategory() {
    const { product } = useProduct();
    return (
        <div className="category">
            {product.category}
        </div>
    );
};

/** Displays a product's title within `<ProductCard />`. */
ProductCard.Title = function ProductTitle() {
    const { product } = useProduct();
    return (
        <div className="title">
            {product.title}
        </div>
    );
};

/** Displays a product's rating within `<ProductCard />`. */
ProductCard.Rating = function ProductRating() {
    const { product } = useProduct();
    return (
        <div className="rating">
            {product.rating} stars
        </div>
    );
};

/**
 * @param {Object} props This component's render props.
 * @param {string} props.currencySymbol The symbol to use when rendering currencies.
 */
ProductCard.Price = function ProductPrice({ currencySymbol }) {
    const { product } = useProduct();
    return (
        <div className="price">
            {currencySymbol}{product.price}
        </div>
    );
};

/**
 * @param {Object} props This action's render props.
 * @param {(product: Product) => void} props.onClick The function to call when this action is clicked.
 * @param {import('react').ReactNode} props.children This action's children.
 */
ProductCard.Action = function ProductAction({ children, onClick }) {
    const { product } = useProduct();
    return (
        <button className='action' onClick={() => onClick(product)}>
            {children}
        </button>
    );
};
