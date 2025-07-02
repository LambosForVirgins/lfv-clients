type StepOption<T> = {
  key: string;
  label: string;
  value: T;
  disabled?: boolean;
  onSelect: (value: T) => void;
};

type StepDefinition<T = any> = {
  key: string;
  lines: string[];
  selected?: T;
  options?: StepOption<T>[];
  delay?: number;
  noise?: number;
  align?: "center" | "left" | "right";
};

export type StepFunction = () => StepDefinition;
