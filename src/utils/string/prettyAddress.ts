export const prettyAddress = (
  address: string | undefined | null,
  length: number = 13,
  separator: string = "..."
) => {
  if (!address) return address;

  const trailingLength = Math.floor((length - separator.length) / 2);
  const leadingLength = length - trailingLength - separator.length;

  return [
    address.substring(0, leadingLength),
    address.substring(address.length - trailingLength),
  ].join(separator);
};
