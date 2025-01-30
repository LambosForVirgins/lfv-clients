import { NavLink } from "react-router";
import styles from "./StoreScene.module.css";
import { useRecoilValue } from "recoil";
import { merchandiseAtom } from "@/state/merchandise/atoms";

export const StoreScene = ({
  testID = "store",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const items = useRecoilValue(merchandiseAtom);

  return (
    <div data-testid={testID} className={styles.frame}>
      <h1>Store</h1>
      <div className={styles.products}>
        {items.map((product) => (
          <div key={product.id} className={styles.product}>
            {/* <img src={product.image} alt={product.name} /> */}
            <div>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>{product.price.toLocaleString()} VIRGIN</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
