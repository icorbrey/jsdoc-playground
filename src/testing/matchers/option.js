/**
 * Checks that a value is `Some<T>`.
 * 
 * @template T
 * @param {import('../../utilities/option').Option<T>} actual 
 */
export function toBeSome(actual) {
    return actual.match(
        _ => ({
            message: () => `expected ${actual.toString()} to be None`,
            pass: true,
        }),
        () => ({
            message: () => `expected ${actual.toString()} to be Some(any)`,
            pass: false,
        })
    );
};

/**
 * Checks that a value is `None`.
 * 
 * @template T
 * @param {import('../../utilities/option').Option<T>} actual 
 */
export function toBeNone(actual) {
    return actual.match(
        _ => ({
            message: () => `expected ${actual.toString()} to be None`,
            pass: false,
        }),
        () => ({
            message: () => `expected ${actual.toString()} to be Some(any)`,
            pass: true,
        })
    );
};

/**
 * Checks that a value is `Some<T>` and contains the given value.
 * 
 * @template T
 * @param {import('../../utilities/option').Option<T>} actual 
 * @param {T} expected
 */
export function toBeSomeValue(actual, expected) {
    if (actual.isSomeAnd(value => value === expected)) {
        return {
            message: () => `expected ${actual.toString()} to not be Some(${expected})`,
            pass: true,
        };
    }

    return {
        message: () => `expected ${actual.toString()} to be Some(${expected})`,
        pass: false,
    };
};

/**
 * Checks that a value is `Some<T>` and contains the given value.
 * 
 * @template T
 * @param {import('../../utilities/option').Option<T>} actual 
 * @param {(value: T) => boolean} predicate
 */
export function toBeSomeValueMatching(actual, predicate) {
    if (actual.isSomeAnd(predicate)) {
        return {
            message: () => `expected ${actual.toString()} to not match the predicate`,
            pass: true,
        };
    }

    return {
        message: () => `expected ${actual.toString()} to match the predicate`,
        pass: false,
    };
};
