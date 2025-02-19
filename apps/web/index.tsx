import "./instrument";
import "./reset.css";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { RecoilRoot } from "recoil";
import { SolanaProvider } from "@/providers/Solana/SolanaProvider";
import { LocaleProvider } from "@/providers/Locale/LocaleProvider";
import * as Sentry from "@sentry/react";
import { SessionProvider } from "@/providers/Sessions/SessionProvider";

// export const metadata: Metadata = {
//   title: Brand.displayName,
//   description: Brand.slogan,
// };

// function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const messages = await getMessages();

//   return (
//     <html className="h-full">
//       <body className={clsx(customFonts, "antialiased h-full flex flex-col")}>
//         <PlausibleProvider
//           domain="lambosforvirgins.com"
//           // taggedEvents
//           // trackLocalhost
//           // enabled
//         >
//           <LocaleProvider initialLocale={"en"} messages={messages}>
//             <SolanaProvider>
//               {/* <div className="grid col-full grid-cols-layout bg-red-500 sticky top-0 left-0 right-0 z-50">
//                 <Header testID={`header`} className="col-content" />
//               </div>
//               <section className="col-full grid grid-cols-layout grow">
//                 {children}
//               </section>
//               <PromoSection
//                 testID="promo"
//                 className="col-full gap-5 sticky bottom-0 left-0 right-0"
//               />
//               <Subscribe testID="subscribe" className="col-full" />
//               <Footer testID="footer" className="col-full" />
//               <Disclaimers testID="disclaimers" className="col-full" /> */}
//             </SolanaProvider>
//           </LocaleProvider>
//         </PlausibleProvider>
//       </body>
//     </html>
//   );
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <SolanaProvider>
        <RecoilRoot>
          <LocaleProvider initialLocale="en">
            <SessionProvider>
              <App />
            </SessionProvider>
          </LocaleProvider>
        </RecoilRoot>
      </SolanaProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
