import { option } from './option';

describe('option', () => {

    describe('.toString()', () => {

        it('returns "None" when the option is None', () => {
            expect(option.none().toString()).toBe('None');
            expect(option.some(123)).toBeSome();
        });

        it('returns "Some(value)" when the option is Some(value)', () => {
            expect(option.some(123).toString()).toBe('Some(123)');
        });

        it('returns "Some(\'value\')" when the option is Some(\'value\') with a value of "value"', () => {
            expect(option.some('value').toString()).toBe('Some(\'value\')');
        });
    });

    describe('.isSome()', () => {

        it('returns true when the option is Some(value)', () => {
            expect(option.some('value').isSome()).toBe(true);
        });

        it('returns false when the option is None', () => {
            expect(option.none().isSome()).toBe(false);
        });
    });

    describe('.isNone()', () => {

        it('returns false when the option is Some(value)', () => {
            expect(option.some('value').isNone()).toBe(false);
        });

        it('returns true when the option is None', () => {
            expect(option.none().isNone()).toBe(true);
        });
    });

    describe('.isSomeAnd(predicate)', () => {

        /** @param {number} x */
        const isEven = x => x % 2 === 0;

        it('returns false when the option is None', () => {
            expect(option.none().isSomeAnd(isEven)).toBe(false);
        });

        it('returns false when the option is Some(value) and does not satisfy the predicate', () => {
            expect(option.some(1).isSomeAnd(isEven)).toBe(false);
        });

        it('returns true when the option is Some(value) and satisfies the predicate', () => {
            expect(option.some(2).isSomeAnd(isEven)).toBe(true);
        });
    });

    describe('.expect(message)', () => {

        const message = 'Value should have been Some<T>';

        it('returns value if the option is Some(value)', () => {
            expect(option.some(123).expect(message)).toBe(123);
        });

        it('throws with the given message if the option is None', () => {
            expect(() => option.none().expect(message)).toThrowError(message);
        });
    });

    describe('.unwrap()', () => {

        it('returns the contained value if the option is Some(value)', () => {
            expect(option.some(123).unwrap()).toBe(123);
        });

        it('throws if the option is None', () => {
            expect(() => option.none().unwrap()).toThrow();
        });
    });

    describe('.unwrapOr()', () => {

        it('returns value if the option is Some(value)', () => {
            expect(option.some(123).unwrapOr(321)).toBe(123);
        });

        it('returns the fallback value if the option is None', () => {
            expect(option.none().unwrapOr(321)).toBe(321);
        });
    });

    describe('.unwrapOrElse()', () => {

        it('returns value if the option is Some(value)', () => {
            expect(option.some(123).unwrapOrElse(() => 321)).toBe(123);
        });

        it('returns fallback() if the option is None', () => {
            expect(option.none().unwrapOrElse(() => 321)).toBe(321);
        });
    });

    describe('.map(fn)', () => {

        /** @param {number} x */
        const fn = x => x * 2;

        it('returns Some(fn(value)) if the option is Some<T>', () => {
            expect(option.some(21).map(fn)).toBeSomeValue(42);
        });

        it('returns None if the option is None', () => {
            expect(option.none().map(fn)).toBeNone();
        });
    });

    describe('.inspect(fn)', () => {

        let fn;

        beforeEach(() => {
            fn = jest.fn();
        });

        it('returns the original option', () => {
            expect(option.some(123).inspect(fn)).toBeSomeValue(123);
        });

        it('calls fn() when the option is Some<T>', () => {
            option.some(123).inspect(fn);
            expect(fn).toHaveBeenCalledWith(123);
        });

        it('does not call fn() when the option is None', () => {
            option.none().inspect(fn);
            expect(fn).not.toHaveBeenCalled();
        });
    });

    describe('.mapOr(fallback, fn)', () => {

        /** @param {number} x */
        const fn = x => x * 2;

        it('returns fn(value) if the option is Some(value)', () => {
            expect(option.some(21).mapOr(0, fn)).toBe(42);
        });

        it('returns the fallback value when the option is None', () => {
            expect(option.none().mapOr(0, fn)).toBe(0);
        });
    });

    describe('.mapOrElse(fallback, fn)', () => {

        /** @param {number} x */
        const fn = x => x * 2;
        const fallback = () => 0;

        it('returns fn(value) if the option is Some(value)', () => {
            expect(option.some(21).mapOrElse(fallback, fn)).toBe(42);
        });

        it('returns fallback() when the option is None', () => {
            expect(option.none().mapOrElse(fallback, fn)).toBe(0);
        });
    });

    describe('.filter(predicate)', () => {

        /** @param {number} x */
        const isEven = x => x % 2 === 0;

        it('returns Some(value) if the option is Some(value) and matches the predicate', () => {
            expect(option.some(2).filter(isEven)).toBeSomeValue(2);
        });

        it('returns None if the option is Some(value) and does not match the predicate', () => {
            expect(option.some(1).filter(isEven)).toBeNone();
        });

        it('returns None if the option is None and matches the predicate', () => {
            expect(option.none().filter(isEven)).toBeNone();
        });
    });

    describe('.match(onSome, onNone)', () => {

        /** @param {number} x */
        const onSome = x => x * 2;

        const onNone = () => -1;

        it('returns onSome(value) when the option is Some(value)', () => {
            expect(option.some(21).match(onSome, onNone)).toBe(42);
        });

        it('returns onNone() when the option is None', () => {
            expect(option.none().match(onSome, onNone)).toBe(-1);
        });
    });
});
