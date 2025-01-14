import "@testing-library/jest-dom/vitest";

interface CustomMatchers {
  urlContains(expectedSubstring: string): any;
}

declare global {
  namespace Vi {
    interface ExpectStatic extends CustomMatchers {}
  }
}

expect.extend({
  urlContains(received: URL, expected: string) {
    // Ensure the expectedURL is an instance of URL
    if (!(received instanceof URL)) {
      return {
        pass: false,
        message: () =>
          `Received value must be an instance of URL, but received ${typeof received}`,
      };
    }
    // Convert the URL to a string and compare it to the expected value
    const pass = received.href.includes(expected);
    // Handle comparison result
    if (pass) {
      return {
        message: () =>
          `Expected: ${this.utils.printExpected(expected)}\nReceived: ${this.utils.printReceived(received)}`,
        pass: true,
      };
    }
    return {
      message: () =>
        `Expected: ${this.utils.printExpected(expected)}\nReceived: ${this.utils.printReceived(
          received
        )}\n\n${this.utils.diff(expected, received)}`,
      pass: false,
    };
  },
});
