type Constraint = {
  minBalance?: number;
  maxBalance?: number;
};

type Price = {
  currency: string;
  value: number;
};

type MediaItem = {
  type: string;
  url: string;
};

export type Merchandise = {
  id: string;
  active: boolean;
  sku: string;
  title: string;
  description: string | null;
  media: MediaItem[];
  constraints?: Constraint;
  providers: string[];
  price: number | Price[];
};
