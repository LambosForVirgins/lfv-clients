interface CustomMatchers<T> {
  urlContains(expectedSubstring: string): T;
}

declare global {
  namespace Vi {
    interface ExpectStatic extends CustomMatchers<R> {}
  }
}
