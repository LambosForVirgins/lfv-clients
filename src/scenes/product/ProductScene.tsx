import { Button } from "@/elements";
import styles from "./ProductScene.module.css";

export const ProductScene = ({
  testID = "product",
}: Readonly<Partial<Common.ComponentProps>>) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <div>
        <img alt={"example"} />
        <div>
          <img alt={"more example"} />
          <img alt={"more example"} />
          <img alt={"more example"} />
        </div>
      </div>

      <div>
        <h1>Product Name</h1>
        <div>
          <h2>Description</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis
            perspiciatis laudantium ipsum, itaque architecto optio nesciunt.
            Suscipit, quisquam, expedita reprehenderit, harum veniam sint
            aliquam modi saepe laudantium voluptate at?
          </p>

          <h2>Options</h2>
          {["Red", "Blue", "Green"].map((color) => (
            <span key={color}>{color}</span>
          ))}

          {["Small", "Medium", "Large"].map((color) => (
            <span key={color}>{color}</span>
          ))}

          <h2>Price</h2>
          <span style={{ textDecoration: "strikethrough" }}>$20.00</span>
          <span>$14.99</span>

          <h2>Quantity</h2>
          <input type="number" />

          <p>
            <strong>Included:</strong> more things*
          </p>

          <Button testID={`${testID}.add`} size={"small"}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
