import styles from "./Swatches.module.css";
import { Swatch } from "./Swatch";

class ColorSwatch {
  static base(emphasis: number = 500): string {
    return `var(--primary-${emphasis * 100})`;
  }
}

export const Chip = () => {
  return (
    <div className={styles.frame}>
      <Swatch label={"Primary 100"} code={ColorSwatch.base(1)} />
      <Swatch label={"Primary 200"} code={ColorSwatch.base(2)} />
      <Swatch label={"Primary 300"} code={ColorSwatch.base(3)} />
      <Swatch label={"Primary 400"} code={ColorSwatch.base(4)} />
      <Swatch label={"Primary 500"} code={ColorSwatch.base(5)} />
      <Swatch label={"Primary 600"} code={ColorSwatch.base(6)} />
      <Swatch label={"Primary 700"} code={ColorSwatch.base(7)} />
      <Swatch label={"Primary 800"} code={ColorSwatch.base(8)} />
      <Swatch label={"Primary 900"} code={ColorSwatch.base(9)} />
    </div>
  );
};
