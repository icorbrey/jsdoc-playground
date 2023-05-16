import { useSafeContext } from '../../utilities/useSafeContext';
import { useLocale } from '../locale/localeHooks';
import { useProductById } from './productHooks';
import React, { createContext } from 'react';
import { useCart } from '../cart/cartHooks';
import '../ProductCard.jsx.css';

/** @typedef {import('./productSlice').Product} Product */
/** @typedef {import('../../utilities/guid').Guid} Guid */

/**
 * @template {string} T
 * @typedef {import('../../utilities/slots').ReactSlots<T>} ReactSlots
 */

/** @type React.Context<Product> */
// @ts-ignore
const ProductCardContext = createContext({});

const useProductCard = () => useSafeContext(ProductCardContext, 'Cannot use product outside of <ProductCard />.');

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
 * @param {Guid} props.productId The ID of the product to display.
 * @param {ReactSlots<'action' | 'image' | 'info'>} props.slots Slots to inject components into.
 */
export function ProductCard({ productId, slots }) {
    const product = useProductById(productId);
    return product.match(
        (product) => (
            <ProductCardContext.Provider value={product}>
                <div className='card-product'>
                    {slots.image}
                    <div className='content'>
                        {slots.info}
                        {slots.action}
                    </div>
                </div>
            </ProductCardContext.Provider>
        ),
        () => <></>
    );
}

/** Displays a product's image within `<ProductCard />`. */
ProductCard.Image = function ProductImage() {
    const product = useProductCard();
    return (
        <div className="image">
            <img src={product.image.src} alt={product.image.alt} />
        </div>
    );
};

/** Displays a product's category within `<ProductCard />`. */
ProductCard.Category = function ProductCategory() {
    const product = useProductCard();
    return (
        <div className="category">
            {product.category}
        </div>
    );
};

/** Displays a product's title within `<ProductCard />`. */
ProductCard.Title = function ProductTitle() {
    const product = useProductCard();
    return (
        <div className="title">
            {product.title}
        </div>
    );
};

/** Displays a product's rating within `<ProductCard />`. */
ProductCard.Rating = function ProductRating() {
    const product = useProductCard();
    return (
        <div className="rating">
            {product.rating} stars
        </div>
    );
};

ProductCard.Price = function ProductPrice() {

    const product = useProductCard();
    const locale = useLocale();

    return (
        <div className="price">
            {locale.currencySymbol}{product.price}
        </div>
    );
};

ProductCard.AddToCartButton = function ProductAddToCartButton() {

    const product = useProductCard();
    const locale = useLocale();
    const cart = useCart();

    return (
        <button className='action available' onClick={() => cart.addProduct(product.id)}>
            {locale.getString('addProductToCart')}
        </button>
    );
};

ProductCard.OutOfStockButton = function ProductOutOfStockButton() {

    const locale = useLocale();

    return (
        <button disabled className="action out-of-stock">
            {locale.getString('productOutOfStock')}
        </button>
    );
};
