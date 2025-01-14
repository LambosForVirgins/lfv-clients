export type ValidationError = {
  message: string;
};

export type ValidationResult = {
  errors: ValidationError[];
};
