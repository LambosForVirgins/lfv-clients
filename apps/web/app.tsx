import { BrowserRouter as Router, Routes, Route as Page } from "react-router";
import { PartnersScene } from "@/scenes/partners/PartnersScene";
import { StoreScene } from "@/scenes/store/StoreScene";
import { TreasuryScene } from "@/scenes/treasury/TreasuryScene";
import { Layout } from "@/components/Layout/Layout";
import { EventsScene } from "@/scenes/events/EventsScene";
import { SubscriptionScene } from "@/scenes/subscription/SubscriptionScene";
import { AccountScene } from "@/scenes/account/AccountScene";
import { withAuthenticated } from "@/components/RouteGuard/withAuthenticated";
import { LandingScene } from "@/scenes/landing/LandingScene";
import { GiveawaysScene } from "@/scenes/giveaways/GiveawaysScene";
import { PromotionalScene } from "@/scenes/promos/PromotionalScene";
import { ProductScene } from "@/scenes/product/ProductScene";
import * as Sentry from "@sentry/react";
import { AboutScene } from "@/scenes/about/AboutScene";
import { useSetRecoilState } from "recoil";
import { publicKeyAtom } from "@/state/account/atoms";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: string };
// }) {
//   const t = await getTranslations({ locale, namespace: "Metadata" });

//   return {
//     title: t("Token.DisplayName"),
//     description: t("Token.Slogan"),
//     keywords: ["meme", "coin", "crypto", "lamborghini", "meme coin", "trade"],
//     openGraph: {
//       title: t("Token.DisplayName"),
//       description: t("Token.Slogan"),
//       type: "website",
//       locale: locale,
//       siteName: t("Token.DisplayName"),
//       images: [
//         // TODO: SEO Images
//         {
//           url: "/images/logo-stamp.png",
//           width: 400,
//           height: 250,
//           alt: `${Brand.tokenSymbol} stamp logo`,
//         },
//       ],
//     },
//   };
// }

export const App = () => {
  const { publicKey } = useWallet();
  const setPublicKey = useSetRecoilState(publicKeyAtom);

  useEffect(() => {
    setPublicKey(publicKey);
  }, [publicKey?.toBase58()]);

  return (
    <Router>
      <Layout testID={"layout"}>
        <SentryRoutes>
          <Page
            path={"giveaways"}
            Component={withAuthenticated(GiveawaysScene)}
          />
          <Page
            path={"subscription"}
            Component={withAuthenticated(SubscriptionScene)}
          />
          <Page path={"account"} Component={withAuthenticated(AccountScene)} />
          <Page
            path={"giveaways/:giveawayId"}
            Component={withAuthenticated(PromotionalScene)}
          />
          <Page path={"events"} Component={withAuthenticated(EventsScene)} />
          <Page
            path={"partners"}
            Component={withAuthenticated(PartnersScene)}
          />
          <Page path={"store"} Component={withAuthenticated(StoreScene)} />
          <Page
            path={"store/:product"}
            Component={withAuthenticated(ProductScene)}
          />
          <Page path={"about"} Component={AboutScene} />
          <Page path={"tokenomics/*"} Component={TreasuryScene} />
          <Page Component={LandingScene} index />
        </SentryRoutes>
      </Layout>
    </Router>
  );
};
