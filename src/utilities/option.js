/**
 * @template T
 * @typedef {__Option<T>} Option
 */

/**
 * @template T
 * @typedef {ReturnType<typeof generateOption<T>>} __Option
 */

export const option = {
    /**
     * @template T The type of the {@link Option<T>}'s value.
     * @param {T} value The value to wrap.
     * @returns {Option<T>}
     */
    some: (value) => generateOption({
        isSome: true,
        value,
    }),

    /**
     * @template T The type of the {@link Option<T>}'s value.
     * @returns {Option<T>}
     */
    none: () => generateOption({
        isSome: false,
    }),
};

/**
 * @template T
 * @param {{ isSome: true, value: T } | { isSome: false }} maybe
 */
const generateOption = (maybe) => {
    const __option = ({
        /**
         * Returns the string representation of this option.
         * 
         * @example
         * console.log(option.some('value')); // Some('value')
         * console.log(option.none()); // None
         */
        toString: () => {
            if (maybe.isSome) {
                if (typeof maybe.value === 'string') {
                    return `Some('${maybe.value}')`;
                }

                return `Some(${maybe.value})`;
            }

            return 'None';
        },

        /**
         * Returns `true` if this option is `Some<T>`.
         * 
         * @example
         * let x = option.some('value');
         * console.log(x.isSome()); // true
         * 
         * let y = option.none();
         * console.log(y.isSome()); // false
         * 
         * @returns {boolean}
         */
        isSome: () =>
            maybe.isSome,

        /**
         * Returns `true` if this option is `None`.
         * 
         * @example
         * let x = option.some('value');
         * console.log(x.isNone()); // false
         * 
         * let y = option.none();
         * console.log(y.isNone()); // true
         * 
         * @returns {boolean}
         */
        isNone: () =>
            !maybe.isSome,

        /**
         * Returns `true` if this option is `Some<T>` and the wrapped value matches
         * the given predicate.
         * 
         * @example
         * let x = option.some(0);
         * console.log(x.isSomeAnd(x => x < 1)); // true
         * 
         * let y = option.some(2);
         * console.log(y.isSomeAnd(x => x < 1)); // false
         * 
         * let z = option.none();
         * console.log(z.isSomeAnd(x => x < 1)); // false
         * 
         * @param {(value: T) => boolean} predicate The predicate to match the internal value against.
         * @returns {boolean}
         */
        isSomeAnd: (predicate) =>
            maybe.isSome && predicate(maybe.value),

        /**
         * Returns the contained `Some<T>` value.
         * 
         * @throws Throws with the given message if this option is `None`.
         * 
         * @example
         * const message = 'Value should have been Some<T>'
         * 
         * let x = option.some('value');
         * console.log(x.expect(message)); // 'value'
         * 
         * let y = option.none();
         * console.log(y.expect(message)); // throws 'Value should have been Some<T>'
         * 
         * @param {string} message Why this option was supposed to be `Some<T>`.
         * @returns {T}
         */
        expect: (message) => {
            if (!maybe.isSome) {
                throw new Error(message);
            }

            return maybe.value;
        },

        /**
         * Returns the contained `Some<T>` value.
         * 
         * @throws Throws if this option is `None`.
         * 
         * @deprecated
         * Because this function may throw unexpectedly, its use is generally
         * discouraged. Instead, call {@link Option.expect},
         * {@link Option.unwrapOr}, or {@link Option.unwrapOrElse}.
         * 
         * @example
         * let x = option.some('value');
         * console.log(x.unwrap()); // 'value'
         * 
         * let y = option.none();
         * console.log(y.unwrap()); // throws 'Option should not be None'
         * 
         * @returns {T}
         */
        unwrap: () => {
            if (!maybe.isSome) {
                throw new Error('Option should not be None');
            }

            return maybe.value;
        },

        /**
         * If `Some<T>`, returns the contained value. Otherwise, returns the
         * provided fallback.
         * 
         * Arguments passed to this function are eagerly evaluated; if you are
         * passing in the result of a function call, it is recommended to use
         * {@link Option.unwrapOrElse}, which is lazily evaluated.
         * 
         * @example
         * let x = option.some('value');
         * console.log(x.unwrapOr('fallback')); // 'value'
         * 
         * let y = option.none();
         * console.log(y.unwrapOr('fallback')); // 'fallback'
         * 
         * @param {T} fallback The value to fall back on if this option is `None`.
         * @returns {T}
         */
        unwrapOr: (fallback) => {
            if (maybe.isSome) {
                return maybe.value;
            }

            return fallback;
        },

        /**
         * If `Some<T>`, returns the contained value. Otherwise, returns a
         * computed fallback value.
         * 
         * @example
         * let x = option.some('value');
         * console.log(x.unwrapOrElse(() => 'fallback')); // 'value'
         * 
         * let y = option.none();
         * console.log(y.unwrapOrElse(() => 'fallback')); // 'fallback'
         * 
         * @param {() => T} fn Returns a fallback value.
         * @returns {T}
         */
        unwrapOrElse: (fn) => {
            if (maybe.isSome) {
                return maybe.value;
            }

            return fn();
        },

        /**
         * If `Some<T>`, maps this option to `Option<U>` by applying the given
         * function to the internal value. Otherwise, returns `None`.
         * 
         * @example
         * console.log(option.some(1).map(x => x + 1)); // Some(2)
         * console.log(option.none().map(x => x + 1)); // None
         * 
         * @template U The internal type to map `T` to.
         * @param {(value: T) => U} fn Maps objects of type `T` to type `U`.
         * @returns {Option<U>}
         */
        map: (fn) => {
            if (maybe.isSome) {
                return option.some(fn(maybe.value));
            }

            return option.none();
        },

        /**
         * If `Some<T>`, calls the given function with the contained value.
         * Returns this option unmutated.
         * 
         * @example
         * let x = option.some('value').inspect(console.log); // 'value'
         * let y = option.none().inspect(console.log); // prints nothing
         * 
         * @param {(value: T) => void} fn 
         * @returns {Option<T>}
         */
        inspect: (fn) => {
            if (maybe.isSome) {
                fn(maybe.value);
            }

            return __option;
        },

        /**
         * If `Some<T>`, maps the contained value to `U` using the given
         * function. Otherwise, returns the given fallback value.
         * 
         * Arguments passed to this function are eagerly evaluated; if you are
         * passing in the result of a function call, it is recommended to use
         * {@link Option.mapOrElse}, which is lazily evaluated.
         * 
         * @example
         * let x = option.some('value');
         * console.log(x.mapOr(123, s => s.length)); // 5
         * 
         * let y = option.none();
         * console.log(y.mapOr(123, s => s.length)); // 123
         * 
         * @template U The internal type to map `T` to.
         * @param {U} fallback The value to fall back on if this option is `None`.
         * @param {(value: T) => U} fn Maps objects of type `T` to type `U`.
         * @returns {U}
         */
        mapOr: (fallback, fn) => {
            if (maybe.isSome) {
                return fn(maybe.value);
            }

            return fallback;
        },

        /**
         * If `Some<T>`, maps the contained value to `U` using the given
         * function. Otherwise, returns a computed fallback value.
         * 
         * @example
         * let k = 21;
         * 
         * let x = option.some('value');
         * console.log(x.mapOrElse(() => 2 * k, s => s.length)); // 5
         * 
         * let y = option.none();
         * console.log(y.mapOrElse(() => 2 * k, s => s.length)); // 42
         * 
         * @template U
         * @param {() => U} getFallback 
         * @param {(value: T) => U} fn 
         * @returns {U}
         */
        mapOrElse: (getFallback, fn) => {
            if (maybe.isSome) {
                return fn(maybe.value);
            }

            return getFallback();
        },

        /**
         * If `Some<T>`, returns this option if the contained value satisfies
         * the given predicate and `None` if it does not. Otherwise, returns
         * `None`.
         * 
         * @example
         * const isEven = x => x % 2 === 0;
         * 
         * console.log(option.some(2).filter(isEven)); // true
         * console.log(option.some(1).filter(isEven)); // false
         * console.log(option.none().filter(isEven)); // false
         * 
         * @param {(value: T) => boolean} predicate The predicate to match the internal value against.
         * @returns {Option<T>}
         */
        filter: (predicate) => {
            if (maybe.isSome && predicate(maybe.value)) {
                return __option;
            }

            return option.none();
        },

        /**
         * @template U
         * @param {(value: T) => U} onSome 
         * @param {() => U} onNone 
         */
        match: (onSome, onNone) => {
            if (maybe.isSome) {
                return onSome(maybe.value);
            }

            return onNone();
        }
    });

    return __option;
};
