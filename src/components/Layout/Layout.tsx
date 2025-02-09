import { ErrorBoundary } from "@/components/ErrorBoundary/errors";
import { Header } from "../Header/Header";
import { Subscribe } from "../Subscribe/Subscribe";
import { Footer } from "../Footer/Footer";
import { Disclaimers } from "../Disclaimers/Disclaimers";
import styles from "./Layout.module.css";
import { useDevToggles } from "@/state/application/useDevToggles";

export const Layout = ({
  testID = "layout",
  children,
}: React.PropsWithChildren<Common.ComponentProps>) => {
  const { isEnabled } = useDevToggles();

  return (
    <div data-testid={testID} className={styles.frame}>
      <div data-testid={`${testID}.header`} className={styles.header}>
        <Header testID={`header`} />
      </div>

      <section data-testid={`${testID}.content`} className={styles.main}>
        <ErrorBoundary fallback={<h1>Error</h1>}>{children}</ErrorBoundary>
      </section>
      <div data-testid={testID} className={styles.promo}>
        <div className={styles.content}>
          {/* <img
          src={"/images/banner.png"}
          alt={"banner"}
          height={120}
          className="justify-self-center absolute"
          style={{ bottom: 0, right: 0, maxWidth: "100%" }}
        /> */}
        </div>
      </div>
      <Subscribe testID={`${testID}.subscribe`} className={styles.full} />
      {isEnabled("footer") && (
        <Footer testID={`${testID}.footer`} className={styles.full} />
      )}
      {isEnabled("disclaimers") && (
        <Disclaimers testID={`${testID}.disclaimers`} className={styles.full} />
      )}
    </div>
  );
};
