type Constraint = {
  minBalance?: number;
  maxBalance?: number;
};

type Price = {
  currency: string;
  value: number;
};

export type Merchandise = {
  id: string;
  active: boolean;
  sku: string;
  title: string;
  description: string | null;
  constraints?: Constraint;
  providers: string[];
  price: number | Price[];
};
