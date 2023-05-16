import { productSlice, selectProductById, selectProducts } from './productSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

/** @typedef {import('./productSlice').Product} Product */

export const useProducts = () => {
    const dispatch = useAppDispatch();
    const all = useAppSelector(selectProducts);

    /** @param {Product} product */
    const create = (product) => dispatch(productSlice.actions.created(product));

    /** @param {Product} product */
    const update = (product) => dispatch(productSlice.actions.updated(product));

    /** @param {Guid} productId */
    const remove = (productId) => dispatch(productSlice.actions.removed(productId));

    return ({
        create,
        update,
        remove,
        all,
    });
};

/** @param {Guid} productId */
export const useProductById = (productId) =>
    useAppSelector(selectProductById(productId));
