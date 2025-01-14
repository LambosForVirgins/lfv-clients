import { prettyAddress } from "../prettyAddress";

const mockAddress = "1f3f9D3068568F8040775be2e8c03C103C61f3aF";

describe(prettyAddress, () => {
  it.each([null, undefined])(
    "should return the input address if %s",
    (address) => {
      expect(prettyAddress(address)).toBe(address);
    }
  );

  it("should return formatted short address with default length and separator", () => {
    const result = prettyAddress(mockAddress);
    expect(result).toHaveLength(13);
    expect(result).toContain("...");
  });

  it.each([6, 9, 5])(
    "should return formatted short address with length %d",
    (length) => {
      expect(prettyAddress(mockAddress, length)).toHaveLength(length);
    }
  );

  it.each(["%%%", "--", "///"])(
    "should return formatted short address with separator %s",
    (separator) => {
      expect(prettyAddress(mockAddress, 13, separator)).toContain(separator);
    }
  );
});
