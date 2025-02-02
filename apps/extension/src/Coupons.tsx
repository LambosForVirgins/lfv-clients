import { Button } from "@/elements";
import styles from "./Coupons.module.css";

type CouponProvider = {
  name: string;
  media: {
    src: string;
  };
  url: string;
};

export type CouponItem = {
  key: string;
  type?: "credit" | "discount";
  status: "claimed" | "applied" | "unclaimed";
  provider: CouponProvider;
  code: string;
  description: string | null;
  selector?: string;
};

export const coupons: CouponItem[] = [
  {
    key: "1",
    status: "claimed",
    code: "CODE1",
    provider: {
      name: "UltraTune",
      media: {
        src: "https://example.com/logo.png",
      },
    },
    description: "10% off",
  },
  {
    key: "2",
    status: "applied",
    code: "CODE2",
    provider: {
      name: "UltraTune",
      media: {
        src: "https://example.com/logo.png",
      },
    },
    description: "Up to 15% off",
  },
  {
    key: "3",
    status: "unclaimed",
    code: "CODE3",
    provider: {
      name: "UltraTune",
      media: {
        src: "https://example.com/logo.png",
      },
    },
    description: "15% off beauty",
  },
  {
    key: "4",
    type: "credit",
    status: "claimed",
    code: "CODE3",
    provider: {
      name: "Industrie",
      media: {
        src: "https://cdn.shopify.com/s/files/1/0057/6772/5138/files/Industrie_Logo_Black_1_2_x320.png?v=1683606996",
      },
      url: "https://www.industrie.com.au/",
    },
    description: "$200 off",
  },
  {
    key: "5",
    status: "unclaimed",
    code: "CODE3",
    provider: {
      name: "UltraTune",
      media: {
        src: "https://www.ultratune.com.au/wp-content/uploads/2022/08/Vector-Smart-Object.png",
      },
      url: "https://www.ultratune.com.au/",
    },
    description: "10% off",
  },
];

export const Coupons = () => {
  const selectedBusiness = coupons.find((coupon) => coupon.key === "4");
  if (!selectedBusiness) {
    return null;
  }

  return (
    <div className={styles.frame}>
      <div className={styles.header}>
        <div className={styles.title}>
          <img
            src={selectedBusiness.provider.media.src}
            alt={selectedBusiness.provider.name}
            className={styles.media}
          />
        </div>
        <div className={styles.details}>
          <span>Follower count</span>
          <button>Follow</button>
        </div>
      </div>
      <div className={styles.collection}>
        {coupons.map((coupon) => (
          <div key={coupon.key} className={styles.coupon}>
            <div className={styles.status}>{coupon.status}</div>

            {coupon.description && (
              <div className={styles.highlight}>{coupon.description}</div>
            )}

            <div className={styles.code}>{coupon.code}</div>

            {coupon.status !== "claimed" && (
              <Button
                testID={`claim`}
                size={"mini"}
                disabled={["claimed", "applied"].includes(coupon.status)}
              >
                {coupon.status === "applied" ? "Applied" : "Claim"}
              </Button>
            )}
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        <button>Home</button>
        <button>Search</button>
        <button>Profile</button>
      </footer>
    </div>
  );
};
