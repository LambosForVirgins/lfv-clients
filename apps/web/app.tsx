import {
  BrowserRouter as Router,
  Routes as Switch,
  Route as Page,
} from "react-router";
import { GiveawayListPage } from "./giveaways/GiveawayListPage";
import { PartnersPage } from "@/pages/partners/PartnersPage";
import { StorePage } from "@/pages/store/StorePage";
import { TreasuryPage } from "@/pages/treasury/TreasuryPage";
import { Layout } from "@/components/Layout/Layout";
import { MembershipSection } from "@/sections/MembershipSection/MembershipSection";
import { EventsPage } from "@/pages/events/EventsPage";
import { SingleGiveawayPage } from "./giveaways/[giveawayId]/GiveawayPage";
import { SubscriptionPage } from "@/pages/subscription/SubscriptionPage";
import { AccountPage } from "@/pages/account/AccountPage";
import { withAuthenticated } from "@/components/RouteGuard/withAuthenticated";

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

export const App = () => (
  <Router>
    <Layout testID={"layout"}>
      <Switch>
        <Page
          path={"giveaways"}
          Component={withAuthenticated(GiveawayListPage)}
        />
        <Page
          path={"subscription"}
          Component={withAuthenticated(SubscriptionPage)}
        />
        <Page path={"account"} Component={withAuthenticated(AccountPage)} />
        <Page
          path={"giveaways/:giveawayId"}
          Component={withAuthenticated(SingleGiveawayPage)}
        />
        <Page path={"events"} Component={withAuthenticated(EventsPage)} />
        <Page path={"partners"} Component={withAuthenticated(PartnersPage)} />
        <Page path={"store"} Component={withAuthenticated(StorePage)} />
        <Page path={"treasury/*"}>
          <Page path={"vesting"} Component={TreasuryPage} />
        </Page>
        <Page Component={MembershipSection} index />
      </Switch>
    </Layout>
  </Router>
);
