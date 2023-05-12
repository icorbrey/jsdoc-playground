declare module 'expect' {
    interface AsymmetricMatchers {
        toBeNone(): void,
        toBeSome(): void,
        toBeSomeValue(): void,
    }
    interface Matchers<R> {
        toBeNone(): R,
        toBeSome(): R,
        toBeSomeValue(): R,
    }
}

export { };
