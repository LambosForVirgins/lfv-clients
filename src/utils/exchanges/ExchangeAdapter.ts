export type ExchangeName<T extends string = string> = T;

export abstract class ExchangeAdapter {
  abstract readonly name: ExchangeName;
  abstract readonly url: string;
  abstract readonly icon: string;
}
