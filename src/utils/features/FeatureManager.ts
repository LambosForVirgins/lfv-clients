class FeatureManager {
  readonly _features: Record<string, boolean> = {};

  constructor() {
    this._features = {};
  }

  get(featureKey: string): boolean {
    return this._features[featureKey] || false;
  }

  static init() {}
}

export const FeatureToggles = new FeatureManager();
