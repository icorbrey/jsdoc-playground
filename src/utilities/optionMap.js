import { option } from './option';

/**
 * @template K The key type.
 * @template V The value type.
 */
export class OptionMap {
    /** @type {Map<K, V>} */
    __map;

    /**
     * Returns a specified element from the OptionMap object.
     * 
     * @param {K} key The key to fetch the value of.
     */
    get(key) {
        return option.fromNullable(this.__map.get(key));
    }

    /**
     * Adds a new element with a specified key and value to the OptionMap. If
     * an element with the same key already exists, the element will be
     * updated.
     * 
     * @param {K} key The key to set the value of.
     * @param {V} value The value to set.
     */
    set(key, value) {
        this.__map.set(key, value);
        return this;
    }

    /**
     * Deletes the given key in this map, if it exists.
     * 
     * @param {K} key The key to delete the value of.
     * @returns `true` if the key existed and was deleted, `false` otherwise.
     */
    delete(key) {
        return this.__map.delete(key);
    }

    /** Deletes every key in this map. */
    clear() {
        this.__map.clear();
    }
}
