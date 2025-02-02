import { NavLink } from "react-router";
import styles from "./StoreScene.module.css";
import { useRecoilValue } from "recoil";
import { merchandiseAtom } from "@/state/merchandise/atoms";
import { GiveawayCard } from "@/components/GiveawayCard/GiveawayCard";

export const StoreScene = ({
  testID = "store",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const items = useRecoilValue(merchandiseAtom);

  return (
    <div data-testid={testID} className={styles.frame}>
      <div className={styles.collection}>
        {items.map((product) => (
          // <div key={product.id} className={styles.product}>
          //   {/* <img src={product.image} alt={product.name} /> */}
          //   <div>
          //     <h2>{product.title}</h2>
          //     <p>{product.description}</p>
          //     <p>{product.price.toLocaleString()} VIRGIN</p>
          //   </div>
          // </div>
          <GiveawayCard
            key={product.id}
            testID={`${testID}.item`}
            label={product.title}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};
